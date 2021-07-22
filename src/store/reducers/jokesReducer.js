import { GET_JOKES, JOKES_ERROR} from "../types";

const initialState = {
    jokes: [],
    loading : true
}

export default function jokesReducer(state = initialState, action){
    switch (action.type) {
        case GET_JOKES:
            return {
               ...state,
               jokes : action.payload,
               loading : false 
            }

        case JOKES_ERROR: 
             return {
                 loading : false,
                 error : action.payload
             }   
        default: return state
    }
}