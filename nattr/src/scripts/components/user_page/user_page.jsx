import React from 'react'
import { browserHistory } from 'react-router'

import FollowButtonContainer from './../follow_button_container'
import Dashboard from './../dashboard'
import Feed from './../feed/feed'
import UserPageBanner from './user_page_banner'
import ProfileCard from './profile_card'

export default class UserPage extends React.Component {
  componentDidMount () {
    this.props.readUser(this.props.routeParams.username)
  }

  componentWillUpdate (nextProps, prevState) {
    if (nextProps.routeParams.username !== this.props.routeParams.username) {
      this.props.readUser(nextProps.routeParams.username)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (!prevProps.browseCurrentUser || (!this.props.browseCurrentUser) ||
        (prevProps.browseCurrentUser.id !== this.props.browseCurrentUser.id && this.props.browseCurrentUser.id !== undefined)) {
      this.props.readUserPosts(this.props.browseCurrentUser.id)
    }
  }

  render () {
    const { browseCurrentUser, currentUser } = this.props
    let markup

    if (browseCurrentUser) {
      let followButton = ''

      if (browseCurrentUser.id !== currentUser.id) {
        followButton = (
          <FollowButtonContainer
            followingUserId={browseCurrentUser.id} />
        )
      }

      markup = (
        <div className='user-page'>
          <UserPageBanner
            currentUser={currentUser}
            browseCurrentUser={browseCurrentUser} />
          <div className='user-page__main'>
            <div className='columns-container'>
              <div className='columns--left'>
                <ProfileCard {...browseCurrentUser} />
              </div>
              <div className='columns--center'>
                <Feed posts={browseCurrentUser.posts} />
              </div>
              <div className='columns--right' />
            </div>
            {followButton}
          </div>
        </div>
      )
    } else {
      markup = (
        <div>
          We're sorry, we can't find an account with that username
          <Feed posts={browseCurrentUser.posts} />
        </div>
      )
    }

    return markup
  }
}
