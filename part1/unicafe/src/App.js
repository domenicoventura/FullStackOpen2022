import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ name, value }) => <p>{name} {value}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const input = "give feedback"
  const output = "statistics"
  const goodString = "good"
  const neutralString = "neutral"
  const badString = "bad"

  const goodClick = () => {
    setGood(good + 1)
  }
  
  const neutralClick = () => {
    setNeutral(neutral + 1)
  }
  
  const badClick = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <Header header={input} />
      <Button onClick={goodClick} text={goodString}/>
      <Button onClick={neutralClick} text={neutralString}/>
      <Button onClick={badClick} text={badString}/>
      <Header header={output} />
      <Display name={goodString} value={good} />
      <Display name={neutralString} value={neutral} />
      <Display name={badString} value={bad} />
    </>
  )
}

export default App