const SET_TASKS = 'tasks/SET'
const ADD_TASK = 'tasks/ADD_TASK';
const DELETE_TASK = '/tasks/DELETE_TASK';

export const setTasksAction = (tasks) => ({
    type: SET_TASKS,
    tasks
})

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

export const addTaskThunk = (listId) => async dispatch => {
    const res = await fetch(`/api/lists/${listId}/add-task`, {
        method: 'POST'
    });

    const data = await res.json();
    // console.log(data)

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
    currentTasks: null
};

const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                currentTasks: action.tasks
            }
        case ADD_TASK:
            return {
                ...state,
                currentTasks: {
                    ...state.currentTasks,
                    ...action.task
                }
            }
        case DELETE_TASK:
            let newState = {...state}
            delete newState.currentTasks[action.taskId]
            return newState
        default:
            return state
    }
};

export default tasksReducer;