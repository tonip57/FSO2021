require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('type', function (req) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :type'))


app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    if (persons) {
      response.json(persons)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})


app.get('/info', (req, res, next) => {
  var today = new Date()
  Person.find({}).then(persons => {
    if (persons) {
      res.send('<p>Phonebook has info for ' + persons.length + ' people</p>' + '<p>' + today + '</p>')
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})


app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})


app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
})


app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.post('/api/persons', (request, response, next) => {

  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => {
    next(error)
  })
})


const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  console.log(error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})