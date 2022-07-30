import React from 'react'

const Person = ({ person, deletePerson }) => {
  // console.log('props is', props)
  return (
    <>
      <li>
        {person.name} {" "}
        {person.number} {" "}
        <button onClick={deletePerson}>{"delete"}</button>
      </li>
    </>
  )
}

const Persons = (props) => {
  // console.log('props is', props)
  return (
    <ul>
        {/* {console.log('personsToShow is', props.personsToShow)} */}
        {props.personsToShow.map(person => 
          <Person
            key={person.id}
            person={person}
            deletePerson={() => props.deletePersonOf(person.id)}
          />
        )}
    </ul>
  )
}

export default Persons