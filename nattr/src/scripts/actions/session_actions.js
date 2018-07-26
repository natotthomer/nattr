import pick from 'lodash/pick'
import { browserHistory } from 'react-router'

import * as API from '../utils/api_session'
import {
  RECEIVE_CURRENT_USER, SIGN_OUT, UPDATE_CURRENT_USER,
  RECEIVE_CURRENT_USER_PROFILE
} from '../constants/session_constants'

const receiveCurrentUser = user => ({
  type: RECEIVE_CURRENT_USER,
  currentUser: user
})

const removeUser = () => ({
  type: SIGN_OUT
})

const receiveCurrentUserProfile = user => ({
  type: RECEIVE_CURRENT_USER_PROFILE,
  profile: user
})

export const signUp = data => dispatch => API.signUp(data)
  .then(user => dispatch(receiveCurrentUser(user)))
  .catch(error => console.log(error))

export const signIn = data => dispatch => API.signIn(data)
  .then(user => dispatch(receiveCurrentUser(user)))
  .catch(error => console.log(error))

export const signOut = () => dispatch => API.signOut()
  .catch(error => {
    browserHistory.push('/')
  })
  .then(user => dispatch(removeUser()))
  .then(() => {
    browserHistory.push('/')
  })

export const updateUserProfile = (id, data) => dispatch => API.editProfile(id, data)
  .then(user => {
    return dispatch(receiveCurrentUserProfile(user))
  })
  .catch(error => console.log(error))
