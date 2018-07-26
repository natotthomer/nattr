import React from 'react'
import { Link } from 'react-router'

export default function HeaderSectionLink (props) {
  const className = props.className || 'app-header__section-link'

  const content = (
    <div>
      <span>
        {props.content}
      </span>
    </div>
  )

  switch (props.action) {
    case 'to': {
      return (
        <Link to={props.value} className={className}>
          {content}
        </Link>
      )
    }
    case 'click': {
      return (
        <div onClick={props.value} className={className}>
          {content}
        </div>
      )
    }
    default:
      return <div />
  }
}
