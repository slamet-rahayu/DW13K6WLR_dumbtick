import { getUser } from '../_actions/useraction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Navbar, Nav} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Register from '../App';
import Login from '../view/Login';
import Profile from '../view/Popover'

class Auth extends Component {
    componentDidMount(){
        this.props.getUser()
    }
    render() {
        const {user} = this.props.user
        if (localStorage.getItem('token') !== null) {
            return(
                <div>
                <Navbar bg="danger" expand="sm" style={{boxShadow:"grey 0px 2px 5px"}}>
                <Navbar.Brand href="/" style={{fontWeight:"bold",fontSize:"30px",color:"white"}}><i class="fa fa-ticket"></i> Dumb Tick</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    <Profile />
                  </Navbar.Collapse>
                </Navbar>
                <br></br>
                </div> 
            )
        }
        return(
                <div>
                <Navbar bg="danger" expand="sm">
                <Navbar.Brand href="/" style={{fontWeight:"bold",fontSize:"30px",color:"white"}}><i class="fa fa-ticket"></i> Dumb Tick</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    </Nav>
                    {/* <h4 style={{marginTop:"5px",marginRight:"20px"}}><i class="fa fa-search"></i></h4>
                    <h4 style={{marginTop:"5px",marginRight:"20px"}}><i class="fa fa-bell"></i></h4> */}
                    <div></div><Register />&nbsp;&nbsp;<Login />&nbsp;
                    &nbsp;&nbsp;&nbsp;
                </Navbar.Collapse>
                </Navbar>
                <br></br>
                </div>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getUser: bindActionCreators(getUser, dispatch)
    }
}

const mapstateToProps = state => {
    return{
        user: state.user
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Auth);