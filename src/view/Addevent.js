import React, { Component } from 'react';
import { Navbar, Nav, Button, Form, FormControl} from 'react-bootstrap';
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
const jwt = require('jsonwebtoken')

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const tokenraw = localStorage.getItem('token')

class Profile extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      user: [],
      title: '',
      category: '',
      startTime: '',
      endTime: '',
      price: '',
      description: '',
      address: '',
      urlMaps: '',
      phone: '',
      email: '',
      img: '',
      Loading: false
    }
    this.formHandler = this.formHandler.bind(this)
    this.formSubmit = this.formSubmit.bind(this)
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
      axios.get('http://localhost:5000/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     }
    axios.get('http://localhost:5000/api/v1/categories/')
    .then(res=>{
      this.setState({data: res.data})
    })
  }
  formHandler(e){
    this.setState({[e.target.name]: e.target.value})
  }
  formSubmit(e){
    axios.post('http://localhost:5000/api/v1/storeevent', {
      title: this.state.title,
      category_id: this.state.category,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      price: this.state.price,
      description: this.state.description,
      address: this.state.address,
      urlMaps: this.state.urlMaps,
      phone: this.state.phone,
      email: this.state.email,
      img: this.state.img,
      createdBy: this.state.user.id
    })
  }
  render(){
    console.log('user',this.state.user.id)
    return(
        <text>
        <Header />
      <Container>
      <br></br>
      <Row>
          <Col>
          <h3>Add Event</h3>
          </Col>
      </Row>
      <br></br>
        <form onSubmit={this.formSubmit}>
            <input type="text"
             placeholder="title event"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="title"
             onChange={this.formHandler}
             value={this.state.title}
            ></input>
            <br></br><br></br>
            <select style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}} name="category" onChange={this.formHandler}>
                <option>Category</option>
                {this.state.data.map(s=>{
                  return(
                  <option value={s.id}>{s.name}</option>
                  )
                })}
            </select>
            <input type="datetime-local"
             placeholder="Start Time"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="startTime"
             onChange={this.formHandler}
             value={this.state.startTime}
            ></input>
            <input type="datetime-local"
             placeholder="End Time"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="endTime"
             onChange={this.formHandler}
             value={this.state.endTime}
            ></input>
            <input type="text"
             placeholder="Price"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="price"
             onChange={this.formHandler}
             value={this.state.price}
            ></input>
            <br></br>
            <input type="text"
             placeholder="description"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="description"
             onChange={this.formHandler}
             value={this.state.description}
            ></input>
            <br></br>
            <input type="text"
             placeholder="address"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="address"
             onChange={this.formHandler}
             value={this.state.address}
            ></input>
            <br></br>
            <input type="text"
             placeholder="URL Map"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="urlMaps"
             onChange={this.formHandler}
             value={this.state.urlMaps}
            ></input>
            <br></br>
            <input type="number"
             placeholder="Phone"
             limit="13"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="phone"
             onChange={this.formHandler}
             value={this.state.phone}
            ></input><input type="email"
            placeholder="E-mail EO"
            style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
            name="email"
            onChange={this.formHandler}
            value={this.state.email}
           ></input>
            <br></br>
            <input type="text"
             placeholder="url Image"
             style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
             name="img"
             onChange={this.formHandler}
             value={this.state.img}
            ></input>
            <br></br><br></br>
            <Button variant="success" type="submit" block>Publish</Button>
        </form>
            <br></br><br></br>
      <br></br>
      </Container>
      <Footer />
      </text>
    )
  }
}

export default Profile;