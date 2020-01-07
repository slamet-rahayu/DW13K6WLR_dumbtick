import { getUser } from '../_actions/useraction'
import { getEvents } from '../_actions/eventsaction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import React, { Component } from 'react';
import { Button} from 'react-bootstrap';
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
            user: [],
            favs: [],
            color: '',
            isFav: false,
            Loading: false
        }
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
    axios.get('https://dumb-tick-express.herokuapp.com/api/v1/events')
    .then(res=>{
        this.setState({data: res.data})
    })
    }
    render(){
        // const {user} = this.props.user
        // const {events} = this.props.events
        const event = this.state.data
        const upcoming = event.filter(event=>{
        const date = new Date(event.startTime)
        const tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        return(date.toISOString().substring(0,10) == tomorrow.toISOString().substring(0,10))
        })
        const datas = event.filter((data)=>{return data.title.toLowerCase().indexOf(this.props.filter.toLowerCase()) !== -1})
        const userid = this.state.user.id
        return(
        <text>
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
                      axios.post('https://dumb-tick-express.herokuapp.com/api/v1/deletefav',{
                        user_id: userid,
                        event_id: s.id
                        })
                     : axios.post('https://dumb-tick-express.herokuapp.com/api/v1/addfav',{
                        user_id: userid,
                        event_id: s.id
                        })}>
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
                    {s.description.substring(0,200)} . . .    
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

// function mapDispatchToProps(dispatch) {
//     return {
//         getUser: bindActionCreators(getUser, dispatch),
//         getEvents: bindActionCreators(getEvents, dispatch)
//     }
// }

// const mapstateToProps = state => {
//     return{
//         user: state.user,
//         events: state.events
//     }
// }

// export default connect(mapstateToProps, mapDispatchToProps)(Content);

export default Content
