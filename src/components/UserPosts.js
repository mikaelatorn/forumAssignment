import React from 'react'
import Post from './partials/Post.js'
class UserPosts extends React.Component {
    render() {
        const posts = [];
          if (this.props.newPosts) {
            for (var post in this.props.newPosts) {
                if (this.props.newPosts[post].uid !== this.props.user.uid) continue; // only add posts with the user id
                posts.push(
                    <Post postId={post} post={this.props.newPosts[post]} user={this.props.user} key={post} > </Post>
                );
            }
            posts.reverse();
        }
        return <div className="row">
            <div className="col-sm-12">
                {posts}
            </div>
        </div>
    }
}


export default UserPosts;