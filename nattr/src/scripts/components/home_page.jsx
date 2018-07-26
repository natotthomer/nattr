import React from 'react'
import { browserHistory } from 'react-router'

import Dashboard from './dashboard'
import Feed from './feed/feed'

export default class HomePage extends React.Component {
  componentDidMount () {
    if (this.props.currentUser) {
      this.props.readMainFeed(this.props.currentUser.username)
    } else {
      browserHistory.push('/i/sign_in')
    }
  }

  render () {
    const { currentUser, feed } = this.props

    if (currentUser) {
      const { description, website, visible_name: visibleName, profile_image, banner_image } = currentUser.profile

      return (
        <div className='home-page'>
          <div className='columns-container'>
            <div className='columns--left'>
              <Dashboard position={'left'} username={currentUser.username}
                {...currentUser.profile} />
            </div>
            <div className='columns--center'>
              <Feed posts={feed} />
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div>
          welcome
        </div>
      )
    }
  }
}
