const Blog = require('../models/blog') 
const User = require('../models/user')
const testRouter = require('express').Router()

testRouter.post('/testing', async (req, res) => {
	await Blog.deleteMany({})
	await User.deleteMany({})
	
	res.status(204).end()
})

module.exports = testRouter