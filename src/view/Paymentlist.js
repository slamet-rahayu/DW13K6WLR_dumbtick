import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import '../App.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'
import Prove from '../struk.jpg'
const jwt = require('jsonwebtoken')

const QRCode = require('qrcode.react');

const query = new URLSearchParams(window.location.search)
const amount = query.get('a')
const price = query.get('p')
const idev = query.get('id')
const tokenraw = localStorage.getItem('token')


class Payment extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      user: [],
      paydata: [],
      events: [],
      amounts: amount,
      Loading: false
    }
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(e){
    axios.post('https://dumb-tick-express.herokuapp.com/api/v1/payments',{
            orderBy: this.state.user.id,
            event_id: this.state.data.id,
            amount: amount
          })
    window.location.reload()
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/payments/'+token.userId)
     .then(res=>{
       this.setState({paydata: res.data.payments})
       console.log('paydata', res.data.payments)
     })
     }
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/eventdetail/'+idev)
    .then(res=>{
      this.setState({data: res.data})
    })
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/events')
    .then(res=>{
      this.setState({events: res.data})
    })
  }
  render(){
    console.log('payment', this.state.paydata)
    const array = [
      'title : '+this.state.data.title,
      'price : '+this.state.data.price,
    ]
    const string = array.toString()
    return(
    <text>
      <Header />
      <Container>
      <br></br>
      <Card>
      <Card.Header><h3>Payment</h3></Card.Header>  
        {this.state.paydata.map((s,k)=>{
            return(
 <div style={{margin:"3% 10% 0% 10%"}}>
  <Card>
  <Card.Header><b>{(this.state.user.firstname+' '+(this.state.user.lastname))}</b></Card.Header>
        <Card.Body>
        <Card.Title><b>{s.event.title}</b><text style={{float:"right"}}>Rp. {s.event.price}</text></Card.Title>
        <QRCode value={string} size="80" style={{float:"right"}}/>
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
        <p><b>Shopping Summary</b></p>
        <p>Total Price ({s.amount} item)<text style={{float:"right"}}>Rp. {s.amount*s.event.price}</text></p>
        <hr style={{borderWidth:"3px",borderColor:"black"}}></hr>
        {s.status === 'Pending' ? 
        <Button variant="warning" style={{float:"right"}}
        disabled
        ><b>{s.status}</b></Button>
        :
        <Button variant="success" style={{float:"right"}}
        disabled
        ><b>{s.status}</b></Button>
      
       }
        <b>Prove of payment</b>
        <p>
          <img src={Prove} alt="prove" width="150" height="200"></img>
        </p>
        </div>
            )
        })}
        </Card>
        <br></br>
      </Container>
      <Footer />
      </text>
    )
  }
}

class Buttonconf extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      user: [],
      paydata: [],
      events: [],
      amounts: amount,
      Loading: false
    }
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(e){
    axios.post('https://dumb-tick-express.herokuapp.com/api/v1/payments',{
            orderBy: this.state.user.id,
            event_id: this.state.data.id,
            amount: amount
          })
    window.location.reload()
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/payments/'+token.userId)
     .then(res=>{
       this.setState({paydata: res.data.payments})
       console.log('paydata', res.data.payments)
     })
     }
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/eventdetail/'+idev)
    .then(res=>{
      this.setState({data: res.data})
    })
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/events')
    .then(res=>{
      this.setState({events: res.data})
    })
  }
  render(){
    if (this.state.paydata.find(e=>e['status'] !== 'Pending')) {
      return(
        <text>
        <Button variant="warning" style={{float:"right"}}
        disabled
        ><b>pending</b></Button>
        </text>
      )
    }
    return(
      <text>
        <Button variant="success" style={{float:"right"}}
        disabled
        ><b>Confirmed</b></Button>
      </text>
    )
  }
}

export default Payment;