import {CREATE_TASK, CREATE_TASK_ERROR, DELETE_TASK, GET_TASKS, GET_TASKS_ERROR, UPDATE_TASK} from "../types";

const initialState = {
    tasks: JSON.parse(localStorage.getItem('taskList')) || [],
    loading: true
}

export default function taskReducer(state = initialState, action) {
    switch (action.type) {
        case GET_TASKS :
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        case GET_TASKS_ERROR : {
            return {
                loading: false,
                error: action.payload
            }
        }
        case CREATE_TASK :
            return {}
        case CREATE_TASK_ERROR :
            return {
                loading: false,
                error: action.payload
            }

        case DELETE_TASK :
            let tasks = state.tasks.filter(task => task.id !== action['payload']['id']);
            localStorage.setItem('taskList', JSON.stringify(tasks));
            return {
                tasks: tasks
            }
        case UPDATE_TASK :
            for (let i = 0; i < state.tasks.length; i++) {
                if (state.tasks[i].id === action['payload']['id']) {
                    state.tasks[i]['taskName'] = action['payload']['taskName'];
                    state.tasks[i]['taskDesc'] = action['payload']['taskDesc'];
                    state.tasks[i]['startDateTime'] = action['payload']['startDateTime'];
                    state.tasks[i]['endDateTime'] = action['payload']['endDateTime'];
                    break;
                }
            }
            localStorage.setItem('taskList', JSON.stringify(state.tasks));
            return {
                tasks: state.tasks
            }
        default:
            return state
    }
}


