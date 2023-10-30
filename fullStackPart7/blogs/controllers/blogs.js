const router = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const Comment = require('../models/comments')
const User = require('../models/user')

router.post('/:id/comments', async (req, res) =>{
	console.log(req.body)
	const {title} = req.body
	const blogId = req.params.id
	const newComment = new Comment({
		title: title,
		blog: blogId
	})
	const comment = await newComment.save()
	res.status(200).send(comment)
})

router.get('/:id/comments', async (req, res) => {
	const blogId = req.params.id
	const idString = blogId.toString()
	const comments = await Comment.find({blog: idString})
	res.status(200).send(comments)
})

router.get('/', (request, response) => {
  Blog
    .find({}).populate('user', {name: 1, username: 1})
    .then(blogs => {
      response.json(blogs)
    })
}) 

router.delete('/:id', async (req, res) => {
	/* if(!decodedToken){ 
		response
	} */ 
	
	const blogFromDB = await Blog.findById(req.params.id)
	
	if(!(req.user._id.toString() === blogFromDB.user.toString())){
		return res.status(401).json({
			error: 'intruder alert! intruder alert!'
		})
	}

	await Blog.findByIdAndRemove(req.params.id)
	
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
		likes: likes || 0,
		url: url || "somewhere.com"
	})

  const blog = await newblog.save()

	user.blog = user.blog.concat(blog._id)
	await user.save()

	Blog
    .find({title: blog.title}).populate('user', {name: 1, username: 1})
    .then(blog => {
      response.status(201).json(blog)
    })
})

router.put('/:id', async (req, res) => {
	const {likes} = req.body;  

	/* const body = req.body
	const updBlog = [...body, title: "updated"] */
	
	const updBlog = await Blog.findByIdAndUpdate(
			req.params.id,  
			{likes:  likes + 1},
			{new: true , runValidators: true, context: 'query'} )
			.populate('user', {username: 1})

	res.json(updBlog)

});

module.exports = router