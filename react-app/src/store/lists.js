const SET_LISTS = "lists/SET_LIST"
const CLEAR_LISTS = 'lists/DELETE_LIST'

export const setLists = (lists) => ({
    type: SET_LISTS,
    lists
});

export const clearLists = () => ({
    type: CLEAR_LISTS
});

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
        default:
            return state
    }
}

export default listsReducer;