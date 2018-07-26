import Cookies from 'js-cookie'
import pick from 'lodash/pick'
import { browserHistory } from 'react-router'

import React from 'react'

export default class SignUp extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password1: '',
      password2: ''
    }

    this.handleSignUp = this.handleSignUp.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handleUsernameChange = this.handleUsernameChange.bind(this)
    this.handlePassword1Change = this.handlePassword1Change.bind(this)
    this.handlePassword2Change = this.handlePassword2Change.bind(this)
  }

  handleSignUp (e) {
    e.preventDefault()
    this.props.signUp(pick(this.state, ['email', 'username', 'password1', 'password2']))
      .then(response => {
        browserHistory.push('/')
      })
  }

  handleEmailChange (e) {
    this.setState({ email: e.target.value })
  }

  handleUsernameChange (e) {
    this.setState({ username: e.target.value })
  }

  handlePassword1Change (e) {
    this.setState({ password1: e.target.value })
  }

  handlePassword2Change (e) {
    this.setState({ password2: e.target.value })
  }

  render () {
    return (
      <div className='sign-in-form'>
        <form className='auth-form' onSubmit={this.handleSignUp}>
          <h1>Sign Up</h1>
          <p>You'll be Nattring away in seconds!</p>
          <label>
            Email
            <input
              type='text'
              value={this.state.email}
              onChange={this.handleEmailChange} />
          </label>
          <label>
            Username
            <input
              type='text'
              value={this.state.username}
              onChange={this.handleUsernameChange} />
          </label>
          <label>
            Password
            <input
              type='password'
              value={this.state.password1}
              onChange={this.handlePassword1Change} />
          </label>
          <label>
            Re-type Password
            <input
              type='password'
              value={this.state.password2}
              onChange={this.handlePassword2Change} />
          </label>
          <button type='submit'>
            Sign Up!
          </button>
        </form>
      </div>
    )
  }
}
