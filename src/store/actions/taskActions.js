import {
    CREATE_TASK,
    CREATE_TASK_ERROR,
    DELETE_TASK,
    DELETE_TASK_ERROR,
    GET_TASKS,
    GET_TASKS_ERROR,
    UPDATE_TASK,
    UPDATE_TASK_ERROR
} from "../types";


let tasksList = JSON.parse(localStorage.getItem('taskList')) || [];


export const getAllTasks = () => dispatch => {
    try {
        dispatch({
            type: GET_TASKS,
            payload: tasksList
        })
    } catch (error) {
        dispatch({
            type: GET_TASKS_ERROR,
            payload: error
        })
    }
};

export const createTask = (task) => dispatch => {
    try {
        tasksList.push(task);
        localStorage.setItem('taskList', JSON.stringify(tasksList));
        dispatch({
            type: CREATE_TASK,
            payload: task
        });
    } catch (error) {
        dispatch({
            type: CREATE_TASK_ERROR,
            payload: error
        })
    }
}

export const deleteTask = (task) => dispatch => {
    try {
        dispatch({
            type: DELETE_TASK,
            payload: task
        })
    } catch (error) {
        dispatch({
            type: DELETE_TASK_ERROR,
            payload: error
        })
    }
}


export const updateTask = (task) => dispatch => {
    try {
        dispatch({
            type: UPDATE_TASK,
            payload: task
        })
    } catch (error) {
        dispatch({
            type: UPDATE_TASK_ERROR,
            payload: error
        })
    }
}
