import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>

const Display = ({ text, value, attribute }) => <div>{text} {value} {attribute}</div>


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const selectedClick = () => {
    setSelected(Math.round(Math.random()*6))
  }

  const voteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const max = Math.max(...votes);
  const index = votes.indexOf(max);

  return (
    <>
      <h1>Anectode of the day</h1>
      <Display text={anecdotes[selected]}/>
      <Display text={"has"} value={votes[selected]} attribute={"votes"}/>
      <Button onClick={voteClick} text={"vote"}/>
      <Button onClick={selectedClick} text={"next anecdote"}/>
      <h1>Anectode with most votes</h1>
      <Display text={anecdotes[index]}/>
      <Display text={"has"} value={votes[index]} attribute={"votes"}/>
    </>
  )
}

export default App