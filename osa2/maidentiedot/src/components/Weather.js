import React from 'react'

const Weather = (props) => {
    return (
    <div>
        <p>Weather in {props.weather.location.name}</p>
        <p>temperature: {props.weather.current.temperature} </p>
        <img src = {props.weather.current.weather_icons} />
        <p>wind: {props.weather.current.wind_speed} kph direction {props.weather.current.wind_dir}</p>
    </div>
    )
  }

export default Weather