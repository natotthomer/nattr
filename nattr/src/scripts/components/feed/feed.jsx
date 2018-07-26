import React from 'react'

import FeedItem from './feed_item'

const Feed = (props) => {
  if (props.posts) {
    return (
      <div className='feed'>
        {props.posts.map((post, idx) => {
          return (
            <FeedItem key={idx} {...post} />
          )
        })}
      </div>
    )
  } else {
    return (
      <div className='feed' />
    )
  }
}

export default Feed
