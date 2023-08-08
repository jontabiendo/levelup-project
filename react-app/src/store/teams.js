const SET_TEAMS = "teams/SET_TEAMS";
const CLEAR_TEAMS = "teams/CLEAR_TEAMS";
const CREATE_TEAM = "teams/CREATE_TEAM";

export const setTeams = (teams) => ({
    type: SET_TEAMS,
    teams
});

const createTeamAction = (team) => ({
    type: CREATE_TEAM,
    team
});

export const clearTeams = () => ({
    type: CLEAR_TEAMS
});

export const createTeamThunk = (team, userId) => async dispatch => {
    const res = await fetch(`api/teams/${userId}/create-team`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: {
            team
        }
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(createTeamAction(data))
        return data
    } else return {"error": "Something went wrong creating your team"}
}

const initialState = {}

const teamsReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TEAMS:
            return {
                ...state,
                ...action.teams
            }
        case CREATE_TEAM:
            return {
                ...state,
                [action.team.id]: action.team
            }
        case CLEAR_TEAMS:
            return {}
        default:
            return state
    }
}

export default teamsReducer;