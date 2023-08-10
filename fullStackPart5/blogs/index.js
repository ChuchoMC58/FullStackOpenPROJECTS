const express = require('express')
const app = express()
require('dotenv').config()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')

const blogsROute = require('./controllers/blogs')
const usersRoute = require('./controllers/users')
const loginROute = require('./controllers/login')
const middleWare = require('./utils/middleware')
const forTesting = require('./controllers/forTesting')

mongoose
	.connect('mongodb+srv://ChuchoMC:aXh87yd5k2M8nqO8@cluster0.y0dmeek.mongodb.net/blog?retryWrites=true&w=majority')
	.then( () => {
		console.log('connected to mongodb');
	})
	.catch( (error) => {
		console.log('error connecting to mongodb', error.message);
	});

app.use(cors())
app.use(express.json())

app.use('/api/blogs',middleWare.userExtractor, blogsROute)
app.use('/api/users', usersRoute)
app.use('/api/login', loginROute)

if(process.env.NODE_ENV === 'test'){
	app.use('/api', forTesting)
}

app.use(middleWare.errorHandler)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = app