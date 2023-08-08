const SET_TEAMS = "teams/SET_TEAMS";
const CLEAR_TEAMS = "teams/CLEAR_TEAMS";
const CREATE_TEAM = "teams/CREATE_TEAM";
const DELETE_TEAM = "teams/DELETE_TEAM"

export const setTeams = (teams) => ({
    type: SET_TEAMS,
    teams
});

const createTeamAction = (team) => ({
    type: CREATE_TEAM,
    team
});

const deleteTeamAction = (teamId) => ({
    type: DELETE_TEAM,
    teamId
})

export const clearTeams = () => ({
    type: CLEAR_TEAMS
});

export const createTeamThunk = (team, userId) => async dispatch => {
    console.log("dispatching to api route", {...team, userId})
    const res = await fetch(`api/teams/${userId}/create-team`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(
            team
        )
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(createTeamAction(data))
        return
    } else return {"error": "Something went wrong creating your team"}
};

export const deleteTeamThunk = (teamId) => async dispatch => {
    const res = await fetch(`api/teams/${teamId}/delete`, {
        method: "DELETE"
    });

    const data = await res.json();

    dispatch(deleteTeamAction(teamId))

    return
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
        case DELETE_TEAM:
            let newState = {...state}
            delete newState[action.teamId]
            return newState
        case CLEAR_TEAMS:
            return {}
        default:
            return state
    }
}

export default teamsReducer;