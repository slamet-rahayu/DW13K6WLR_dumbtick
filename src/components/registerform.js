import React, { Component } from 'react'
import axios from 'axios'

class LoginForm extends Component {
    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
        this.formHandler = this.formHandler.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }
    formHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    formSubmit(e) {
        axios.post('http://localhost:8090/api/v1/login', {
            email: this.state.email,
            password: this.state.password
        }).then(res=> {
            
        })
    }
}