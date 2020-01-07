import { getCatPage } from '../_actions/categoryaction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Card from 'react-bootstrap/Card'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'

const query = new URLSearchParams(window.location.search)
const id = query.get('id')
const jwt = require('jsonwebtoken')
const tokenraw = localStorage.getItem('token')


class Categorydetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacontent: [],
      user: [],
      favs: [],
      filter: '',
      Loading: false
    }
  }
  filterHandler = e =>{
    this.setState({filter: e.target.value})
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
      const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
     .then(res=>{
       this.setState({user: res.data})
     })
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/favourites/'+token.userId)
     .then(res=>{
       this.setState({favs: res.data.favourites})
     })
     }
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/categories/'+id)
    .then(res=>{
      this.setState({data: res.data, datacontent: res.data.events})
    })
    // this.props.getCatPage(id)
  }
  render(){
    // const {categorypg} = this.props.categorypg
    const userid = this.state.user.id
    const data = this.state.datacontent
    const datas = data.filter((data)=>{return data.startTime.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1})
    return(
      <text>
        <Header />
      <Container>
      <label style={{marginLeft:"-0.5%"}}>Filter By Date</label>
        <input type="date" onChange={this.filterHandler}
        style={{border:"none",borderBottom:"2px solid grey", width:"100%", background:"none"}}
         />
      <br></br>
      <br></br>
      <Row>
        <Col>
          <h3>{this.state.data.name}</h3>
        </Col>
      </Row>
      <br></br>
      <div className="album">
      <Row>{datas.map((s,k)=>{
            return(
              <Col sm={4} className="mb-4">
                <Card>
                <Button 
                variant="light"
                style={{position:"absolute",marginLeft:"75%",
                color:"red",marginTop:"2%",fontWeight:"bold",fontSize:"10px"}}>
                    Rp. {s.price}
                </Button>
                    <a href={'/eventdetail?id='+(s.id)}>    
                    <Card.Img variant="top" 
                    src={s.img} />
                    </a>
                    <Card.Body>
                    <button style={{float:"right", background:"none", border:"none"}}
                    onClick={()=>
                    (this.state.favs.find(e=>e['event_id'] === s.id)) ? 
                    axios.post('https://dumb-tick-express.herokuapp.com/api/v1/deletefav/', {
                        user_id: userid,
                        event_id: s.id
                    })
                     : axios.post('https://dumb-tick-express.herokuapp.com/api/v1/addfav',{
                        user_id: userid,
                        event_id: s.id
                        })
                        }>
                    {this.state.favs.find(e=>e['event_id'] === s.id) ? <i style={{fontSize:"20px",color:"red"}} class="fa fa-heart"></i> : <i style={{fontSize:"20px",color:"black"}} class="fa fa-heart"></i>}
                    </button>
                    <a href={'/eventdetail?id='+(s.id)}>
                    <Card.Title>{s.title.substring(0,30)}</Card.Title>
                    </a>
                    <Card.Text>
                    <h5>
                    <Moment format="DD MMM YYYY">
                    {s.startTime}
                    </Moment>
                    </h5>
                    </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                    <small className="text-muted">
                    {s.description.substring(0,150)} . . .    
                    </small>
                    </Card.Footer>
                </Card>
                </Col>
            )
        })}</Row>
        </div>
        <br></br>
      </Container>
      <Footer />
      </text>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//       getCatPage: bindActionCreators(getCatPage, dispatch)
//   }
// }

// const mapstateToProps = state => {
//   return{
//       categorypg: state.categorypg
//   }
// }

// export default connect(mapstateToProps, mapDispatchToProps)(Categorydetail);

export default Categorydetail;