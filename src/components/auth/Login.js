import React from 'react'
import { Form } from 'react-bootstrap'
import Input from '../partials/Input.js'
import Btn from '../partials/Btn.js'
import firebase from '../../firebase.js';
var provider = new firebase.auth.GoogleAuthProvider();

class Login extends React.Component {

    state = {
        email: undefined,
        password: undefined,
    }

    login = (event) => {
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((res) => { // sign in with email and password
            this.authenticate(res);
        }).catch(function (error) {
            var errorMessage = error.message;
            this.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        });

    }
    loginWithGoogle = () => { //login with google/gmail
        var self = this;
        firebase.auth().signInWithPopup(provider).then(function (result) {
            var user = result.user;
            firebase.database().ref('users/').orderByChild('uid').equalTo(user.uid).once('value', function (snapshot) { // chack if user is already saved in db
                if (snapshot.val() === null) self.createUser(user);
                else self.authenticate(user);
            });
        }).catch(function (error) {
            var errorMessage = error.message;
            this.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        });
    }
    createUser = (user) => { //create new user object and send to db (if user is logging in with google)
        firebase.database().ref("users/").push({
            username: user.displayName,
            email: user.email,
            isAdmin: false,
            name: user.displayName,
            uid: user.uid,
        });
        this.authenticate(user);
    }
    authenticate = (user) => { //user is found in db, now we need to add user to state
        this.props.authenticated(user);
    }
    handleInput = (event) => { //save inpput to state
        this.setState({ [event.target.name]: event.target.value })
    }
    render() {
        return <div className="row">
            <div className="col-sm-12">
                <div className="card">

                    <div className="card-block">
                        <h3 className="card-title">Login</h3>
                        <Form >
                            <Input label="Email" name="email" onInput={this.handleInput} value={this.state.email} placeholder="Awesome name" type="text" required={true} />
                            <Input label="Password" name="password" onInput={this.handleInput} value={this.state.password} placeholder="******" type="password" required={true} />
                            <Btn onClick={this.login} type="submit" bsStyle="primary" size="large" name="Login" block={true} />
                        </Form>
                        <Btn onClick={this.loginWithGoogle} bsStyle="warning" size="large" name="Login with Google" block={true} />
                    </div>
                </div>
            </div>

        </div>


    }
}




export default Login;