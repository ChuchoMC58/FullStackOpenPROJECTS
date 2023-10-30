const usersRoute = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRoute.post('/', async (req, res) => {
	const { name, username, password } = req.body
	
	if(!(username && password)){
		return res.status(400).json({
			error: 'username and password are required'
		})
	}else if(password.length < 3){
		return res.status(400).json({
			error: 'password has to be greater than 3'
		})
	}
	console.log(password)
	const saltRounds = 10;
	let encryptedPassw = null 
	try{
		 encryptedPassw = await bcrypt.hash(password, saltRounds);
	}catch(ex){
	console.log(ex)		
	}
	

	const newUser = new User({
		name: name,
		username: username,
		password: encryptedPassw
	})

	try{
		await newUser.save()
	}catch(ex){
		return res.status(400).json(ex.message)
	}
	
	res.status(201).json(newUser)
})

usersRoute.get('/', async (req, res) => {
	
	const users = await User.find({}).populate('blog', {user: 0})
	res.status(200).send(users)
})

module.exports = usersRoute
