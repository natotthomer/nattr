import React from 'react'

export default function DivWithBackground (props) {
  const className = props.className || ''
  let style = {}

  if (props.image) {
    style = {
      backgroundImage: 'url(' + props.image + ')',
      backgroundSize: '100%'
    }
  }

  return (
    <div className={className} style={style} />
  )
}
