const SET_LISTS = "lists/SET_LIST";
const CLEAR_LISTS = 'lists/DELETE_LIST';
const ADD_PERSONAL_LIST = "list/ADD_PERSONAL_LIST";
const ADD_TEAM_LIST = "list/ADD_TEAM_LIST";
const SET_CURRENT_LIST = "list/SET_CURRENT_LIST";
const DELETE_LIST = 'list/DELETE_LIST';
const PUT_LIST = 'list/PUT_LIST';
const SIGNUP_LIST = "list/SIGN_UP";
const ADD_TASK = 'tasks/ADD_TASK';
const DELETE_TASK = '/tasks/DELETE_TASK';
const SET_TASKS = "tasks/SET"

export const setLists = (lists) => ({
    type: SET_LISTS,
    lists
});

export const signupList = (list) => ({
    type: SIGNUP_LIST,
    list
})

const addPersonalList = (list) => ({
    type: ADD_PERSONAL_LIST,
    list
});

export const addTeamList = (list) => ({
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

const addTaskAction = (listId, task) => ({
    type: ADD_TASK,
    listId,
    task
});

const deleteTaskAction = (taskId, listId) => ({
    type: DELETE_TASK,
    taskId,
    listId
});

export const setTasksAction = (listId, tasks) => ({
    type: SET_TASKS,
    listId,
    tasks
});

export const createListThunk = (title, category, description, isPublic, team) => async dispatch => {
    if (!team) {
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
            dispatch(addPersonalList(data))
            return null;
        } else {
            return data;
        };
    } else {
        const res = await fetch(`/api/teams/${team}/lists`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                title,
                category,
                description,
                isPublic, 
                team
            })
        });

        const data = await res.json();

        if (res.ok) {
            dispatch(addTeamList(data))
            return null;
        } else {
            return data;
        };
    }
};

export const deleteListThunk = (listId) => async dispatch => {
    const res = await fetch(`api/lists/${listId}/delete`, {
        method: "DELETE",
    });

    const data = await res.json();

    dispatch(deleteList(listId));

    return null
};

export const updateListTasksThunk = (list, tasks) => async dispatch => {
    const res = await fetch(`/api/lists/${list.id}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            title: list.title,
            description: list.description,
            is_public: list.isPublic,
            category: list.category
        })
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(updateList(data.list))
    }

    const tasksFetch = await fetch(`/api/lists/${list.id}/tasks/save`, {
        method: "PUT",
        headers: {"Content-Type": 'application/json'},
        body: JSON.stringify({
            tasks
        })
    })

    const tasksData = await tasksFetch.json()

    if (tasksFetch.ok) {
        dispatch(setTasksAction(list.id, tasksData))
    }
};

export const addTaskThunk = (listId) => async dispatch => {
    const res = await fetch(`/api/lists/${listId}/add-task`, {
        method: 'POST'
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(addTaskAction(listId, data))
        return data
    } else return {"error": "Something went wrong adding a task to list"}
};

export const deleteTaskThunk = (taskId, listId) => async dispatch => {
    const res = await fetch(`/api/tasks/${taskId}/delete`, {
        method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(deleteTaskAction(taskId, listId))
        return null
    } else return {"error": "Something went wrong deleting your task"}
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
        case SIGNUP_LIST:
            return {
                ...state,
                personal_lists: {[action.list.id]: action.list}
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
        case SET_TASKS:
            return {
                ...state,
                personal_lists: {
                    ...state.personal_lists,
                    [action.listId]: {
                        ...state.personal_lists[action.listId],
                        tasks : {
                            ...action.tasks
                        }
                    }
                }
            }
        case ADD_TASK:
            return {
                ...state,
                personal_lists: {
                    ...state.personal_lists,
                    [action.listId]: {
                        ...state.personal_lists[action.listId],
                        tasks: {
                            ...state.personal_lists[action.listId].tasks,
                            ...action.task
                        }
                    }
                }
            }
        case DELETE_TASK:
            let newState1 = {...state}
            delete newState1.personal_lists[action.listId].tasks[action.taskId]
            return newState1
        default:
            return state
    }
}

export default listsReducer;