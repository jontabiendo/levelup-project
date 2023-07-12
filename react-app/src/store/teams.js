const SET_TEAMS = "teams/SET_TEAMS"
const CLEAR_TEAMS = "teams/CLEAR_TEAMS"

export const setTeams = (teams) => ({
    type: SET_TEAMS,
    teams
});

export const clearTeams = () => ({
    type: CLEAR_TEAMS
});

const initialState = {}

const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEAMS:
            return {
                ...state,
                ...action.teams
            }
        case CLEAR_TEAMS:
            return { ...initialState }
        default:
            return state
    }
}

export default teamsReducer;