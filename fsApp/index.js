const express = require('express')
/* const morgan = require('morgan') */

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
    response.send(phonebook)
})

app.get('/info', (request, response) => {
    const date = new Date() 
    const bkLgth = phonebook.length
   response.send(
    `<p> ${date} Persons in the phonebook: ${bkLgth}</p>`
   )
}) 

app.get('/api/persons/:id', (request, response) => {
    const reqId = Number(request.params.id)
    //typeof to check the type of smth
    const pers = phonebook.find(p => p.id === reqId) 
    if(pers){
      return response.status(200).json(pers)
    }else{
      return response.status(404).json(
        {error: 'Person missing'}
      )
    }   
})

app.delete('/api/persons/:id', (req, res) =>{
  const reqId = Number(req.params.id)
  phonebook = phonebook.filter(p => p.id !== reqId)
  res.status(202).end()
})

app.post('/api/persons', (request, response) => {
  const bName = request.body.name
  const bNum = request.body.number

  if(!bName || !bNum){
    return response.status(404).json(
      {error: 'Content missing'}
    )
  }else if(equalsName(bName)){
    return response.status(404).json(
      {error: 'Name has to be unique'}
    )
  }

  const rand = Math.random() * 1000

  const newPers = {
    id: Math.floor(rand),
    name: bName,
    number: bNum
  }
  phonebook = phonebook.concat(newPers)

  response.status(200).json(newPers)
})

function equalsName(name){
  for (const pers of phonebook) {
    if(pers.name === name){
      return true
    }
  }
  return false
}

const unknownEndPoint = (request, response) => {
  response.status(404).json({
    error: 'Endpoint unknown'
  })
}
app.use(unknownEndPoint)

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