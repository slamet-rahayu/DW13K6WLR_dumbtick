import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
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
      amounts: amount,
      Loading: false
    }
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(e){
    axios.post('http://localhost:5000/api/v1/payments',{
            orderBy: this.state.user.id,
            event_id: this.state.data.id,
            amount: amount
          })
    window.location.reload()
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('http://localhost:5000/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     axios.get('http://localhost:5000/api/v1/payments/'+token.userId)
     .then(res=>{
       this.setState({paydata: res.data.payments})
     })
     }
    axios.get('http://localhost:5000/api/v1/eventdetail/'+idev)
    .then(res=>{
      this.setState({data: res.data})
    })
  }
  render(){
    const array = [
      'title : '+this.state.data.title,
      'price : '+this.state.data.price,
    ]
    const string = array.toString()
    const color = 'warning'
    return(
        <text>
        <Header />
      <Container>
      <br></br>
      <Card>
      <Card.Header><h3>Payment</h3></Card.Header>  
        <div style={{margin:"3% 10% 0% 10%"}}>
  <Card>
  <Card.Header><b>{(this.state.user.firstname+' '+(this.state.user.lastname))}</b></Card.Header>
        <Card.Body>
        <Card.Title><b>{this.state.data.title}</b><text style={{float:"right"}}>Rp. {this.state.data.price}</text></Card.Title>
        <QRCode value={string} size="80" style={{float:"right"}}/>
            <Card.Text>
            <Moment format="ddd. DD MMM YYYY">
            {this.state.data.startTime}
            </Moment>
            &nbsp;
            at
            &nbsp;
            <Moment format="HH:mm">
            {this.state.data.startTime}
            </Moment>
            <p></p>
            <p>{this.state.data.address}</p>
            </Card.Text>
        </Card.Body>
      </Card>
        <br></br>
        <p><b>Shopping Summary</b></p>
        <p>Total Price ({amount} item)<text style={{float:"right"}}>Rp. {price}</text></p>
        <hr style={{borderWidth:"3px",borderColor:"black"}}></hr>
        {/* <Button variant={color} style={{float:"right"}}
        onClick={this.submitHandler}
        ><b>Confirm</b></Button> */}
        <Buttonconf />
        <b>Prove of payment</b>
        <p>
          <img src={Prove} alt="prove" width="150" height="200"></img>
        </p>
        </div>
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
      amounts: amount,
      Loading: false
    }
    this.submitHandler = this.submitHandler.bind(this)
  }
  submitHandler(e){
    axios.post('http://localhost:5000/api/v1/payments',{
            orderBy: this.state.user.id,
            event_id: this.state.data.id,
            amount: amount
          })
    window.location.reload()
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('http://localhost:5000/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     axios.get('http://localhost:5000/api/v1/payments/'+token.userId)
     .then(res=>{
       this.setState({paydata: res.data.payments})
     })
     }
    axios.get('http://localhost:5000/api/v1/eventdetail/'+idev)
    .then(res=>{
      this.setState({data: res.data})
    })
  }
  render(){
    if (this.state.paydata.find(e=>e['event_id'] == idev)) {
      return(
        <text>
        <Button variant="warning" style={{float:"right"}}
        onClick={this.submitHandler}
        disabled
        ><b>pending</b></Button>
        </text>
      )
    }
    return(
      <text>
        <Button variant="danger" style={{float:"right"}}
        onClick={this.submitHandler}
        ><b>Confirm</b></Button>
      </text>
    )
  }
}

export default Payment;