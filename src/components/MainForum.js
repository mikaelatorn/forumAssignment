
import React from 'react'
import Post from './partials/Post.js'
import WritePost from './partials/WritePost.js'




class MainForum extends React.Component {

    render() {
        const posts = [];
          if (this.props.newPosts) { // add all posts to page
            for (var post in this.props.newPosts) {
                posts.push(
                    <Post postId={post} post={this.props.newPosts[post]} user={this.props.user} key={post} > </Post>
                );
            }
            posts.reverse();
        }
        return <div className="row">
            <div className="col-sm-12">
                <WritePost user={this.props.user} />
                {posts}
            </div>
        </div>
    }
}



export default MainForum;

