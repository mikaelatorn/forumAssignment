
 
export function authUser(formData){
  return {
    type: "AUTH_FORM",
    payload : formData
  }
}

 
export function logoutUser(initialState){
  return {
    type: "LOGOUT",
    payload : initialState
  }
}

 
export function getUsers(users){
  return {
    type: "GET_USERS",
    payload : users
  }
}


 
export function deleteUser(user){
  return {
    type: "DELETE_USER",
    payload : user
  }
}


 
export function getPosts(post){
  return {
    type: "ADD_POST",
    payload : post
  }
}


export function addComment(commentInfo){
  return {
    type: "ADD_COMMENT",
    payload : commentInfo
  }
}

 
export function deletePost(post){
  return {
    type: "DELETE_POST",
    payload : post
  }
}


export function makeAdmin(user){
  return {
    type: "MAKE_ADMIN",
    payload : user
  }
}


