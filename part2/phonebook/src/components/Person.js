import React from 'react'

const Person = (props) => {
  // console.log('props is', props)
  return (
    <>
      <li>{props.person.name} {props.person.number}</li>
    </>
  )
}

export default Person