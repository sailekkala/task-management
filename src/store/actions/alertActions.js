import {ALERT_CLEAR, ALERT_ERROR, ALERT_SUCCESS} from "../types";

export const alertSuccess = (message) => dispatch => {
    dispatch({type: ALERT_SUCCESS, message})
}
export const alertError = (message) => dispatch => {
    dispatch({type: ALERT_ERROR, message})
}
export const alertClear = () => dispatch => {
    dispatch({type: ALERT_CLEAR})
}

