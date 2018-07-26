import { connect } from 'react-redux'

import Header from './header'

import { signOut } from '../../actions/session_actions'
import {
  openPostModal, closePostModal
} from '../../actions/modal_actions'

const mapStateToProps = ({ session, browse }) => {
  if (session.currentUser) {
    return {
      currentUser: session.currentUser,
      post: browse
    }
  } else {
    return {
      currentUser: false,
      post: browse
    }
  }
}

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOut()),
  openPostModal: () => dispatch(openPostModal()),
  closePostModal: () => dispatch(closePostModal())
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
