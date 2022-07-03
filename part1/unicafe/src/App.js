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

const Statistics = ({ good, neutral, bad }) => {
  let all = good+neutral+bad
  let average = all===0 ? 0 : (good*1+neutral*0+bad*(-1))/all
  let positive = all===0 ? 0 : good/all*100
  let attribute = "%"

  if (all === 0)
  {
    return (
      <>
        <Display name={"No feedback given"} />
      </>
    )
  }
  else
  {
    return (
      <>
        <Display name={"good"} value={good} />
        <Display name={"neutral"} value={neutral} />
        <Display name={"bad"} value={bad} />
        <Display name={"all"} value={all} />
        <Display name={"average"} value={average} />
        <Display name={"positive"} value={positive} attribute={attribute}/>
      </>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const input = "give feedback"
  const output = "statistics"
  
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
      <Button onClick={goodClick} text={"good"}/>
      <Button onClick={neutralClick} text={"neutral"}/>
      <Button onClick={badClick} text={"bad"}/>
      <Header header={output} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  )
}

export default App