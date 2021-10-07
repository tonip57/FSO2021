const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
morgan.token('type', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    name: "Mary Poppendick",
    number: "39-23-6423122"
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/info', (req, res) => {
  var today = new Date();
  var x = persons.length
  res.send('<p>Phonebook has info for ' + x + ' people</p>' + '<p>' + today + '</p>')
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
   const name = request.body.name
   const number = request.body.number
   
   if (persons.some(person => person.name === name)) {
    return response.status(403).json({ error: 'name already exists' })
    
   } else if (name != "" && number != "" && name != undefined && number != undefined) {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id)) 
        : 0
    const person = request.body
    person.id = maxId + 1
    persons = persons.concat(person)
    return response.status(200).json(person)
    
  } else if(name == "" || name == undefined) {
    return response.status(400).json({ error: 'name cannot be empty or undefined' })
    
  } else if(number == "" || number == undefined) {
    return response.status(400).json({ error: 'number cannot be empty or undefined' })
    
  } else {
    return response.status(400).json({ error: 'cannot add person to the list' })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})