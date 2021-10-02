import React from 'react'

const Numbers = (props) => {
    return (
    <ul>
        {props.personsShown.map(person =>
          <li key={person.name}>{person.name}{" "}{person.number}</li>
        )}
    </ul>
    )
  }

export default Numbers