import { connect } from 'react-redux'

import ProfileForm from './profile_form'
import { updateUserProfile } from '../../actions/session_actions'
import {
  openProfileModal, closeProfileModal
} from '../../actions/modal_actions'

const mapStateToProps = ({ session, modal }) => {
  if (session.currentUser) {
    return {
      currentUser: session.currentUser,
      modal: modal.profileModalOpen
    }
  } else {
    return {
      currentUser: false,
      modal: modal.profileModalOpen
    }
  }
}

const mapDispatchToProps = dispatch => {
  return ({
    openProfileModal: () => dispatch(openProfileModal()),
    closeProfileModal: () => dispatch(closeProfileModal()),
    updateUserProfile: (id, data) => dispatch(updateUserProfile(id, data))
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileForm)
