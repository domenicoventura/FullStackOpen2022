import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const countriesToShow = newSearch === '' ?
                        [] :
                        countries.filter(country => country.name.common.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1)

  // console.log('persons is', persons)

  const handleSearchChange = (event) => {
    // console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleShowClick = (event) => {
    // console.log(event.target.id)
    setNewSearch(event.target.id)
  }

  return (
    <div>
      <Filter value={newSearch} onChange={handleSearchChange} />
      <Countries countriesToShow={countriesToShow} handleShowClick={handleShowClick}/>
    </div>
  )
}

export default App;
