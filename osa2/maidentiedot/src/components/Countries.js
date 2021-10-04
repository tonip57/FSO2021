import React from 'react'

const Countries = (props) => {
    return (
    <ul>
        {props.countriesShown.map(country => 
          <li key={country.name.common}>{country.name.common}
      
            <button type="submit" onClick={() => props.handleClick(country.name.common)}>show</button>
         
          </li>
        )}
    </ul>
    )
  }

export default Countries