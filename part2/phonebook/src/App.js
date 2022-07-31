import { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const Notification = ({ message }) => {
  const notificationStyle = {
    color: 'rgb(0, 128, 0)',
    background: 'lightgrey',
    fontSize: 16,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

const Error = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        .then(returnedPerson => {
          // console.log(returnedPerson)
          setPersons(persons.map(person => person.id !== updatePerson ? person : returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Modified ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorMessage(`Information of '${person.name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== updatePerson))
        })
    }
    else
    {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
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
        .then(returnedPerson => {
          // console.log("person removed")
          setPersons(persons.filter(person => person.id !== id))
        })
        .catch(error => {
          setErrorMessage(`the person '${person.name}' was already deleted from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />
      <Filter value={newSearch} onChange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm onSubmit={addPerson} name={nameObject} number={numberObject} />
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} deletePersonOf={deletePersonOf} />
    </div>
  )
}

export default App;
