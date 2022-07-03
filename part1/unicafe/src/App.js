import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ name, value, attribute }) => <div>{name} {value} {attribute}</div>

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
  const allString = "all"
  const averageString = "average"
  const positiveString = "positive"

  let all = good+neutral+bad
  let average = all===0 ? 0 : (good*1+neutral*0+bad*(-1))/all
  let positive = all===0 ? 0 : good/all*100
  let attribute = "%"

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
      <Display name={allString} value={all} />
      <Display name={averageString} value={average} />
      <Display name={positiveString} value={positive} attribute={attribute} />
    </>
  )
}

export default App