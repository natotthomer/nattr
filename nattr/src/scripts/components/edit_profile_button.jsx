import React from 'react'

export default function EditProfileButton (props) {
  return (
    <div className='user-page__banner-item margin-left-auto'>
      <div className='edit-profile-button' onClick={props.openProfileModal}>Edit Profile</div>
    </div>
  )
}
