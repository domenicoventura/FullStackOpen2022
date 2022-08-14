require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
  Person.find({})
    .then(persons => {
      const size = persons.length
      const date = new Date()
      const message = `<p>Phonebook has info for ${size} people</p><p>${date}</p> `
      response.send(message)
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(persons => {
      if (persons) {
        return response.json(persons)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
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
    .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      // console.log(result)
      response.status(204).end()
    })
    .catch(error => next(error))
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

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // console.log(body)
  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  let addPerson = true
  Person.find({})
    .then(persons => {
      for (const p of persons) {
        // console.log(p);
        if (p.name === body.name)
        {
          const message = `${p.name} is already added to phonebook`
          addPerson = false
          break
        }
      }
      if ((body.name === "") || (body.number === ""))
      {
        return response.status(406).json({ error: 'name and/or number must not be null' })
      }
      else if (!addPerson)
      {
        return response.status(400).json({ error: 'name must be unique' })
      }
      else
      {
        const person = new Person({
          name: body.name,
          number: body.number,
        })
      
        return person.save()
      }
    })
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}
// this has to be the last loaded middleware.
app.use(errorHandler)