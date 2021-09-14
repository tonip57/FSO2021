import React, { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = (props) => {
  return (
    <tbody>
      <tr>
        <td>{props.text}</td>
        <td>{props.value}</td>
      </tr>
    </tbody>
  )
}

const Statistics = (props) => {
  function calculateAverage() {
    return (props.bad * -1 + props.neutral * 0 + props.good * 1) / props.sum
  }

  function calculatePositive() {
    return props.good / props.sum * 100
  }

  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
  return(
    <table>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="average" value ={calculateAverage()} />
      <StatisticLine text="positive" value ={calculatePositive() + "%"} />
    </table>
  )
  }
}


const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setSum(sum + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setSum(sum + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setSum(sum + 1)
  }


  return (
    <div>
      <div>
        <h2>Give Feedback</h2>
        <Button handleClick={handleGood} text='good' />
        <Button handleClick={handleNeutral} text='neutral' />
        <Button handleClick={handleBad} text='bad' />
        <h2>Statistics</h2>
        <Statistics good={good} neutral={neutral} bad={bad} sum={sum}/>
      </div>
    </div>
  )
}

export default App