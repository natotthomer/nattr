import React from 'react'

const FollowButton = (props) => {
  const {
    createFollow, destroyFollow, currentUser, followingUserId
  } = props
  let isFollowing, onClick

  if (!currentUser) {
    isFollowing = undefined
    onClick = () => console.log('Please log in')
  } else {
    isFollowing = currentUser.following.some(el => el === followingUserId)
    onClick = isFollowing
            ? () => destroyFollow(followingUserId)
            : () => createFollow(followingUserId)
  }

  return (
    <div className='follow-button' onClick={onClick}>
      { isFollowing ? 'Following' : isFollowing === undefined ? '' : 'Follow' }
    </div>
  )
}

export default FollowButton
