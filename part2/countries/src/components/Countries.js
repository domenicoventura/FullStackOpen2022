import React from 'react'

const Button = ({ id, onClick, text }) => <button id={id} onClick={onClick}>{text}</button>

const Country = (props) => {
  // console.log('Country props is', props)
  
  return (
    <>
      {/* <li>{props.country.name.common} <Button onClick={() => handleShow(props.country.name.common)} text={"show"} /></li> */}
      {/* <li>{props.country.name.common} <button onClick={() => {props.onClick(props.country.name.common)}}>Show</button></li> */}
      <li>{props.country.name.common} <Button id={props.country.name.common} onClick={props.onClick} text={"show"} /></li>
      {/* <div><button onClick={props.onClick}>Show</button></div> */}
    </>
  )
}

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
                // <Country key={country.cca2} country={country} onclick={props.handleShowClick}/>
                <li key={country.cca2}>{country.name.common} <button id={country.name.common} onClick={props.handleShowClick}>{"show"}</button> </li>
              )}
          </ul>
        )
      }
  }
}

export default Countries