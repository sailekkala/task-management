import {combineReducers} from 'redux'
import jokesReducer from './jokesReducer';
import taskReducer from "./taskReducer";
import {authentication} from "./authReducer";
import {alertReducer} from "./alertReducer";

export default combineReducers({
    jokesList: jokesReducer,
    taskList: taskReducer,
    authentication: authentication,
    alert: alertReducer
})
