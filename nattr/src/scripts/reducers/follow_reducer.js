import merge from 'lodash/merge'
import cloneDeep from 'lodash/cloneDeep'

import {
  RECEIVE_FOLLOW, REMOVE_FOLLOW
} from '../constants/follow_constants'
import { RECEIVE_CURRENT_USER, SIGN_OUT } from '../constants/session_constants'

const _nullFollow = {
  following: [],
  followers: []
}

const FollowReducer = (state = _nullFollow, action) => {
  switch (action.type) {
    case RECEIVE_CURRENT_USER: {
      const { following, followers } = action.following
      return merge({}, {following}, {followers})
    }
    case RECEIVE_FOLLOW: {
      const follows = cloneDeep(state)
      const targetIdIdx = follows.following.findIndex(el => el === action.followedUser.id)
      if (targetIdIdx === -1) {
        follows.following.push(action.followedUser.id)
      }
      return follows
    }
    case REMOVE_FOLLOW: {
      const follows = cloneDeep(state)
      const targetIdIdx = follows.following.findIndex(el => el === action.followedUser)
      follows.following.splice(targetIdIdx, 1)
      return follows
    }
    case SIGN_OUT: {
      return _nullFollow
    }
    default: {
      return state
    }
  }
}

export default FollowReducer
