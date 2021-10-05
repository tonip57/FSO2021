import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ personsShown, setPersonsShown ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersonsShown(response.data)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    if(persons.some(person => person.name === newName)) {
      var id
      for (var i = 0; i < persons.length; i++) {
        if (persons[i].name === newName) {
          id = i + 1
        }
      }
      replaceNumber(id, newName)
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
      .create(personObject)
      .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
          setFilter('')
          setPersonsShown(persons.concat(response.data))
      })
      setNotification(
        `'${newName}' Added`
      )
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const deletePerson = (id, name) => {
    if (window.confirm("Do you really want to delete '" + name + "' ?")) {
      personService
      .deletePerson(id)
      .then(response => {
        console.log(response)
        const p = persons.filter(item => item.id !== id)  
        setPersons(p)
        setPersonsShown(p)
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
    }
  }

  const replaceNumber = (id, name) => {
    if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
      const personObject = {
        name: name,
        number: newNumber,
      }

      personService
      .update(id, personObject)
        .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setPersonsShown(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
      .catch(error => {
        setNotification(
          `Error, '${name}' was already removed from server`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
    }
  }

  const handleNameChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewName(event.target.value)
  }


  const handleNumberChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  const handleFilterChange = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilter(event.target.value)

    setPersonsShown(persons.filter(person => person.name.toLowerCase().includes(event.target.value.toLowerCase())))
  

    console.log(personsShown)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Filter handleFilterChange={() => handleFilterChange} filter={filter}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={() => handleNameChange} newName={newName} addPerson={() => addPerson} newNumber={newNumber} handleNumberChange={() => handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers personsShown={personsShown} handleClick={(id, name) => deletePerson(id, name)}/>
    </div>
  )

}

export default App