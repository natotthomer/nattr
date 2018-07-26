import pick from 'lodash/pick'
import React from 'react'

import UserPageBannerItem from './user_page_banner_item'
import EditProfileButtonContainer from './../edit_profile_button_container'
import DivWithBackground from '../global/div_with_background'

const UserPageBanner = (props) => {
  const bannerItemsData = pick(props.browseCurrentUser, ['posts', 'followers', 'following'])

  const bannerItems = (
    <div className='user-page__banner-items'>
      {
        Object.keys(bannerItemsData).map((key, idx) => {
          return (
            <UserPageBannerItem key={idx} name={key} value={bannerItemsData[key].length} />
          )
        })
      }
    </div>
  )

  const userPageProfileImage = () => {
    if (props.browseCurrentUser.profile && props.browseCurrentUser.profile.profile_image) {
      return (
        <div className='user-page__banner__profile-img'>
          <div>
            <img src={props.browseCurrentUser.profile.profile_image} />
          </div>
        </div>
      )
    } else {
      return <div />
    }
  }

  const profileEditButton = props.currentUser.id === props.browseCurrentUser.id
                          ? <EditProfileButtonContainer />
                          : <div />

  return (
    <div className='user-page__banner'>
      <DivWithBackground className='user-page__banner-hero' image={props.browseCurrentUser.profile ? props.browseCurrentUser.profile.banner_image : ''} />
      <div className='user-page__banner__nav-bar'>
        <div className='user-page__banner__nav-bar--inner container'>
          {userPageProfileImage()}
          {bannerItems}
          {profileEditButton}
        </div>
      </div>
    </div>
  )
}

export default UserPageBanner
