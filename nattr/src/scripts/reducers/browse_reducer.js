import merge from 'lodash/merge'
import concat from 'lodash/concat'
import uniqBy from 'lodash/uniqBy'

import {
  RECEIVE_CURRENT_USER_PROFILE
} from '../constants/session_constants'
import {
  RECEIVE_USER, RECEIVE_MAIN_FEED
} from '../constants/browse_constants'
import {
  RECEIVE_FOLLOW, REMOVE_FOLLOW
} from '../constants/follow_constants'
import {
  RECEIVE_POST, RECEIVE_USER_POSTS
} from '../constants/post_constants'

const _nullBrowse = {
  users: {
    current: {
      profile: {}
    }
  },
  feed: []
}

const BrowseReducer = (state = _nullBrowse, action) => {
  switch (action.type) {
    case RECEIVE_USER: {
      const users = {
        current: action.user
      }
      return merge({}, state, {users})
    }
    case RECEIVE_POST: {
      const posts = concat([], action.post, state.posts)
      return Object.assign({}, state, {posts})
    }
    case RECEIVE_USER_POSTS: {
      const posts = uniqBy(concat([], state.posts, action.posts))
      return Object.assign({}, state, {posts})
    }
    case RECEIVE_FOLLOW: {
      let current
      if (action.followedUser.id === state.users.current.id) {
        current = merge({}, action.followedUser)
      }
      const users = Object.assign({}, state.users, {current})
      return Object.assign({}, state, {users})
    }
    case REMOVE_FOLLOW: {
      if (action.unfollowed === state.users.current.id) {
        const followers = concat([], state.users.current.followers)
        state.users.current.followers.forEach((el, idx) => {
          if (el === action.userId) {
            followers.splice(idx, 1)
          }
        })

        const current = Object.assign({}, state.users.current, {followers})
        const users = Object.assign({}, state.users, {current})
        return Object.assign({}, state, {users})
      }
      return state
    }
    case RECEIVE_CURRENT_USER_PROFILE: {
      const current = Object.assign({}, state.users.current, { profile: action.profile })
      const users = Object.assign({}, state.users, {current})
      return Object.assign({}, state, {users})
    }
    case RECEIVE_MAIN_FEED: {
      const feed = uniqBy(concat([], state.feed, action.feed), 'id')
      return Object.assign({}, state, {feed})
    }
    default:
      return state
  }
}

export default BrowseReducer
