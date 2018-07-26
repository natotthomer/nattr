import React from 'react'

import HeaderContainer from './header/header_container'
import PostFormContainer from './post_form/post_form_container'
import ProfileFormContainer from './profile_form/profile_form_container'

export default function App (props) {
  return (
    <div className='app'>
      <HeaderContainer />
      <PostFormContainer />
      <ProfileFormContainer />
      <div className='app-body'>
        <div className='app-body__main'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
