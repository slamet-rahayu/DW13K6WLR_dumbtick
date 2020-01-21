import {
    GET_EVENTS,
    GET_EVENTS_PENDING
    } from '../config/constants'
import axios from 'axios'

export const getEvents = () => {
    return(dispatch) => {
        dispatch({
            type: GET_EVENTS_PENDING
        })
       axios.get('https://dumb-tick-express.herokuapp.com/api/v1/events')
        .then(event => {
        dispatch({
                type: GET_EVENTS,
                payload: event.data
            })
        })
    }
}
