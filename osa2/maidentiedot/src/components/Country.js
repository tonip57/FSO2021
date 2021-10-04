import React from 'react'

const Country = (props) => {

    return (
    <div>
        <h3>{props.countriesShown[0].name.common}</h3>
        <ul>Capital: {props.countriesShown[0].capital}</ul>
        <ul>Region: {props.countriesShown[0].region}</ul>
        <h3>Languages</h3>
        <ul>
        {Object.entries(props.countriesShown[0].languages).map(([key, value]) => 
            <li key={value}>{value}</li>
        )}
        </ul>
        <ul>
        <img 
            src={props.countriesShown[0].flags.png}
            alt="new"
        />  
        </ul>
    </div>
    )
  }

export default Country