import React from 'react'

const Part = (props) => {
    console.log(props)
    return (
      <div>
        <p>
          {props.part.name}, Exercises: {props.part.exercises}
        </p>
      </div>
    )
  }

export default Part