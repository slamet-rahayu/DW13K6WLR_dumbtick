import { 
    GET_EVENTS,
    GET_EVENTS_PENDING
    } from '../config/constants'
    
const initialState = {
    events: [],
    isLoading: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS_PENDING:
            return {
                ...state,
                isLoading: true
            }
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                isLoading: false
            }
        default: return state;
    }
}