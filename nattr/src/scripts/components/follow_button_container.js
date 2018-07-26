import { connect } from 'react-redux'

import { createFollow, destroyFollow } from '../actions/follow_actions'

import FollowButton from './follow_button'

const mapStateToProps = ({ session }) => {
  if (session.currentUser) {
    return {
      currentUser: session.currentUser
    }
  } else {
    return {
      currentUser: false
    }
  }
}

const mapDispatchToProps = dispatch => ({
  createFollow: id => dispatch(createFollow(id)),
  destroyFollow: id => dispatch(destroyFollow(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(FollowButton)
