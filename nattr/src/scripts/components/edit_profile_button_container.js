import { connect } from 'react-redux'

import EditProfileButton from './edit_profile_button'
import { editProfile } from '../actions/session_actions'
import { openProfileModal, closeProfileModal } from '../actions/modal_actions'

const mapStateToProps = ({ session, modal }) => {
  if (session.currentUser) {
    return {
      currentUser: session.currentUser,
      profileModalOpen: modal.profileModalOpen
    }
  } else {
    return {
      currentUser: false,
      profileModalOpen: false
    }
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    editProfile: data => dispatch(editProfile(data)),
    openProfileModal: () => dispatch(openProfileModal()),
    closeProfileModal: () => dispatch(closeProfileModal())
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileButton)
