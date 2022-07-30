import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
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
      id: persons.length + 1
    }
    for (const person of persons) {
      // console.log(person);
      if (person.name === newName)
      {
        const message = `${newName} is already added to phonebook`
        window.alert(message)
        return
      }
    }
    if ((newName.length === 0) || (newNumber.length === 0))
    {
      window.alert('cannot add blank data')
      return
    }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} name={nameObject} number={numberObject} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App;
