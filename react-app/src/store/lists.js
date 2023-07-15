const SET_LISTS = "lists/SET_LIST";
const CLEAR_LISTS = 'lists/DELETE_LIST';
const ADD_PERSONAL_LIST = "list/ADD_PERSONAL_LIST";
const ADD_TEAM_LIST = "list/ADD_TEAM_LIST";
const SET_CURRENT_LIST = "list/SET_CURRENT_LIST";
const DELETE_LIST = 'list/DELETE_LIST';
const PUT_LIST = 'list/PUT_LIST';

export const setLists = (lists) => ({
    type: SET_LISTS,
    lists
});

const addPersonalList = (list) => ({
    type: ADD_PERSONAL_LIST,
    list
});

const addTeamList = (list) => ({
    type: ADD_TEAM_LIST,
    list
});

export const clearLists = () => ({
    type: CLEAR_LISTS
});

export const setCurrentList = (list) => ({
    type: SET_CURRENT_LIST,
    list
});

const deleteList = (listId) => ({
    type: DELETE_LIST,
    listId
});

const updateList = (list) => ({
    type: PUT_LIST,
    list
});

export const createListThunk = (title, category, description, isPublic) => async dispatch => {
    console.log("****DISPATCHING****", title, category, description, isPublic)
    const res = await fetch(`/api/lists/new`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            title,
            category,
            description,
            isPublic
        })
    });

    const data = await res.json();

    if (res.ok) {
        if (data.team_id) dispatch(addTeamList(data))
        else dispatch(addPersonalList(data))
        return null;
    } else {
        return data;
    };
};

export const deleteListThunk = (listId) => async dispatch => {
    const res = await fetch(`api/lists/${listId}/delete`, {
        method: "DELETE",
    });

    const data = await res.json();

    dispatch(deleteList(listId));

    return null
};

export const updateListTasksThunk = (id, title, description, isPublic, category) => async dispatch => {
    console.log(typeof isPublic)
    const res = fetch(`/api/lists/${id}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id,
            title,
            description,
            isPublic,
            category
        })
    });

    const data = (await res).json();

    if (res.ok) {
        dispatch(updateList(data.list))
    }
};

const initialState = {
    personal_lists: null,
    team_lists: null
}

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LISTS:
            return {
                ...state,
                ...action.lists
            }
        case CLEAR_LISTS:
            return { ...initialState }
        case ADD_PERSONAL_LIST:
            return {
                ...state,
                personal_lists: {
                    ...state.personal_lists,
                    ...action.list
                },
            }
        case ADD_TEAM_LIST:
            return {
                ...state,
                team_lists: {
                    ...state.team_lists,
                    ...action.list
                },
            }
        case SET_CURRENT_LIST:
            return {
                ...state,
            }
        case DELETE_LIST:
            let newState = {...state}
            delete newState.personal_lists[action.listId]
            return newState
        case PUT_LIST:
            return {
                ...state,
                personal_lists: {
                    ...state.personal_lists,
                    [action.list.id]: action.list
                }
            }
        default:
            return state
    }
}

export default listsReducer;