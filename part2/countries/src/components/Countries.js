import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const Language = (props) => {
  // console.log('Language props is', props)
  return (
    <>
      <li>{props.language}</li>
    </>
  )
}

const Detail = (props) => {
  // console.log('Detail props is', props)
  const [dataCountry, setDataCountry] = useState('')

  const api_key = process.env.REACT_APP_API_KEY
  const languages = [];   
  for (const property in props.country.languages) {
    // console.log(`${property}: ${props.country.languages[property]}`);
    languages.push(`${props.country.languages[property]}`);
  }
  // console.log(languages)
  const lat = props.country.capitalInfo.latlng[0]
  const lng = props.country.capitalInfo.latlng[1]
  // console.log("Lat: ", lat, " Lng: ", lng)

  // https://openweathermap.org/data/2.5/onecall?lat=55&lon=37&units=metric&appid=...
  useEffect(() => {
    axios
      .get(`https://openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&units=metric&appid=${api_key}`)
      .then(response => {
        setDataCountry(response.data)
        // console.log(response.data)
      })
  }, [api_key, lat, lng])

  if (dataCountry === '')
  {
    return (
      <>
        <h1>{props.country.name.common}</h1>
        <div>capital {props.country.capital[0]}</div>
        <div>area {props.country.area}</div>
        <h3>languages</h3>
        <ul>
          {languages.map((language) => 
            <Language key={language} language={language} />
          )}
        </ul>
        <img src={props.country.flags.png} alt="Country's Flag"></img>
      </>
    )
  }
  else
  {
    return (
      <>
        <h1>{props.country.name.common}</h1>
        <div>capital {props.country.capital[0]}</div>
        <div>area {props.country.area}</div>
        <h3>languages</h3>
        <ul>
          {languages.map((language) => 
            <Language key={language} language={language} />
          )}
        </ul>
        <img src={props.country.flags.png} alt="Country's Flag"></img>
        <h2>Weather in {props.country.capital[0]}</h2>
        <div>temperature {dataCountry.current.temp} Celsius</div>
        <img src={`http://openweathermap.org/img/wn/${dataCountry.current.weather[0].icon}@2x.png`} alt="Country's Temperature Icon"></img>
        <div>wind {dataCountry.current.wind_speed} m/s</div>
      </>
    )
  }
}

const Countries = (props) => {
  // console.log('Countries props is', props)
  switch (props.countriesToShow.length) {
    case 1:
      return (
        <Detail country={props.countriesToShow[0]} />
      )
  
    default:
      if (props.countriesToShow.length > 10)
      {
        return (
          <div>Too many matches, specify another filter</div>
        )
      }
      else
      {
        return (
          <ul>
              {props.countriesToShow.map(country => 
                <li key={country.cca2}>{country.name.common} <button id={country.name.common} onClick={props.handleShowClick}>{"show"}</button> </li>
              )}
          </ul>
        )
      }
  }
}

export default Countries