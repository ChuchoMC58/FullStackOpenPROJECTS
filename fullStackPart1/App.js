/* import logo from './logo.svg';
import './App.css';
 */
import { useState } from "react";

const App = () => { 
  
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const badHandler = () => { 
    setBad(bad + 1) 
    setTotal(total + 1) 
  }

  const goodHandler = () => {
    setGood(good + 1) 
    setTotal(total + 1) 
  } 

  const neutralHandler = () => {
    setNeutral(neutral + 1) 
    setTotal(total + 1) 
  }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selectedAnecd, setSelected] = useState(0)

  const nextQuote = () => 
    setSelected(Math.floor(Math.random()*anecdotes.length))

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  
  const upVote = () => {  
    const copy = [...votes] 
    copy[selectedAnecd] =  copy[selectedAnecd] + 1 
    setVotes(copy)  
  }

  const mostVts = () => 
    votes.indexOf(Math.max(...votes))

  
  return (
    <div> 
      <h1> Survey: </h1>
      <Button handler={goodHandler} text="Good"></Button>
      <Button handler={neutralHandler} text="Neutral"></Button>
      <Button handler={badHandler} text="Bad"></Button>
    
      <h1>Statistics: </h1> 
      <Statistics arr={[good,neutral,bad,total]} />

      <p> {anecdotes[selectedAnecd]}</p> 
      <Button handler={nextQuote} text="Next quote"> </Button>
      <p> {votes[selectedAnecd]}</p>
      <Button handler={upVote} text="upvote"> </Button>
      
      <h2>Anecdote with most votes:</h2>
      <p> {anecdotes[mostVts()]}</p>
      <p> {votes[mostVts()]}</p>
    </div> 
  ) 
} 

const Button = ({handler, text}) => 
    <button onClick={handler}> {text} </button>

const Statistics = (props) => {
  const [good, neutral, bad, total] = props.arr

  const avg = () => {
    const smth = good*1 + neutral*0 + bad*-1
    return smth/total
  }

  if(total===0) return <p>No feedback yet</p>

  return (
    <table>
      <tbody>
        <tr>
          <td> <StatisticLine text="Good counter" statistic={good} /></td>
        </tr>
        <tr>
          <td> <StatisticLine text="neutral counter" statistic={neutral} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="bad counter" statistic={bad}  /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="Total" statistic={total} /> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="Average" statistic={avg()}/> </td>
        </tr>
        <tr>
          <td> <StatisticLine text="positive" statistic={(good/total) * 100}/> </td>
        </tr>
      </tbody>
    </table>
  )
}

const StatisticLine = (props) => 
  <p>{props.text}: {props.statistic} </p>

export default App;