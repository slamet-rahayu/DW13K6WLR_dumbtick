import { getCategory } from '../_actions/categoryaction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import React, { Component } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import '../App.css';

class Category extends Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            Loading: false
        }
    }
    componentDidMount() {
        axios.get('http://localhost:5000/api/v1/categories')
        .then(res=>{
            this.setState({data: res.data})
            console.log(res)
        })
        // this.props.getCategory()
    }
    render(){
        // const {category} = this.props.category
        return(
            <center>
                <Row>
                {this.state.data.map((s,k)=> {
                    return(
                    <Col>
                    <a className="categorylink" href={'/Categorypage?id='+(s.id)}>
                    <img className="categoryimg" style={{borderRadius:"5px"}} width="250" height="80" alt="category" src={'http://localhost:5000/images/'+(s.name)+'.jpg'} />
                    <h3 style={{position:"absolute",marginTop:"-28%",marginLeft:"5%",color:"white"}}>{s.name}</h3></a>
                    </Col>
                    )
                })}
                </Row>
            </center>
        )
    }
}

// function mapDispatchToProps(dispatch) {
//     return {
//         getCategory: bindActionCreators(getCategory, dispatch)
//     }
// }

// const mapstateToProps = state => {
//     return{
//         category: state.category
//     }
// }

// export default connect(mapstateToProps, mapDispatchToProps)(Category);

export default Category;