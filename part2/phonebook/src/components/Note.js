import React from 'react'

const Note = (props) => {
  // console.log('props is', props)
  return (
    <>
      <li>{props.note.content}</li>
    </>
  )
}

export default Note