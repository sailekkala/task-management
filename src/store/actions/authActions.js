import {GET_USER, USER_LOGIN, USER_LOGIN_ERROR, USER_LOGOUT, USER_LOGOUT_ERROR} from "../types";
import {alertError} from "./alertActions";


let users = [{
    userName: 'Demo',
    password: 'demo@123'
}]

export const loginUser = (user) => dispatch => {
    const findUser = users.find(x => x.userName === user.userName && x.password === user.password);
    if (!findUser){
        dispatch(alertError('Username or password is incorrect'));
        dispatch({
            type: USER_LOGIN_ERROR,
            payload: 'ERROR'
        })
    } else {
        localStorage.setItem('user', JSON.stringify(findUser));
        dispatch({
            type: USER_LOGIN,
            payload: findUser
        });
        dispatch(getUser())
    }
};

export const logOutUser = () => dispatch => {
    try {
        localStorage.clear();
        dispatch({
            type: USER_LOGOUT,
            payload: {}
        })
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_ERROR,
            payload: error
        })
    }
}

export const getUser = () => dispatch => {
    dispatch({
        type : GET_USER,
        payload: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {}
    })
}
