import React from 'react'

const UserPageBannerItem = (props) => {
  return (
    <div className='user-page__banner-item'>
      <span>{props.name}</span>
      <span>{props.value}</span>
    </div>
  )
}

export default UserPageBannerItem
