import {GET_USER, USER_LOGIN, USER_LOGIN_ERROR, USER_LOGOUT} from "../types";

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? {loggedIn: true, user} : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case GET_USER:
            return {
                loggingIn: true,
                user: action.payload
            }
        case USER_LOGIN:
            return {
                loggingIn: true,
                user: action.user
            };
        case USER_LOGIN_ERROR:
            return {};
        case USER_LOGOUT:
            return {};
        default:
            return state
    }
}
