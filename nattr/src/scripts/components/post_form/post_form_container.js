import { connect } from 'react-redux'

import PostForm from './post_form'
import {
  openPostModal, closePostModal
} from '../../actions/modal_actions'
import {
  createPost
} from '../../actions/post_actions'

const mapStateToProps = ({ session, modal }) => {
  if (session.currentUser) {
    return {
      currentUser: session.currentUser,
      modal: modal.postModalOpen
    }
  } else {
    return {
      currentUser: false,
      modal: false
    }
  }
}

const mapDispatchToProps = dispatch => ({
  openPostModal: () => dispatch(openPostModal()),
  closePostModal: () => dispatch(closePostModal()),
  createPost: data => dispatch(createPost(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(PostForm)
