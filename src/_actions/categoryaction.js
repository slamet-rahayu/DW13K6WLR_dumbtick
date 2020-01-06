import {
    GET_CATEGORY,
    GET_CATEGORY_PG
    } from '../config/constants'
import axios from 'axios'

export const getCategory = () => {
    return(dispatch) => {
       return axios.get('http://localhost:5000/api/v1/categories')
        .then(event => {
         dispatch({
                type: GET_CATEGORY,
                payload: event.data
            })
        })
    }
}

export const getCatPage = (id) => {
    return(dispatch) => {
       return axios.get('http://localhost:5000/api/v1/categories/'+id)
        .then(event => {
        dispatch({
                type: GET_CATEGORY_PG,
                payload: event.data
            })
        })
    }
}