import merge from 'lodash/merge'

import {
  OPEN_POST_MODAL, CLOSE_POST_MODAL, OPEN_PROFILE_MODAL, CLOSE_PROFILE_MODAL
} from '../constants/modal_constants'

const _nullModal = {
  postModalOpen: false,
  profileModalOpen: false
}

const ModalReducer = (state = _nullModal, action) => {
  switch (action.type) {
    case OPEN_POST_MODAL: {
      return merge({}, state, {postModalOpen: true})
    }
    case CLOSE_POST_MODAL: {
      return merge({}, state, {postModalOpen: false})
    }
    case OPEN_PROFILE_MODAL: {
      return merge({}, state, {profileModalOpen: true})
    }
    case CLOSE_PROFILE_MODAL: {
      return merge({}, state, {profileModalOpen: false})
    }
    default: {
      return state
    }
  }
}

export default ModalReducer
