import {
    GET_EVENTS
    } from '../config/constants'
import axios from 'axios'

export const getEvents = () => {
    return(dispatch) => {
       return axios.get('http://localhost:5000/api/v1/events')
        .then(event => {
        dispatch({
                type: GET_EVENTS,
                payload: event.data
            })
        })
    }
}
