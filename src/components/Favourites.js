import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card'
import axios from 'axios';
import '../App.css';
import Moment from 'react-moment'

const jwt = require('jsonwebtoken')
const tokenraw = localStorage.getItem('token')

class Content extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            Loading: false
        }
        // this.formHandler = this.formHandler.bind(this)
        this.submitHandler = this.submitHandler.bind(this)
    }
    submitHandler(e){
        axios.post('')
    }
    componentDidMount() {
    if (localStorage.getItem('token') !== null) {
     const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('http://localhost:5000/api/v1/favourites/'+token.userId)
    .then(res=>{
      this.setState({data: res.data.favourites})
    })
    }
    }
    render(){
        console.log('fav', this.state.data)
        return(
        <text>
        <div className="album">
        <Row>{this.state.data.map((s,k)=>{
            return(
                <Col sm={4} className="mb-4">
                <Card>
                    <Button 
                    variant="light"
                    style={{position:"absolute",marginLeft:"75%",
                    color:"red",marginTop:"2%",fontWeight:"bold",fontSize:"10px"}}>
                    {s.event.price}
                    </Button>
                    <a href={'/eventdetail?id='+(s.event.id)}>    
                    <Card.Img variant="top" 
                    src={s.event.img} />
                    </a>
                    <Card.Body>
                    <button style={{float:"right", background:"none", border:"none"}}>
                    <i style={{fontSize:"20px"}} class="fa fa-heart"></i>
                    </button>
                    <a href={'/eventdetail?id='+(s.event.id)}>
                    <Card.Title>{s.event.title.substring(0,30)}</Card.Title>
                    </a>
                    <Card.Text>
                    <h5>
                    <Moment format="DD MMM YYYY">
                    {s.event.startTime}
                    </Moment>
                    </h5>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">
                    {s.event.description.substring(0,200)} . . .    
                    </small>
                    </Card.Footer>
                </Card>
                </Col>
            )
        })}</Row>
        </div>
        </text>)
    }
}

export default Content;