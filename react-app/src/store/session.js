import { clearLists, setLists } from "./lists";
import { clearTeams, setTeams } from "./teams";

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";

const setUser = (user) => ({
	type: SET_USER,
	payload: user,
});

const removeUser = () => ({
	type: REMOVE_USER,
});

const manipulateData = (data) => {
	const objReturn = {};

	objReturn.lists = data.lists;
	objReturn.teams = data.teams;
	delete data.lists
	delete data.teams
	objReturn.user = data

	return objReturn;
}

export const authenticate = () => async (dispatch) => {
	const response = await fetch("/api/auth/", {
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return;
		}
		const manData = manipulateData(data)

		dispatch(setUser(manData.user));
		dispatch(setLists(manData.lists));
		dispatch(setTeams(manData.teams));
	}
};

export const login = (email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/login", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));

		const manData = manipulateData(data)
		dispatch(setLists(manData.lists))
		dispatch(setTeams(manData.teams))
		return null;

	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

export const logout = () => async (dispatch) => {
	const response = await fetch("/api/auth/logout", {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.ok) {
		dispatch(removeUser());
		dispatch(clearLists());
		dispatch(clearTeams());
	}
};

export const signUp = (first_name, last_name, email, password) => async (dispatch) => {
	const response = await fetch("/api/auth/signup", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({
			first_name,
			last_name,
			email,
			password,
		}),
	});

	if (response.ok) {
		const data = await response.json();
		dispatch(setUser(data));

		const manData = manipulateData(data)
		dispatch(setLists(manData.lists))
		dispatch(setTeams(manData.teams))
		
		return null;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data.errors;
		}
	} else {
		return ["An error occurred. Please try again."];
	}
};

const initialState = {
	user: null
};

export default function reducer(state = initialState, action) {
	switch (action.type) {
		case SET_USER:
			return { user: action.payload };
		case REMOVE_USER:
			return { user: null};
		default:
			return state;
	}
}