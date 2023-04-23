const express = require('express')
require('dotenv').config()
/* const morgan = require('morgan') */
const Person = require('./models/person')
const app = express()

app.use(express.json())
app.use(express.static('build')) 

/* morgan.token('token', (req) =>{
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :response-time :token')) */
/* const requestLogger = (request, response, next) => {
  console.log('Method', request.method)
  console.log('Path', request.path)
  console.log('Body: ', request.body) 
  console.log('---')
  next()
}
app.use(requestLogger) */

app.get('/api/persons', (request, response) => {
    Person.find({})
      .then(people =>{
        response.json(people);
      });
});

app.get('/info', (request, response) => {
    const date = new Date() 
    Person.find({}) 
      .then(persons => {
        response.send(
          `<p> ${date} Persons in the phonebook: ${persons.length}</p>`
        )
      }) 
}) 

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(pers => {
      response.status(200).json(pers);
    })
    .catch(err => response.status(400).send({error: 'BadRequest'}));
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;

  const newPers = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(request.params.id, newPers, {new: true})
    .then(UpdtPers => {
      response.status(200).json(UpdtPers)
    })
    .catch(err => next(err))
})

app.post('/api/persons', (request, response) => {
  const bName = request.body.name
  const bNum = request.body.number

  if(!bName || !bNum){
    return response.status(404).json(
      {error: 'Content missing'}
    )
  }

  const newPers = new Person({
    name: bName, 
    number: bNum
  })

  newPers.save() 
    .then(pers=> {
      response.status(200).json(pers)
    })
    .catch(err => { 
      response.status(400).json({error: err})
    })
})

app.delete('/api/persons/:id', (req, res, next) =>{
  Person.findByIdAndDelete(req.params.id)
    .then(result => {
      res.status(204).end()
    }) 
    .catch(err => next(err))
})

const unknownEndPoint = (request, response) => {
  response.status(404).json({
    error: 'Endpoint unknown'
  })
}
app.use(unknownEndPoint)

function errorHandler (err, req, res, next) {
  if(err.name === 'CastError'){
    res.status(400).send({error: 'badRequest'})
  }
  
  next(err)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`running in port: ${PORT}...`)
})

let phonebook = [
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