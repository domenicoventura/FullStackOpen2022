import React from 'react'

const Person = (props) => {
  // console.log('props is', props)
  return (
    <>
      <li>{props.person.name} {props.person.number}</li>
    </>
  )
}

const Persons = (props) => {
  // console.log('props is', props)
  return (
    <ul>
        {/* {console.log('personsToShow is', props.personsToShow)} */}
        {props.personsToShow.map(person => 
          <Person key={person.id} person={person} />
        )}
    </ul>
  )
}

export default Persons