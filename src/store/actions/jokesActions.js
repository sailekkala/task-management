import { GET_JOKES, JOKES_ERROR } from "../types";
import axios from "axios";



export const getJokes = () =>  async  dispatch => {
    try {
        const res =  await axios.get('https://official-joke-api.appspot.com/jokes/ten')
        dispatch({
            type : GET_JOKES,
            payload : res.data
        })
    }
    catch(error) {
        dispatch({
            type:  JOKES_ERROR,
            payload : error
        })
    }
}
