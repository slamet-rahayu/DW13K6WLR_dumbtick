import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'

const jwt = require('jsonwebtoken')
const tokenraw = localStorage.getItem('token')

const QRCode = require('qrcode.react');
const query = new URLSearchParams(window.location.search)
const id = query.get('id')

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      user: [],
      datacontent: [],
      Loading: false
    }
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/confirmed/'+token.userId)
     .then(res=>{
       this.setState({user: res.data, data: res.data.payments})
     })
     }
  }
  render(){
    console.log('data', this.state.data)
    const array = [
      'title : '+this.state.data.title,
      'price : '+this.state.data.price,
    ]
    const string = array.toString()
    const d = new Date()
    return(
        <text>
        <Header />
      <Container>
      <br></br>
      <Row>
          <Col>
          <h2><b>My ticket</b></h2>
          </Col>
      </Row>
      {this.state.data.map(s=>{
          return(
          <text>{s.status === 'Confirmed' ? 
          <text>
          <br></br>
            <Card>
            <Card.Header>{(this.state.user.firstname)+' '+(this.state.user.lastname)}
            {s.event.startTime === new Date() ? '' : <text style={{fontWeight:"bold",color:"red", float:"right"}}>Expired</text> }
            </Card.Header>
                <Card.Body>
                <Card.Title><b>{s.event.title}</b><text style={{float:"right"}}>Rp. {s.event.price}</text></Card.Title>
                <QRCode value={s.event.id} size="80" style={{float:"right"}}/>
                    <Card.Text>
                    <Moment format="ddd. DD MMM YYYY">
                    {s.event.startTime}
                    </Moment>
                    &nbsp;
                    at
                    &nbsp;
                    <Moment format="HH:mm">
                    {s.event.startTime}
                    </Moment> 
                    <p></p>
                    <p>{s.event.address}</p>
                    </Card.Text>
                </Card.Body>
              </Card>
      <br></br>
      </text> : ''
        }</text>
          )
      })}
      </Container>
      <Footer />
      </text>
    )
  }
}

export default Profile;