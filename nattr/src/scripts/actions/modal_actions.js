import {
  OPEN_POST_MODAL, CLOSE_POST_MODAL, OPEN_PROFILE_MODAL, CLOSE_PROFILE_MODAL
} from '../constants/modal_constants'

export const openPostModal = () => dispatch => {
  return dispatch({ type: OPEN_POST_MODAL })
}

export const closePostModal = () => dispatch => {
  return dispatch({ type: CLOSE_POST_MODAL })
}

export const openProfileModal = () => dispatch => {
  return dispatch({ type: OPEN_PROFILE_MODAL })
}

export const closeProfileModal = () => dispatch => {
  return dispatch({ type: CLOSE_PROFILE_MODAL })
}
