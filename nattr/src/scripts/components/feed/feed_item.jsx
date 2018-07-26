import React from 'react'
import { Link } from 'react-router'

const FeedItem = (props) => {
  console.log(props);
  if (props.user) {
    return (
      <div className='feed-item__container'>
        <div className='feed-item'>
          <div>
            <div className='feed-item__profile-container'>
              <img src={props.user.profile.profile_image} />
            </div>
          </div>
          <div>
            <Link to={`/${props.user.username}`} className='feed-item__username-container'>
              <span className='feed-item__visible-name'>{props.user.profile.visible_name}</span>
              <span className='feed-item__username'>@{props.user.username}</span>
            </Link>
            <span className='feed-item__published-at'>{props.published_at.day}</span>
            <div>
              {props.text}
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return <div />
  }
}

export default FeedItem
