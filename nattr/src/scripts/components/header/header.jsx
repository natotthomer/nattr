import React from 'react'
import { Link } from 'react-router'

import HeaderSectionLink from './header-section-link'

export default function Header (props) {
  let markup

  const { currentUser, signOut } = props

  if (!currentUser) {
    markup = (
      <div className='app-header__section'>
        <Link to={'/i/sign_in'} className='app-header__section-link'>
          <span>
            {'Sign in'}
          </span>
        </Link>
        <Link to={'/i/sign_up'} className='app-header__section-link'>
          <span>
            {'Sign up'}
          </span>
        </Link>
      </div>
    )
  } else {
    markup = (
      <div className='app-header__section'>
        <HeaderSectionLink
          action={'to'}
          value={`/${currentUser.username}`}
          content={currentUser.username} />
        <HeaderSectionLink
          action={'click'}
          value={signOut}
          content={'Sign Out'} />
        <HeaderSectionLink
          action={'click'}
          value={props.openPostModal}
          content={'Post Now!'}
          className='app-header__section-button round-button' />
      </div>
    )
  }

  return (
    <div className='app-header'>
      <div className='app-header__main container'>
        <div className='app-header__section'>
          <HeaderSectionLink action='to' value='/' content={'Nattr'} />
        </div>
        <div className='app-header__section'>
          {markup}
        </div>
      </div>
    </div>
  )
}
