import React from 'react'
import { Route, IndexRoute } from 'react-router'

// import { receiveErrorMessage } from '../actions/message_actions'
import { asyncComponent } from '../utils/import_utils'

import App from './app'
// import SignUpContainer from './auth/sign_up_container'
// import UserPageContainer from './user_page/user_page_container'
import HomePageContainer from './home_page_container'

// import NotFound from './not-found'

// const userIsSignedIn = (store) => (nextState, replace, callback) => {
//   const isSignedIn = store.getState().session.currentUser
//   if (!isSignedIn) {
//     replace('/')
//     store.dispatch(receiveErrorMessage(
//       `You must log in to view your ${nextState.location.pathname.slice(1)}s.`
//     ))
//   }
//   callback()
// }

export default function getRoutes (store) {
  return (
    <Route path='/' component={App}>
      <IndexRoute component={asyncComponent(() => import('./home_page_container').then(module => module.default))} />
      <Route path='/i/sign_in'
        component={asyncComponent(() => import('./auth/sign_in_container').then(module => module.default))} />
      <Route path='/:username' component={asyncComponent(() => import('./user_page/user_page_container').then(module => module.default))} />
      <Route path='/i/sign_up' component={asyncComponent(() => import('./auth/sign_up_container').then(module => module.default))} />
    </Route>
  )
}
