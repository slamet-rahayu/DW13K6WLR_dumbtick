import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../App.css';


function Footer () {
return (
<text>
<div className="footer-bottom">
<div className="footer-content-bottom">
    <Row>
        <Col>
        <p style={{fontSize:"21.6px",fontWeight:"bold"}}><i class="fa fa-ticket"></i> Dumb-Tick</p>
        <p>Dumb-Tick is a web based platform that provides tickets for various event around sports, music, science, and programming</p>
        </Col>
        <Col>
        <center>
        <p style={{fontSize:"21.6px",fontWeight:"bold"}}>Links</p>
        <p>About Us</p>
        </center>
        </Col>
        <Col>
        <text style={{float:"right"}}>
        <p style={{fontSize:"21.6px",fontWeight:"bold"}}>Have a Question?</p>
        <p>Dumb Tick</p>
        <p>Email: support@dumbtick.com</p>
        </text>
        </Col>
    </Row>
<hr color="white"></hr>
<br></br>
<div style={{width:"100%"}}>
<p style={{fontSize:"13px",textAlign:"center"}}>Copyright &copy; 2019</p>
</div>
</div>
</div>
</text>

);
}

export default Footer;