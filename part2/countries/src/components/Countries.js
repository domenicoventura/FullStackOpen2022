import React from 'react'

const Country = (props) => {
  // console.log('props is', props)
  return (
    <>
      <li>{props.country.name.common}</li>
    </>
  )
}

const Language = (props) => {
  // console.log('props is', props)
  return (
    <>
      <li>{props.language}</li>
    </>
  )
}

const Detail = (props) => {
  // console.log('props is', props)
  const languages = [];   
  for (const property in props.country.languages) {
    // console.log(`${property}: ${props.country.languages[property]}`);
    languages.push(`${props.country.languages[property]}`);
  }
  // console.log(languages)

  return (
    <>
      <h2>{props.country.name.common}</h2>
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

const Countries = (props) => {
  // console.log('props is', props)
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
              {/* {console.log('personsToShow is', props.personsToShow)} */}
              {props.countriesToShow.map(country => 
                <Country key={country.cca2} country={country} />
              )}
          </ul>
        )
      }
  }
}

export default Countries