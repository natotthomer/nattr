import React from 'react'
import { Link } from 'react-router'

import DivWithBackground from './global/div_with_background'

export default class Dashboard extends React.Component {
  render () {
    const {
      position, description, website, visibleName, username, profile_image, banner_image
    } = this.props

    return (
      <div className={`dashboard`}>
        <DivWithBackground className='dashboard__splash' image={banner_image} />
        <div className='dashboard__content'>
          <div className='dashboard__content--top'>
            <Link to={'/' + username} className='dashboard__profile-pic'>
              <img src={profile_image} />
            </Link>
            <div className='dashboard__names'>
              <Link to={'/' + username}>
                <h2>
                  {visibleName}
                </h2>
              </Link>
              <Link to={'/' + username}>
                @{username}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
