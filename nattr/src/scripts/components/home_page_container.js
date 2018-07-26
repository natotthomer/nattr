import { connect } from 'react-redux'

import HomePage from './home_page'
import { readMainFeed } from '../actions/browse_actions'

const mapStateToProps = ({ session, browse }) => {
  if (session.currentUser) {
    return {
      currentUser: session.currentUser,
      feed: browse.feed
    }
  } else {
    return {
      currentUser: false,
      feed: []
    }
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    readMainFeed: username => dispatch(readMainFeed(username))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
