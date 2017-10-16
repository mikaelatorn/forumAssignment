import React from 'react'
import { Form } from 'react-bootstrap'
import Input from '../partials/Input.js'
import Btn from '../partials/Btn.js'
import AlertMessage from '../partials/AlertMessage.js'
import firebase from '../../firebase.js';

class Signup extends React.Component {
  state = {
    alertVisible: false,
    alert: {
      type: '',
      message: '',
    },
    username: undefined,
    email: undefined,
    password: undefined,
    passwordConfirm: undefined,
  }
  signup = (event) => { // signup user if passwords match 
    event.preventDefault();
    
    if (this.state.password !== this.state.passwordConfirm) {
      this.setState({ alertVisible: true, alert: { type: 'warning', message: 'Passwords dont match!' } })
      setTimeout(() => {
        this.setState({ alertVisible: false });
      }, 5000);
      return;
    }
    var self = this;
    firebase.auth().createUserWithEmailAndPassword(self.state.email, self.state.password).then((res) => {
      self.authenticate(res);
    }).catch(function (error) {
      var errorMessage = error.message;
      self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } }) // if email is taken this will show (and other errors as well)
      setTimeout(() => {
        self.setState({ alertVisible: false });
      }, 5000);
    });
  }
  authenticate = (user) => { //create new user object and add to db
    firebase.database().ref("users/").push({
      username: this.state.username,
      email: this.state.email,
      isAdmin: false,
      name: user.displayName,
      uid: user.uid,
    });
    this.props.authenticated(user);
  }
  handleInput = (event) => { 
    this.setState({ [event.target.name]: event.target.value })
  }
  handleAlertDismiss = () => {
    this.setState({ alertVisible: false });
  }
  render() {
    return <div className="row">
      {this.state.alertVisible &&
        <AlertMessage type={this.state.alert.type} onDismiss={this.handleAlertDismiss} alertMsg={this.state.alert.message} />
      }
      <div className="col-sm-12">
        <div className="card">
          <div className="card-block">
            <h3 className="card-title">Signup</h3>
            <Form>
              <Input label="Username" onInput={this.handleInput} value={this.state.username} name="username" placeholder="Awesome name" type="text" required={true} />
              <Input label="Email" onInput={this.handleInput} value={this.state.email} placeholder="example@email.com" name="email" type="email" required={true} />
              <Input label="Password" onInput={this.handleInput} value={this.state.password} placeholder="******" type="password" name="password" required={true} />
              <Input label="Repeat Password" onInput={this.handleInput} value={this.state.passwordConfirm} placeholder="******" type="password" name="passwordConfirm" required={true} />
              <Btn onClick={this.signup} type="submit" bsStyle="primary" size="large" name="Signup" block={true} />
            </Form>

          </div>
        </div>
      </div>

    </div>



  }
}




export default Signup;