import React, { Component } from 'react';
import Menu from './components/Menu.js'
import Login from './components/auth/Login.js'
import Signup from './components/auth/Signup.js'
import Admin from './components/auth/Admin.js'
import MainForum from './components/MainForum.js'
import UserPosts from './components/UserPosts.js'
import AlertMessage from './components/partials/AlertMessage.js'
import './styles/App.css';
import firebase from './firebase.js';

import { connect } from 'react-redux';
import { authUser, logoutUser, getUsers, deletePost, getPosts } from './actions';

class App extends Component {
  state = {
    active: 'login',
    isAdmin: false,
    alertVisible: false,
    alert: {
      type: '',
      message: '',
    }
  }
  handleNavigate = (event) => { // handle navigation and which component to show
    if (event === 'logout') { //handle logout
      var self = this;
      firebase.auth().signOut().then(function () {
        self.setState({ active: 'login' });
        self.props.logoutUser({
          user: { isAdmin: false }

        });
      }).catch(function (error) {
        var errorMessage = error.message;
        self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        setTimeout(() => {
          self.setState({ alertVisible: false });
        }, 5000);

      });
    }
    else this.setState({ active: event })

  }
  handleAuth = (userData) => { // handle currentuser in redux state 
    var self = this;
    firebase.database().ref("users/").orderByChild('uid').equalTo(userData.uid).on("child_added", function (snapshot) {
      self.props.authUser({
        user: snapshot.val(),
      });
      self.setState({ active: 'main' });
      if (snapshot.val().isAdmin === true) self.getUsers(); //if admin is user
    });

  }
  getUsers = () => { //get all users in db
    var self = this;
    firebase.database().ref('users').once('value').then(function (snapshot) {
      self.props.getUsers({
        users: snapshot.val(),
      });
    }).catch(function (error) {
      var errorMessage = error.message;
      self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
      setTimeout(() => {
        self.setState({ alertVisible: false });
      }, 5000);
    });

  }
  componentDidMount() { // listen to added and removed posts
    var fb = firebase.database().ref('posts');
    var self = this;

    fb.on("child_added", function (snapshot) {
      self.props.getPosts({
        post: snapshot.val(),
      });
    });


    fb.on("child_removed", function (snapshot) {
      self.props.deletePost({
        post: snapshot.val(),
      })
      self.setState({ alertVisible: true, alert: { type: 'success', message: 'Your post was deleted!' } })
      setTimeout(() => {
        self.setState({ alertVisible: false });
      }, 5000);
    });


  }

  handleAlertDismiss = () => { // alert on close 
    this.setState({ alertVisible: false });
  }

  render() {

    return (
      <div className="App">

        <Menu onHeaderClick={this.handleNavigate} value active={this.state.active} isAdmin={this.props.state.currUser.user.isAdmin} authenticated={this.props.state.authenticated}></Menu>

        {this.state.active === 'login' && this.props.state.authenticated === false &&
          <Login authenticated={this.handleAuth} />
        }
        {this.state.active === 'signup' && this.props.state.authenticated === false &&
          <Signup authenticated={this.handleAuth} />
        }

        {this.state.active === 'admin' && this.props.state.authenticated === true &&
          <Admin user={this.props.state.currUser.user} users={this.props.state.allUsers.users} />
        }
        {this.state.active === 'main' && this.props.state.authenticated === true &&
          <div>
            <MainForum newPosts={this.props.state.posts} user={this.props.state.currUser.user} />
          </div>
        }
        {this.state.active === 'userPosts' && this.props.state.authenticated === true &&
          <div>
            <UserPosts newPosts={this.props.state.posts} user={this.props.state.currUser.user} />
          </div>
        }
        {this.state.alertVisible &&
          <AlertMessage type={this.state.alert.type} onDismiss={this.handleAlertDismiss} alertMsg={this.state.alert.message} />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    authUser: auth => dispatch(authUser(auth)),
    logoutUser: auth => dispatch(logoutUser(auth)),
    getUsers: auth => dispatch(getUsers(auth)),
    deletePost: auth => dispatch(deletePost(auth)),
    getPosts: auth => dispatch(getPosts(auth)),
  }
}


function mapStateToProps(state) {
  return {
    state: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

