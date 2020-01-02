import React, { Component } from "react"
import { getArticle} from '../_actions/articleaction'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { BrowserRouter as Router } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class RecentArticle extends Component {
    // componentDidMount() {
    // this.props.getArticle()
    // }
    render() {
        const {data} = this.props.articles
        return(
    <container>
        {data.map((s,k)=> {
            return(
            <text>
                {s.articles.map((p,kk)=> {
                    return(
                        <text>
                            <Row>
                                <Col>
                                    <p>BASED ON YOUR READING HISTORY</p>
                                    <p style={{fontSize:"18px"}}><b><a href={'http://localhost:3000/articledetail?id='+(p.id)+'&cat='+(s.id)}>{p.title}</a></b></p>
                                    <p>
                                    {(p.content).substring(0,120)} . . .
                                    </p>
                                    <p>{s.createdAt} . 9 min read</p>
                                </Col>
                                <Col>
                                <img src={'http://localhost:8090/images/'+(p.image)} alt="art" width="159" height="178"></img>
                                </Col>
                            </Row>
                        </text>
                    )
                })}
            </text>
            )
        })}
    </container>
        )
    }
    }

    const mapstateToProps = state => {
        return{
            articles: state.articles
        }
    }

    function mapDispatchToProps(dispatch) {
        return {
            getArticle: bindActionCreators(getArticle, dispatch)
        }
    }

    export default connect(mapstateToProps, mapDispatchToProps)(RecentArticle);