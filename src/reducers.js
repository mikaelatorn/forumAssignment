const initialState = {
    currUser: {
        user: {
            isAdmin: false,
        }
    },
    authenticated: false,
    allUsers: undefined,
    posts: undefined,
}


export default function auth(state = initialState, action) {
    switch (action.type) {
        case "AUTH_FORM":
            return { ...state, currUser: action.payload, authenticated: true }; //add current user object  to state
        case "LOGOUT":
            return { ...state, currUser: action.payload, authenticated: false }; // remmove current user from state (set back to initial user state)
        case "ADD_POST": // add posts, also init to add all posts
            var id = action.payload.post.id;
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [id]: action.payload.post
                }
            };
        case "ADD_COMMENT": // find correct post in state and add comment
            var post = '';
            for (var i in state.posts) {
                if (state.posts[i].id === action.payload.commentInfo.postId) {
                    post = i;
                }
            }
            var key = action.payload.commentInfo.comment.id;
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [post]: {
                        ...state.posts[post],
                        comments: {
                            ...state.posts[post].comments,
                            [key]: action.payload.commentInfo.comment
                        }
                    }
                }
            }
        case "GET_USERS": //add all users to state
            return { ...state, allUsers: action.payload }
        case "DELETE_POST": //find post by id and add all other posts to an object and update the state with new object
            var newPosts = {};
            for (var i in state.posts) {
                if (state.posts[i].id === action.payload.post.id) {
                    continue;
                } else {
                    newPosts[i] = state.posts[i];
                }
            }
            return {
                ...state,
                posts: newPosts
            }
        case "MAKE_ADMIN": //find correct user and change admin flag to true
            var user = '';
            for (var i in state.allUsers.users) {
                if (state.allUsers.users[i].uid === action.payload.admin.uid) {
                    user = [i];
                }
            }
            return {
                ...state,
                allUsers: {
                    ...state.allUsers,
                    users: {
                        ...state.allUsers.users,
                        [user]: {
                            ...state.allUsers.users[user],
                            isAdmin: true
                        }
                    }
                }
            }
        case "DELETE_USER": //find user by id and add all other users to an object and update the state with new object
            var newUsers = {};
            for (var i in state.allUsers.users) {
                if (state.allUsers.users[i].uid === action.payload.user.uid) {
                    continue;
                } else {
                    newUsers[i] = state.allUsers.users[i];
                }
            }
            return {
                ...state,
                allUsers: {
                    ...state.allUsers,
                    users: newUsers
                }
            }
        default:
            return state;
    }
}

