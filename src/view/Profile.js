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
import Moment from 'react-moment'
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
      Loading: false
    }
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
            <h3><b>{(this.state.user.firstname)+' '+(this.state.user.lastname)}</b></h3>
            <p>
            <Moment format="DD MMM YYYY">
            {this.state.user.dateOfBirth}
            </Moment>
            </p>
            <p>{this.state.user.phone}</p>
            <p>{this.state.user.email}</p>
            </Col>
            <Col>
            <Button variant="danger" onClick={()=> window.location="/Formeditprofile"}>edit profile</Button>
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