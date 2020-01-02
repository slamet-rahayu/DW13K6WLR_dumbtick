import { 
    GET_USER
    } from '../config/constants'
    
const initialState = {
    user: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        default: return state;
    }
}