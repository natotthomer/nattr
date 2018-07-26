import * as API from '../utils/api_post'
import {
  RECEIVE_POST, RECEIVE_USER_POSTS
} from '../constants/post_constants'

const receiveUserPost = post => ({
  type: RECEIVE_POST,
  post
})

const receiveUserPosts = posts => ({
  type: RECEIVE_USER_POSTS,
  posts
})

export const createPost = data => dispatch => API.create(data)
  .then(response => dispatch(receiveUserPost(response)))
  .catch(error => console.log(error))

export const readUserPosts = userId => dispatch => API.readUserPosts(userId)
  .then(response => dispatch(receiveUserPosts(response.posts)))
  .catch(error => console.log(error))
