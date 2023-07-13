const SET_LISTS = "lists/SET_LIST"
const CLEAR_LISTS = 'lists/DELETE_LIST'
const ADD_PERSONAL_LIST = "list/ADD_PERSONAL_LIST"
const ADD_TEAM_LIST = "list/ADD_TEAM_LIST"

export const setLists = (lists) => ({
    type: SET_LISTS,
    lists
});

const addList = (list) => ({
    type: ADD_PERSONAL_LIST,
    list
})

const addTeamList = (list) => ({
    type: ADD_TEAM_LIST,
    list
})

export const clearLists = () => ({
    type: CLEAR_LISTS
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
        else dispatch(addList(data))
        return null;
    } else {
        return data;
    };
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
                }
            }
        case ADD_TEAM_LIST:
            return {
                ...state,
                team_lists: {
                    ...state.team_lists,
                    ...action.list
                }
            }
        default:
            return state
    }
}

export default listsReducer;