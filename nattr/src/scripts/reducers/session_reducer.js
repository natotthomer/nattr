import merge from 'lodash/merge'
import concat from 'lodash/concat'

import {
  RECEIVE_CURRENT_USER, SIGN_OUT, RECEIVE_CURRENT_USER_PROFILE
} from '../constants/session_constants'
import {
  RECEIVE_FOLLOW, REMOVE_FOLLOW
} from '../constants/follow_constants'

const _nullSession = {
  currentUser: null,
  errors: []
}

const SessionReducer = (state = _nullSession, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const currentUser = action.currentUser
      return Object.assign({}, _nullSession, {currentUser})
    }
    case RECEIVE_FOLLOW: {
      const currentUser = state.currentUser
      currentUser.following.push(action.followedUser.id)
      return merge({}, state, {currentUser})
    }
    case REMOVE_FOLLOW: {
      const currentUser = state.currentUser
      let followingIdx
      currentUser.following.forEach((el, idx) => {
        if (el === action.unfollowed) {
          followingIdx = idx
        }
      })
      if (followingIdx >= 0) {
        currentUser.following.splice(followingIdx, 1)
      }
      return merge({}, state, {currentUser})
    }
    case RECEIVE_CURRENT_USER_PROFILE: {
      const currentUser = Object.assign({}, state.currentUser, { profile: action.profile })
      return Object.assign({}, state, {currentUser})
    }
    case SIGN_OUT:
      return _nullSession
    default:
      return state
  }
}

export default SessionReducer
