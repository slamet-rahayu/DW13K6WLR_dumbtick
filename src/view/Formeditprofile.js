import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Favourites from '../components/Favourites'
const jwt = require('jsonwebtoken')

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const tokenraw = localStorage.getItem('token')

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacontent: [],
      user: [],
      Loading: false,
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
  formHandler(e){
    this.setState({[e.target.name]: e.target.value})
  }
  formSubmit(e){
    axios.patch('https://dumb-tick-express.herokuapp.com/api/v1/user/'+(this.state.user.id),{
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      username: '@'+this.state.firstname,
      dateOfBirth: this.state.dateOfBirth,
      phone: this.state.phone,
      image: this.state.image,
      email: this.state.email,
      password: this.state.password
    })
    .then(res=>{
      alert('sukses', res)
    })
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
     const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
    .then(res=>{
      this.setState({user: res.data})
    })
    }
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/categories/3')
    .then(res=>{
      this.setState({data: res.data, datacontent: res.data.events})
    })
  }
  render(){
    return(
      <text>
    <Header />
      <Container>
      <br></br>
          <Row>
            <Col>
              <h3><b>Profile</b></h3>
            </Col>
          </Row>
      <br></br>
          <Row>
            <Col>
            <form onSubmit={this.formSubmit}>
            <p><input
             type="text"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"transparent"}}
             name="firstname"
             placeholder="First Name"
             value={this.state.user.firstname}
             onChange={this.formHandler}
             ></input> </p>
            <p><input 
            type="text"
            style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"transparent"}}
            name="lastname"
            placeholder="Last Name"
            value={this.state.user.lastname}
            onChange={this.formHandler}
            ></input> </p>
            <p><input type="date"
            style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"transparent"}}
            name="dateOfBirth"
            placeholder="Date Of Birth"
            value={this.state.user.dateOfBirth}
            onChange={this.formHandler}
            ></input> </p>
            <p><input type="text"
            style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"transparent"}}
            name="phone"
            placeholder="Phone"
            value={this.state.user.phone}
            onChange={this.formHandler}
            ></input> </p> 
            <p><input type="email"
            style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"transparent"}}
            name="email"
            placeholder="E-mail"
            value={this.state.user.email}
            onChange={this.formHandler}
            ></input> </p>
            <p><input type="password"
            style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"transparent"}}
            name="password"
            placeholder="Password"
            value={this.state.user.password}
            onChange={this.formHandler}
            ></input> </p>
            </form>       
            </Col>
            <Col>
            <center>
            <Button variant="danger" type="submit" onClick={this.formSubmit}>Save</Button>
            </center>
            </Col>
            <Col>
            <img src="https://mundoalbiceleste.com/wp-content/uploads/2019/12/messibragoal.jpg" alt="profile" width="200" height="200" style={{borderRadius:"100%"}} />
            </Col>
          </Row>
      <Row>
        <Col>
        <h2>Favourites</h2>
        </Col>
      </Row>
        <Favourites />
        <br></br>
      </Container>
      <Footer />
      </text>
    )
  }
}

export default Profile;