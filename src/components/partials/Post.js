import React from 'react'
import { Media, Glyphicon } from 'react-bootstrap'
import Input from './Input.js'
import Btn from './Btn.js'
import AlertMessage from './AlertMessage.js'
import Comment from './Comment.js'
import firebase from '../../firebase.js';
import { connect } from 'react-redux';
import { addComment } from '../../actions';


class Post extends React.Component {
  state = {
    comment: undefined,

    alert: {
      type: '',
      message: '',
    }
  }
  postComment = () => {
    var key = firebase.database().ref().push().key; //generate unique key

    var newComment = {
      id: key,
      comment: this.state.comment,
      author: this.props.user.username,
      uid: this.props.user.uid,
    }

    var self = this;

    var rightPost = firebase.database().ref("posts/").orderByChild('id').equalTo(self.props.post.id); //find right post to add comment to

    rightPost.on("child_added", function (snapshot) { //push new comment
      snapshot.ref.child('comments').push(newComment).then(function (res) {
        self.props.addComment({
          commentInfo: { postId: self.props.post.id, comment: newComment },
        });
        self.setState({ comment: '', alertVisible: true, alert: { type: 'success', message: 'Your comment was posted!' } })
        setTimeout(() => {
          self.setState({ alertVisible: false });
        }, 5000);
      }).catch(function (error) {
        var errorMessage = error.message;
        self.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        setTimeout(() => {
          self.setState({ alertVisible: false });
        }, 5000);
      });

    });

  }
  deletePost = (event) => { // find post in db and remove
    var rightPost = firebase.database().ref("posts/").orderByChild('id').equalTo(this.props.post.id); 
    rightPost.on("child_added", function (snapshot) {
      snapshot.ref.remove().catch(function (error) {
        var errorMessage = error.message;
        this.setState({ alertVisible: true, alert: { type: 'danger', message: errorMessage } })
        setTimeout(() => {
          this.setState({ alertVisible: false });
        }, 5000);
      });

    });

  }
  handleInput = (event) => { // handle comment field input
    this.setState({ [event.target.name]: event.target.value })
  }

  handleAlertDismiss = () => { // dismiss alert on close
    this.setState({ alertVisible: false });
  }
  render() {
    const comments = [];
    if (this.props.post.comments) { // add comments to post
      for (var comment in this.props.post.comments) {
        comments.push(
          <Comment key={comment} comment={this.props.post.comments[comment]}></Comment>);
      }
    }
    return <div className="row">
      {this.state.alertVisible &&
        <AlertMessage type={this.state.alert.type} onDismiss={this.handleAlertDismiss} alertMsg={this.state.alert.message} />
      }
      <div className="col-sm-8">
        <div className="card post">
          <div className="card-block">
            <Media>
              {this.props.user.uid === this.props.post.uid && !this.props.user.isAdmin &&
                <Btn onClick={this.deletePost} size="xsmall" name="Delete Post" bsStyle="link"><Glyphicon glyph="remove" /></Btn>
              }
              {this.props.user.uid === this.props.post.uid && this.props.user.isAdmin &&
                <Btn onClick={this.deletePost} size="xsmall" name="Delete Post" bsStyle="link"><Glyphicon glyph="remove" /></Btn>
              }
              {/*<Media.Left>
                <img width={64} height={64} src={image} alt="Profile" />
              </Media.Left>*/}
              <Media.Body>
                <Media.Heading>{this.props.post.title}</Media.Heading>
                <p>{this.props.post.text}</p>
                <p>Author: {this.props.post.author}</p>
              </Media.Body>
              {comments}

              <div>
                <Input name="comment" onInput={this.handleInput} value={this.state.comment} label="Write comment" placeholder="Remember to be nice.." inputType="textarea" type="text" />
                <div className="btn-container">
                  <Btn onClick={this.postComment} bsStyle="primary" size="small" name="Send" />
                </div>

              </div>


            </Media>
          </div>
        </div>
      </div>
    </div>

  }
}



function mapDispatchToProps(dispatch) {
  return {
    addComment: auth => dispatch(addComment(auth)),

  }
}


function mapStateToProps(state) {
  return {
    comments: state
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);


// export default Post;