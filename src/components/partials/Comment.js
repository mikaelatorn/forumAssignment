import React from 'react'
import { Media } from 'react-bootstrap'

class Post extends React.Component {
  render() {
    return <div className="row">
      <div className="col-sm-12">
        <div className="card comment">
          <div className="card-block">
            <Media>
              <Media.Body>
                <p>{this.props.comment.comment}</p>
                <p>Author: {this.props.comment.author}</p>
              </Media.Body>
            </Media>
          </div>
        </div>
      </div>

    </div>

  }
}




export default Post;