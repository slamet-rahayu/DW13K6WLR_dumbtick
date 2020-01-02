import React, { Component } from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Register from '../App';
import Login from './Login';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Content from '../components/Content'
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
      Loading: false
    }
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
     const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('http://localhost:5000/api/v1/user/'+token.userId)
    .then(res=>{
      this.setState({user: res.data})
    })
    }
    axios.get('http://localhost:5000/api/v1/categories/3')
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
            <p>{this.state.user.dateOfBirth}</p>
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