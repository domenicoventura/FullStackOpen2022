import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = newSearch === '' ?
                        persons :
                        persons.filter(person => person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)

  // console.log('persons is', persons)

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    let updatePerson = ""
    for (const person of persons) {
      // console.log(person);
      if (person.name === newName)
      {
        const message = `${newName} is already added to phonebook, replace the old number with a new one?`
        if (window.confirm(message)) {
          updatePerson = person.id
        }
        else
        {
          return
        }
      }
    }
    if ((newName.length === 0) || (newNumber.length === 0))
    {
      window.alert('cannot add blank data')
      return
    }

    if (updatePerson !== "")
    {
      const person = persons.find(n => n.id === updatePerson)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(updatePerson, changedPerson)
        .then(returnedNote => {
          // console.log(returnedNote)
          setPersons(persons.map(person => person.id !== updatePerson ? person : returnedNote))
          setNewName('')
          setNewNumber('')
        })
    }
    else
    {
      personService
        .create(personObject)
        .then(returnedNote => {
          setPersons(persons.concat(returnedNote))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const nameObject = {
    value: newName,
    onChange: handleNameChange
  }

  const numberObject = {
    value: newNumber,
    onChange: handleNumberChange
  }

  const deletePersonOf = (id) => {
    if (window.confirm("Do you really want to delete this entry?")) {
      // console.log(`delete person with id: ${id}`)
      const person = persons.find(n => n.id === id)
      
      personService
        .remove(id)
        .then(returnedNote => {
          // console.log("person removed")
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          alert(`the person '${person.name}' was already deleted from server`)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} name={nameObject} number={numberObject} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App;
