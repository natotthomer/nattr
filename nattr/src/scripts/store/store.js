import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import RootReducer from '../reducers/root_reducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const configureStore = (initialState = {}) => {
  return createStore(RootReducer, initialState, composeEnhancers(applyMiddleware(thunk)))
}

export default configureStore
