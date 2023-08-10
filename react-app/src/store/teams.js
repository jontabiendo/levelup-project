import { addTeamList } from './lists';
import { deleteRequestAction } from './session'

const SET_TEAMS = "teams/SET_TEAMS";
const CLEAR_TEAMS = "teams/CLEAR_TEAMS";
const CREATE_TEAM = "teams/CREATE_TEAM";
const DELETE_TEAM = "teams/DELETE_TEAM";
const EDIT_TEAM = 'team/EDIT_TEAM';
const REQUEST_MEMBER = "team/REQUEST_MEMBER";
const JOIN_TEAM = "team/JOIN_TEAM";
const LEAVE_TEAM = 'team/LEAVE_TEAM'

export const setTeams = (teams) => ({
    type: SET_TEAMS,
    teams
});

const createTeamAction = (team) => ({
    type: CREATE_TEAM,
    team
});

const editTeamAction = team => ({
    type: EDIT_TEAM,
    team
});

const deleteTeamAction = (teamId) => ({
    type: DELETE_TEAM,
    teamId
});

export const clearTeams = () => ({
    type: CLEAR_TEAMS
});

const requestMemberAction = (request) => ({
    type: REQUEST_MEMBER,
    request
});

const joinTeamAction = (team) => ({
    type: JOIN_TEAM,
    team
});

const leaveTeamAction = (teamId) => ({
    type: LEAVE_TEAM,
    teamId
});

export const createTeamThunk = (team, userId) => async dispatch => {
    const res = await fetch(`api/teams/${userId}/create-team`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: team.name,
            description: team.description
        })
    });

    const data = await res.json();

    if (res.ok) {
        dispatch(createTeamAction(data))
        return
    } else return data
};

export const editTeamThunk = (team, teamId) => async dispatch => {
    const res = await fetch(`/api/teams/${teamId}/edit`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: team.name,
            description: team.description
        })
    })

    const data = await res.json();

    if (res.ok) {
        dispatch(editTeamAction(data))
        return
    } else return data
};

export const deleteTeamThunk = (teamId) => async dispatch => {
    const res = await fetch(`api/teams/${teamId}/delete`, {
        method: "DELETE"
    });

    const data = await res.json();

    dispatch(deleteTeamAction(teamId))

    return
}

export const inviteMemberThunk = (email, team_id) => async dispatch => {
    const res = await fetch('/api/requests/invite/send', {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email,
            team_id
        })
    });

    const data = await res.json();

    if (data.error) {
        return data
    } else {
        dispatch(requestMemberAction(data))
        return
    }
};

export const respondInviteThunk = (response, request) => async dispatch => {
    const res = await fetch(`/api/requests/${request.id}/respond`, {
        method: "DELETE",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            response,
            request
        })
    });

    const data = await res.json();

    if (data.error) return data;
    else if (data.deleted) {
        dispatch(deleteRequestAction(request.id));

        return data;
    } else {
        console.log(data)
        dispatch(joinTeamAction(data));
        dispatch(addTeamList(Object.values(data)[0].lists))
        dispatch(deleteRequestAction(request.id));

        return;
    }
};

export const leaveTeamThunk = teamId => async dispatch => {
    const res = await fetch(`/api/teams/${teamId}/leave`, {
        method: "DELETE"
    });

    const data = await res;
    console.log("deleting team from redux")

    dispatch(leaveTeamAction(teamId))
    return
};

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
                ...action.team
            }
        case EDIT_TEAM:
            return {
                ...state,
                ...action.team
            }
        case DELETE_TEAM:
            let newState = {...state}
            delete newState[action.teamId]
            return newState
        case CLEAR_TEAMS:
            return {}
        case REQUEST_MEMBER:
            return {
                ...state,
                [action.request.team_id]: {
                    ...state[action.request.team_id],
                    invitations: {
                        ...state[action.request.team_id].invitations,
                        [action.request.id]: action.request
                    }
                }
            }
        case JOIN_TEAM:
            return {
                ...state,
                ...action.team
            }
        case LEAVE_TEAM:
            let newState1 = {...state};
            delete newState1[action.teamId]
            return newState1
        default:
            return state
    }
}

export default teamsReducer;