import React from 'react'
import { Well, Form } from 'react-bootstrap'
import Input from './Input.js'
import Btn from './Btn.js'
import AlertMessage from './AlertMessage.js'
import firebase from '../../firebase.js';

class WritePost extends React.Component {

  state = {
    title: undefined,
    text: undefined,
    alertVisible: false,
    alert: {
      type: '',
      message: '',
    }
  }


  submitPost = (event) => {
    event.preventDefault();

    var key = firebase.database().ref().push().key; //generate unique key (id)

    var newPost = {
      id: key,
      title: this.state.title,
      text: this.state.text,
      author: this.props.user.username,
      uid: this.props.user.uid,
    };
 

    var self = this;
    firebase.database().ref('posts/').push(newPost).then(function (res) { // push new post to db
      self.setState({ alertVisible: true, alert: { type: 'success', message: 'Your post was created!' } })
      self.setState({ title: '', text: '' });
      setTimeout(() => {
        self.setState({ alertVisible: false });
      }, 5000);
    }).catch(function (error) {
       var errorMessage = error.message;
      self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
      setTimeout(() => {
        self.setState({ alertVisible: false });
      }, 5000);
    })


  }
  handleInput = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  handleAlertDismiss = () => {
    this.setState({ alertVisible: false });
  }

  render() {
    return <Well>
      <div className="col-sm-12">
        <Form className="write-post">
          <Input placeholder="Awesome title" label="Post title" type="text" onInput={this.handleInput} value={this.state.title} name="title" required={true} />
          <Input placeholder="Write your post here" inputType="textarea" onInput={this.handleInput} value={this.state.text} name="text" required={true} />
          <div className="btn-container">
            <Btn bsStyle="primary" size="large" name="Post" onClick={this.submitPost} />
          </div>
        </Form>
      </div>
      {this.state.alertVisible &&
        <AlertMessage type={this.state.alert.type} onDismiss={this.handleAlertDismiss} alertMsg={this.state.alert.message} />
      }
    </Well>


  }
}




export default WritePost;