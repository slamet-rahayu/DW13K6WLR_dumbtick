import { 
    GET_CATEGORY,
    GET_CATEGORY_PENDING,
    GET_CATEGORY_PG
    } from '../config/constants'
    
const initialState = {
    category: [],
    categorypg : [],
    isLoading: ''
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_CATEGORY_PENDING:
            return {
                ...state,
                isLoading: true
            }
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