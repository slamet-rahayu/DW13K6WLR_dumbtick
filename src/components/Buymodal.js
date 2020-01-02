import React, {Component} from 'react';
import left from '../left.png';
import right from '../right.png';
import '../App.css'
import { Modal } from 'react-bootstrap';
import { ButtonToolbar } from 'react-bootstrap';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom';
import Login from '../view/Login';
import ReactDOM from 'react-dom';
import axios from 'axios'
import Eventdetail from '../view/Eventdetail'
import Moment from 'react-moment'
import Card from 'react-bootstrap/Card'
import { Navbar, Nav, Button, ButtonGroup} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>hello</h4>
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
        <center>
        <ModalContent />
        </center>
        
      </Modal.Body>
      {/* <Modal.Footer closeButton>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function Buy(props) {
  const [modalShow, setModalShow] = React.useState(false);
  return (
    <ButtonToolbar>
      <Button 
      variant="light"
      style={{position:"absolute",marginLeft:"75%",
      color:"red",marginTop:"2%",fontWeight:"bold",fontSize:"10px"}}      
      onClick={() => setModalShow(true)}>
        {props.price}
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </ButtonToolbar>
  );
}

class ModalContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacategory: [],
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
    axios.get('http://localhost:5000/api/v1/eventdetail/2')
    .then(res=>{
      this.setState({data: res.data, datacategory: res.data.category})
      this.setState({price: res.data.price})
    })
  }
  render(){
    const price = this.state.amount * this.state.price
    return(
      <text>
          <Card>
            <Card.Img variant="top" 
            src={'http://localhost:5000/images/'+(this.state.data.img)} />
            <Card.Body>
            <Card.Title><text style={{fontSize:"20px"}}>{this.state.data.title}</text>
            <text style={{float:"right"}}>
              <Row>
                <Col>
                <text style={{fontSize:"20px"}}>Rp. {price}</text>
                </Col>
              </Row>
              &nbsp;
              <Row>
                <Col>
                <ButtonGroup>
                <Button onClick={this.amountIncrement} variant="secondary">
                  <text>+</text>
                </Button>
                <Button variant="secondary" disabled>
                <text>{this.state.amount}</text>
                </Button>
                <Button onClick={this.amountDecrement} variant="secondary">
                <text>-</text>
                </Button>
              </ButtonGroup>
              &nbsp;
              <Button variant="danger" onClick={()=>{window.location='/Payment'}}>Buy</Button>
                </Col>
              </Row>
            </text>
            </Card.Title>
            <Card.Text>
            <text style={{fontSize:"20px",color:"red"}}>{this.state.datacategory.name}</text>
            </Card.Text>
            </Card.Body>
            <Card.Footer>
            <Row>
              <Col>
                <text style={{textAlign:"left"}}>
                <b>Date & Time</b>
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
              </Col>
              <Col>
                <text style={{float:"right"}}>
                <b>Contact Person</b>
                <p>Is Bos</p>
                <p>{this.state.data.phone}</p>
                <p>{this.state.data.email}</p>
                </text>
              </Col>              
            </Row>
            </Card.Footer>
         </Card>
      </text>
    )
  }
}

export default Buy;