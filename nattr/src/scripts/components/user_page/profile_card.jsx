import { Link } from 'react-router'

import React from 'react'
import Markdown from './../markdown'

const ProfileCard = (props) => {
  if (props.profile) {
    const { username, profile } = props
    const { visible_name: visibleName, description, website } = profile
    return (
      <div className='user_page__profile_card'>
        <div className='profile_card__visible-name'>
          <Link to='/{username}'>
            {visibleName}
          </Link>
        </div>
        <div>
          @{username}
        </div>
        <div className='profile-card__description'>
          <Markdown text={description} />
        </div>
        <div>
          <a href={'http://www.' + website}>{website}</a>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default ProfileCard
