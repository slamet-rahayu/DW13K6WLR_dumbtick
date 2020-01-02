import React, { Component } from 'react';
import { Navbar, Nav, Button, ButtonGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Register from '../App';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Content from '../components/Content'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'
import Login from '../components/Loginmodal'
const jwt = require('jsonwebtoken')

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const tokenraw = localStorage.getItem('token')

class Categorydetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacategory: [],
      user: [],
      price:'',
      amount: 1,
      Loading: false
    }
    this.priceHandler = this.priceHandler.bind(this)
    this.amountIncrement = this.amountIncrement.bind(this)
    this.amountDecrement = this.amountDecrement.bind(this)
  }
  amountIncrement(e){
    e.preventDefault()
    this.setState({amount: this.state.amount+1})
  }
  amountDecrement(e){
    e.preventDefault()
    if(this.state.amount>1) {
    this.setState({amount: this.state.amount-1})
    }
  }
  priceHandler(e) {
    
  }

  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('http://localhost:5000/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
       console.log(res)
     })
     }
    axios.get('http://localhost:5000/api/v1/eventdetail/'+(id))
    .then(res=>{
      this.setState({data: res.data, datacategory: res.data.category})
      this.setState({price: res.data.price})
    })
  }
  render(){
    const price = this.state.amount * this.state.price
    return(
      <text>
        <Header />
      <Container>
      <br></br>
      <Row>
          <Col>
          <Card>
            <Card.Img variant="top" 
            src={this.state.data.img} />
            <Card.Body>
            <Card.Title><text style={{fontSize:"50px",fontWeight:"400"}}>{this.state.data.title}</text>
            <text style={{float:"right"}}>
              <Row>
                <Col>
                <text style={{fontSize:"40px"}}>Rp. {price}</text>
                </Col>
              </Row>
              &nbsp;
              <Row>
                <Col>
                <ButtonGroup>
                <Button onClick={this.amountIncrement} variant="secondary">
                  <text>+</text>
                </Button>
                <Button  variant="secondary" disabled>
                <text>{this.state.amount}</text>
                </Button>
                <Button onClick={this.amountDecrement} variant="secondary">
                <text>-</text>
                </Button>
              </ButtonGroup>
              &nbsp;
              {/* <Button variant="danger" onClick={()=>{window.location='/Payment?a='+this.state.amount+'&p='+price+'&id='+this.state.data.id}}>Buy</Button> */}
              <Buttonbuy 
              price={price}
              id={this.state.data.id}
              amount={this.state.amount}
              />
                </Col>
              </Row>
            </text>
            </Card.Title>
            <Card.Text>
            <text style={{fontSize:"25px",color:"red"}}>{this.state.datacategory.name}</text>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Row>
              <Col lg={4}>
                <h5><b>Hosted By</b></h5>
                <p>Juni Concert</p>
              </Col>
              <Col lg={4}>
                <center>
                  <text style={{textAlign:"left"}}>
                <h5><b>Date & Time</b></h5>
                <p>
                <Moment format="ddd DD MMM YYYY">
                {this.state.data.startTime}
                </Moment>
                &nbsp;-&nbsp;
                <Moment format="ddd DD MMM YYYY">
                {this.state.data.endtTime}
                </Moment>
                </p>
                <p>
                <Moment format="HH:mm">
                {this.state.data.startTime}
                </Moment>
                &nbsp;-&nbsp;
                <Moment format="HH:mm">
                {this.state.data.endtTime}
                </Moment>
                </p>
                </text>
                </center>
              </Col>
              <Col lg={4}>
                <text style={{float:"right"}}>
                <h5><b>Contact Person</b></h5>
                 <p>{(this.state.user.firstname)+' '+(this.state.user.lastname)}</p>
                <p>{this.state.data.phone}</p>
                <p>{this.state.data.email}</p>
                </text>
              </Col>              
            </Row>
            </Card.Footer>
         </Card>
          </Col>
      </Row>
      <br></br>
      <Row>
        <Col className="mb-4">
        <center><h4>Event Description</h4></center>
        <p style={{fontSize:"13px", textAlign:"justify", lineHeight:"1.5"}}>
          {this.state.data.description}
        </p>
        </Col>
        <Col>
        <center><h3>Location</h3></center>
         <p style={{fontSize:"13px", lineHeight:"1.5"}}>{this.state.data.address}</p>
         <center><p><iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3212.3660793361587!2d106.80389742161134!3d-6.2207402908963125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7f2d1c6db9fe661f!2sIstora%20Stadium!5e0!3m2!1sen!2sid!4v1577618273611!5m2!1sen!2sid" width="550" height="250" frameborder="0" style={{border:"0"}} allowfullscreen="">
          </iframe></p></center>
          <p><center><h3>Share Event</h3></center></p>
          <Row>
            <Col>
            <Button block><i class="fa fa-twitter"></i>&nbsp;Twitter</Button>
            </Col>
            <Col>
            <Button block><i class="fa fa-facebook"></i>&nbsp;Facebook</Button>
            </Col>
            <Col>
            <Button block variant="secondary"><i class="fa fa-chain"></i>&nbsp;Copy</Button>
            </Col>
          </Row>
       </Col>
      </Row>
        <br></br>
      </Container>
      <Footer />
      </text>
    )
  }
}

class Buttonbuy extends Component {
  render(){
    if (localStorage.getItem('token') !== null) {
      return(
        <Button variant="danger" onClick={()=>{window.location='/Payment?a='+this.props.amount+'&p='+this.props.price+'&id='+this.props.id}}>Buy</Button>
      )
     }
     return (
      <Login />
     )
  }
}

export default Categorydetail;