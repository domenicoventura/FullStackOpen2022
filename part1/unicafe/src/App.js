import { useState } from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.header}</h1>
    </>
  )
}

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const StatisticLine = ({ text, value, attribute }) => <tr><td>{text}</td><td>{value} {attribute}</td></tr>

const Statistics = ({ good, neutral, bad }) => {
  let all = good+neutral+bad
  let average = all===0 ? 0 : (good*1+neutral*0+bad*(-1))/all
  let positive = all===0 ? 0 : good/all*100
  let attribute = "%"

  if (all === 0)
  {
    return (
      <>
        <div>{"No feedback given"}</div>
      </>
    )
  }
  else
  {
    return (
      <table>
        <tbody>
          <StatisticLine text={"good"} value={good} />
          <StatisticLine text={"neutral"} value={neutral} />
          <StatisticLine text={"bad"} value={bad} />
          <StatisticLine text={"all"} value={all} />
          <StatisticLine text={"average"} value={average} />
          <StatisticLine text={"positive"} value={positive} attribute={attribute}/>
        </tbody>
      </table>
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