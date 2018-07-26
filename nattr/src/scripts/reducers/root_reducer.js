import { combineReducers } from 'redux'

import SessionReducer from './session_reducer'
import BrowseReducer from './browse_reducer'
import ModalReducer from './modal_reducer'

export default combineReducers({
  session: SessionReducer,
  browse: BrowseReducer,
  modal: ModalReducer
})
