const express = require('express')
const app = express()
var morgan = require('morgan')
const cors = require('cors')
app.use(cors())

app.use(express.json())

morgan.token('body', req => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/info', (request, response) => {
  const size = persons.length
  const date = new Date()
  const message = `<p>Phonebook has info for ${size} people</p><p>${date}</p> `
  response.send(message)
})

app.get('/api/persons', (request, response) => {
  if (persons) {
    response.json(persons)
  } else {
    response.status(404).end()
  }
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
  const randomId = Math.floor(Math.random() * 1000000)
  const person = request.body
  person.id = randomId
  // console.log(person)
  let addPerson = true
  for (const p of persons) {
    // console.log(p);
    if (p.name === person.name)
    {
      const message = `${p.name} is already added to phonebook`
      addPerson = false
      break
    }
  }
  if ((person.name === "") || (person.number === ""))
  {
    response.status(406).json({ error: 'name and/or number must not be null' })
  }
  else if (!addPerson)
  {
    response.status(400).json({ error: 'name must be unique' })
  }
  else
  {
    persons = persons.concat(person)
    response.json(person)
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})