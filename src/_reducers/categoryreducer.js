import { 
    GET_CATEGORY,
    GET_CATEGORY_PG
    } from '../config/constants'
    
const initialState = {
    category: [],
    categorypg : []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY:
            return {
                ...state,
                category: action.payload,
                isLoading: false
            }
        case GET_CATEGORY_PG:
            return {
                ...state,
                categorypg: action.payload,
                isLoading: false
            }
        default: return state;
    }
}