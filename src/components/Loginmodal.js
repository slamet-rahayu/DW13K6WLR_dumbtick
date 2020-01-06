import React, {Component} from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import '../App.css';
import '../App';
import axios from 'axios'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>hello</h4>
        </Modal.Title>
      </Modal.Header> */}
      <Modal.Body>
      <a href="" onClick={props.onHide} style={{marginLeft:"94%",marginTop:"-15px",position:"absolute",fontSize:"25px",color:"black"}}>&times;</a>
          <div className="loginbox">
        {/* <Modal.Title id="contained-modal-title-vcenter">
          <h4>hello</h4>
        </Modal.Title> */}
        <h3 align="center"><b>Sign in with Email</b></h3>
        
        <p style={{fontSize:"15px",color:"grey",textAlign:"center"}}>Enter the email address associated with your account,<br></br> and we’ll send a magic link to your inbox.
        </p><br></br><br></br>
        <center>
            <Form />
        </center>
        </div>
      </Modal.Body>
      {/* <Modal.Footer closeButton>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer> */}
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <text>
      <Button variant="danger" onClick={() => setModalShow(true)}>
        Buy
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </text>
  );
}

class Form extends Component {
  userData;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoggedIn: false
    }
    this.formHandler = this.formHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  formHandler(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  submitHandler(e){
    
    axios.post('http://localhost:5000/api/v1/login', {
      email: this.state.email,
      password: this.state.password
    }).then(res=> {
      const firstname = res.data.user.firstname
      const lastname = res.data.user.lastname
      const username = res.data.user.username
      const email = res.data.user.email
      const id = res.data.user.id
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify({
        id,
        firstname,
        lastname,
        username,
        email
      }))
      console.log(res.data.user)
    })
    .catch(error=>{
      console.log(error)
    })
  }
render () {
  return (
    <div>
      <form onSubmit={this.submitHandler}>
            <label>Your email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
            <input type="email"
            name="email"
             placeholder="&#128712;"
              style={{border:"none",borderBottom:"1px solid grey"}} 
            value={this.state.email}
             onChange={this.formHandler}></input><br></br><br></br>
            <label>Your password</label>
            <input type="password"
            name="password"
             placeholder="&#128712;"
              style={{border:"none",borderBottom:"1px solid grey"}}
            value={this.state.password}
             onChange={this.formHandler}></input><br></br><br></br><br></br>
            <button className="btn btn-dark">Continue</button><br></br><br></br><br></br>
      </form>
    </div>
  )
}

}


export default App;