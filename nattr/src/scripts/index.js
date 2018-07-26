import React from 'react'
import ReactDOM from 'react-dom'

import Root from './components/root'
import configureStore from './store/store'
import getRoutes from './components/routes'

import '../styles/main.scss'

switch (document.readyState) {
  case 'interactive':
  case 'complete':
    initializeApp()
    break
  case 'loading':
  default:
    document.addEventListener('DOMContentLoaded', initializeApp)
}

function initializeApp () {
  const store = configureStore(window.__REDUX_STATE__)
  const routes = getRoutes(store)

  ReactDOM.render(
    <Root store={store} routes={routes} />,
    document.getElementById('root')
  )
}
