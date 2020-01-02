import React, { Component } from 'react';
import { Navbar, Nav, Button} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Content from '../components/Content'
import axios from 'axios'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Moment from 'react-moment'
import { now } from 'moment';

const query = new URLSearchParams(window.location.search)
const id = query.get('id')


class Categorydetail extends Component{
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      datacontent: [],
      filter: '',
      Loading: false
    }
  }
  filterHandler = e =>{
    this.setState({filter: e.target.value})
  }
  componentDidMount() {
    axios.get('http://localhost:5000/api/v1/categories/'+id)
    .then(res=>{
      this.setState({data: res.data, datacontent: res.data.events})
    })
  }
  render(){
    const data = this.state.datacontent
    const datas = data.filter((data)=>{return data.startTime.toLowerCase().indexOf(this.state.filter.toLowerCase()) !== -1})
      console.log(datas)
    return(
      <text>
        <Header />
      <Container>
        <input type="date" onChange={this.filterHandler} />
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
                <Button variant="light"
                    style={{position:"absolute",marginLeft:"75%",
                    color:"red",marginTop:"2%",fontWeight:"bold",fontSize:"10px"}}
                    >Rp. {s.price}</Button>
                    <Card.Img variant="top" 
                    src={s.img} />
                    <a href={'/eventdetail?id='+(s.id)}>
                    <Card.Body>
                    <Card.Title>{s.title}</Card.Title>
                    <Card.Text>
                    <Moment format="DD MMM YYYY">
                    {s.startTime}
                    </Moment>
                    </Card.Text>
                    </Card.Body>
                    </a>
                    <Card.Footer>
                    <a href="!#">
                    <small className="text-muted"><i class="fa fa-heart"></i> Add favourite</small>
                    </a>
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

export default Categorydetail;