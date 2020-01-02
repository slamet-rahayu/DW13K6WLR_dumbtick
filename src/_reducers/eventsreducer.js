import { 
    GET_EVENTS
    } from '../config/constants'
    
const initialState = {
    events: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
                isLoading: false
            }
        default: return state;
    }
}