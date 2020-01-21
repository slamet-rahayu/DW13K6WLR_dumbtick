import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';
import Content from '../components/Content'
import Upcoming from '../components/Upcoming'
import Category from '../components/Category'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { getEvents } from '../_actions/eventsaction'

class Home extends Component{
    constructor(props){
        super(props)
        this.state = {
            filter: ''
        }
    }
    componentDidMount(){
    this.props.getEvents()
    }
    formHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    render() {
    const {events} = this.props.events
    const {isLoading} = this.props.events
    if(isLoading){
        return(
            <Container>
                <Row style={{marginLeft:"45%",marginTop:"30%"}}>
                    <Col>
                    <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                    </Col>
                </Row>
            </Container>
        )
    }
return (
<text>
<Header />
<Container>
 <form>
    <input type="search"
    placeholder="Search Event"
    onChange={this.formHandler}
    style={{border:"none",borderBottom:"2px solid grey", width:"100%", borderRadius:"3px",height:"40px"}}
    name="filter"
    ></input>
 </form>
 <br></br>
<Row>
<Col><h2>Category</h2></Col>
</Row>
<br></br>
<Category />
<br></br>
<Row>
    <Col><h2>Today</h2></Col>
</Row>
<br></br>
<Content filter={this.state.filter} />
<br></br>
<Row>
    <Col><h2>Upcoming Event</h2></Col>
</Row>
<br></br>
<Upcoming filter={this.state.filter} />
</Container>
<br></br>
<Footer />
</text>

        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getEvents: bindActionCreators(getEvents, dispatch)
    }
}

const mapstateToProps = state => {
    return{
        events: state.events
    }
}

export default connect(mapstateToProps, mapDispatchToProps)(Home);

// export default Home;