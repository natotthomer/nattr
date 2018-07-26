import * as API from '../utils/api_follow'
import { RECEIVE_FOLLOW, REMOVE_FOLLOW } from '../constants/follow_constants'

const receiveFollow = followedUser => ({
  type: RECEIVE_FOLLOW,
  followedUser
})

const removeFollow = response => ({
  type: REMOVE_FOLLOW,
  userId: response.user,
  unfollowed: response.unfollowed
})

export const createFollow = id => dispatch => API.create(id)
  .then(response => {
    return dispatch(receiveFollow(response.user_followed))
  })
  .catch(error => {
    console.log(error)
  })

export const destroyFollow = id => dispatch => API.destroy(id)
  .then(response => dispatch(removeFollow(response)))
  .catch(error => {
    console.log(error)
  })
