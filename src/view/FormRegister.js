import React, { Component } from 'react'
import axios from 'axios'

class FormRegister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: '',
            lastname:'',
            username: '',
            dateOfBirth: '',
            phone: '',
            image: '',
            email: '',
            password: '',
        }
        this.formHandler = this.formHandler.bind(this)
        this.formSubmit = this.formSubmit.bind(this)
    }
    formHandler(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    formSubmit(e) {
        e.preventDefault()
        axios.post('https://dumb-tick-express.herokuapp.com/api/v1/register', {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            username: '@'+this.state.firstname,
            dateOfBirth: this.state.dateOfBirth,
            phone: this.state.phone,
            image: this.state.image,
            email: this.state.email,
            password: this.state.password
        })
    }
    render() {
        return(
            // <form onSubmit={this.formSubmit}>
            // <input type="text"
            //  name="fullname"
            //  onChange={this.formHandler}
            //   value={this.state.fullname}
            //    placeholder="fullname" /> 
            // <input type="email"
            //  name="email"
            //   onChange={this.formHandler}
            //    value={this.state.email}
            //     placeholder="email" />
            // <input type="password"
            //  name="password"
            //   onChange={this.formHandler}
            //    value={this.state.password}
            //     placeholder="password" />  
            // <button type="submit">submit</button>
            // </form>
            <form onSubmit={this.formSubmit}>
            <label>Fisrt Name</label>
            <input type="text"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="firstname"
             onChange={this.formHandler}
             value={this.state.firstname}
            ></input><br></br><br></br>
            <label>Last Name</label>
            <input type="text"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="lastname"
             onChange={this.formHandler}
             value={this.state.lastname}
            ></input><br></br><br></br> 
            <label>Date Of Birth</label>
            <input type="date"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="dateOfBirth"
             onChange={this.formHandler}
             value={this.state.dateOfBirth}
            ></input><br></br><br></br>
            <label>Phone</label>
            <input type="text"
             limit="13"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="phone"
             onChange={this.formHandler}
             value={this.state.phone}
            ></input><br></br><br></br>                               
            <label>E-mail &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="email"
            placeholder="&#128712;"
            style={{border:"none",borderBottom:"2px solid grey"}}
            name="email"
            onChange={this.formHandler}
            value={this.state.email}
            ></input><br></br><br></br>            
            <label>Password</label>
            <input type="password"
             placeholder="&#128712;"
             style={{border:"none",borderBottom:"2px solid grey"}}
             name="password"
             onChange={this.formHandler}
             value={this.state.password}
             ></input><br></br><br></br>
            <button className="btn btn-dark" type="submit">Registration</button><br></br><br></br><br></br>
        </form>
        )
    }
}

export default FormRegister