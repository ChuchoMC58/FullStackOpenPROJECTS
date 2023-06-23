const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', (request, response) => {
  Blog
    .find({}).populate('user', {name: 1, username: 1})
    .then(blogs => {
      response.json(blogs)
    })
}) 

router.delete('/', async (req, res) => {
	const decodedToken = jwt.verify(req.token, process.env.SECRET);
	/* if(!decodedToken){ 
		response
	} */ 
	const blogFromDB = await Blog.findById(req.body.id)

	if(!(decodedToken.id === blogFromDB.user.toString())){
		return res.status(401).json({
			error: 'intruder alert! intruder alert!'
		})
	}

	await Blog.findByIdAndRemove(req.body.id)
	
	res.status(204).end()
})

router.post('/', async (request, response) => {
	const { title, author, url, likes } = request.body
	
	const user = request.user

	if(!user) {
		return response.status(400).json({
			error: 'user not found'
		})
	} 

  const newblog = new Blog({
		title: title,
		author: author,
		user: user._id,  
		likes: likes,
		url: url || "somewhere.com"
	})

  const blog = await newblog.save()

	user.blog = user.blog.concat(blog._id)
	await user.save()

	response.status(201).json(blog)
})

module.exports = router