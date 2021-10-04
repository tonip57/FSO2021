import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'
import Weather from './components/Weather'

const App = () => {
  const api_key = process.env.REACT_APP_NOT_SECRET_CODE
  const [ countries, setCountries ] = useState([])
  const [ countriesShown, setCountriesShown ] = useState(countries)
  const [ filter, setFilter ] = useState('')
  const [weather, setWeather] = useState({location:{}, current: {}});
  const [cap, setCap] = useState("helsinki");
  var url = `http://api.weatherstack.com/current?access_key=${api_key}&query=${cap}`


  useEffect(() => {
    if (countriesShown.length === 1) {
      setCap(countriesShown[0].capital)
    }
  }, [countriesShown])


  useEffect(() => {
    axios.get(url)
    .then(response => {
      console.log('promise fullfilled')
      setWeather(response.data)
    })
  }, [cap])


  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
        setCountriesShown(response.data)
      })
  }
  
  useEffect(hook, [])

  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilter(event.target.value)
    setCountriesShown(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  function changeFilter(name) {
    setFilter(name)
    setCountriesShown(countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase())))
  }


  return (
    <div>
      <h2>Countries</h2>
      <Filter handleFilterChange={() => handleFilterChange} filter={filter}/>

      {countriesShown.length > 10 &&
        <ul>Too many matches, specify another filter</ul>
      }
      {countriesShown.length <= 10 && countriesShown.length > 1 &&
        <Countries countriesShown={countriesShown} handleClick={(name) => changeFilter(name)}/>
      }
      {countriesShown.length === 1 &&
        <Country countriesShown={countriesShown}/>
      }
      {countriesShown.length === 1 &&
        <Weather weather={weather} countriesShown={countriesShown}/>
      }
    </div>
  )

}

export default App