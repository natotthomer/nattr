import React from 'react'
import marked from 'marked'

const myRenderer = new marked.Renderer()

myRenderer.link = function (href, title, text) {
  return `<a href="${href}" title="${title}">${text}</a>`
}

marked.setOptions({
  renderer: myRenderer,
  gfm: false,
  tables: false,
  breaks: true,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
})

export default function Markdown (props) {
  if (!props.text) return <div className={props.className} />

  const innerHTML = { __html: marked(props.text) }

  return (
    <div className={props.className}
      dangerouslySetInnerHTML={innerHTML} />
  )
}
