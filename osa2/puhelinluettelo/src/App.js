import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  var persons2;
  const [ personsShown, setPersonsShown ] = useState(persons)
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const addPerson = (event) => {
    event.preventDefault()
    console.log("adding person")

    if(persons.some(person => person.name === newName)) {
      window.alert(`${newName} is already added to phonebook`);
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      
      persons2 = persons.concat(personObject)
      setPersons(persons2)
      setPersonsShown(persons2)

      console.log(persons)
      setNewName('')
      setNewNumber('')
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
      <Filter handleFilterChange={() => handleFilterChange} filter={filter}/>
      <h2>add a new</h2>
      <PersonForm handleNameChange={() => handleNameChange} newName={newName} addPerson={() => addPerson} newNumber={newNumber} handleNumberChange={() => handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers personsShown={personsShown}/>
    </div>
  )

}

export default App