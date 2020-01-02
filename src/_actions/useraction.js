import {
         GET_USER
         } from '../config/constants'
import axios from 'axios'

export const getUser = () => {
  if (localStorage.getItem('token') !== null) {
    const tokenraw = localStorage.getItem('token')
    const jwt = require('jsonwebtoken')
    const token = jwt.verify(tokenraw, 'pssst!')
    return(dispatch) => {
        return axios.get('http://localhost:5000/api/v1/user/'+token.userId)
            .then(user => {
            dispatch({
                    type: GET_USER,
                    payload: user.data
                })
            })
        }
    }
}