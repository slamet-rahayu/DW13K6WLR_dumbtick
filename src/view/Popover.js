import { getUser } from '../_actions/useraction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import React, { Component } from 'react';
import { Overlay, ButtonToolbar, Popover} from 'react-bootstrap';
import axios from 'axios'

const jwt = require('jsonwebtoken')
const tokenraw = localStorage.getItem('token')

function Example() {
    const [show, setShow] = React.useState(false);
    const [target, setTarget] = React.useState(null);
    const ref = React.useRef(null);
  
    const handleClick = event => {
      setShow(!show);
      setTarget(event.target);
    };
  
    return (
      <ButtonToolbar ref={ref}>
        <button 
        onClick={handleClick}
        style={{borderRadius:"100%",width:"40px",height:"40px",border:"none",background:"green",color:"white"}}><b><Avatar /></b></button>
  
        <Overlay
          show={show}
          target={target}
          placement="bottom"
          container={ref.current}
          containerPadding={-1}
        >
          <Popover id="popover">
              <Popover.Title>
              <Profiletitle />
              </Popover.Title>
          <Popover.Content>
                <Content />
              <p><Logout /></p>
          </Popover.Content>
          </Popover>
        </Overlay>
      </ButtonToolbar>
    );
  }

  class Logout extends Component {
    constructor(props) {
      super(props)
      this.state = {
        data: []
      }
      this.logoutTrigger = this.logoutTrigger.bind(this)
    }
    logoutTrigger(e) {
      localStorage.clear()
      window.location = '/'
    }
    render(){
      return(
        <text>
          <button onClick={this.logoutTrigger}
          style={{background:"none",border:"none"}}>Logout</button>
        </text>
      )
    }
  }
  
  class Profiletitle extends Component {
    constructor(props){
      super(props)
      this.state = {
        user: [],
      }
    }
    componentDidMount() {
      if (localStorage.getItem('token') !== null) {
       const token = jwt.verify(tokenraw, 'pssst!')
       axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
      .then(res=>{
        this.setState({user: res.data})
        console.log(res)
      })
      }
    }
    render() {
      return(
        <text><p><a href="/profile" >{(this.state.user.firstname)+' '+(this.state.user.lastname)}</a></p></text>
      )
    }
  }

  class Avatar extends Component {
    constructor(props){
      super(props)
      this.state = {
        user: '',
      }
    }
    componentDidMount() {
      if (localStorage.getItem('token') !== null) {
       const token = jwt.verify(tokenraw, 'pssst!')
       axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
      .then(res=>{
        this.setState({user: res.data.firstname})
        console.log(res)
      })
      }
    }
    render() {
      return(
        <text>{this.state.user.substring(0,1)}</text>
      )
    }
  }

class Content extends Component {
  constructor(props){
    super(props)
    this.state = {
      user: [],
    }
  }
  componentDidMount() {
    if (localStorage.getItem('token') !== null) {
     const token = jwt.verify(tokenraw, 'pssst!')
     axios.get('https://dumb-tick-express.herokuapp.com/api/v1/user/'+token.userId)
    .then(res=>{
      this.setState({user: res.data})
    })
    }
  }
  render(){
    return(
      <text>
        <p><a href={'/Myticket/'+(this.state.user.id)}>My Ticket</a></p>
        <p><a href={'/Paymentlist/'}>Payment</a></p>
        <p><a href="/Addevent">Add Event</a></p>
      </text>
    )
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//       getUser: bindActionCreators(getUser, dispatch)
//   }
// }

// const mapstateToProps = state => {
//   return{
//       user: state.user
//   }
// }

// export default connect(mapstateToProps, mapDispatchToProps)(Example);

export default Example;