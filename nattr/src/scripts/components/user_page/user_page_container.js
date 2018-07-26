import { connect } from 'react-redux'

import UserPage from './user_page'
import { readUser } from '../../actions/browse_actions'
import { readUserPosts } from '../../actions/post_actions'

const mapStateToProps = (state) => {
  const { session, browse } = state
  if (session.currentUser) {
    return {
      currentUser: session.currentUser,
      browseCurrentUser: browse.users.current,
      posts: browse.feed
    }
  } else {
    return {
      currentUser: false,
      browseCurrentUser: browse.users.current,
      posts: browse.feed
    }
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    readUser: username => dispatch(readUser(username)),
    readUserPosts: userId => dispatch(readUserPosts(userId))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(UserPage)
