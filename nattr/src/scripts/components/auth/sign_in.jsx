import Cookies from 'js-cookie'
import pick from 'lodash/pick'
import { browserHistory } from 'react-router'

import React from 'react'

export default class SignIn extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: ''
    }

    this.handleSignIn = this.handleSignIn.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
  }

  handleSignIn (e) {
    e.preventDefault()
    this.props.signIn(pick(this.state, ['email', 'password']))
      .catch(error => {
        console.log(error)
      })
      .then(response => {
        // if sign in doesn't work, don't navigate away
        if (response && response.currentUser) {
          browserHistory.push('/')
        }
      })
  }

  handleEmailChange (e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange (e) {
    this.setState({ password: e.target.value })
  }

  render () {
    return (
      <div className='sign-in-form'>
        <form className='auth-form' onSubmit={this.handleSignIn}>
          <h1>Welcome Back</h1>
          <p>Please log in to continue Nattring away</p>
          <label>
            Email
            <input
              type='text'
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </label>
          <label>
            Password
            <input
              type='password'
              value={this.state.password}
              onChange={this.handlePasswordChange} />
          </label>
          <button type='submit'>
            Log in
          </button>
        </form>
      </div>
    )
  }
}
