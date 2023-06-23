const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

loginRouter.post('/', async (req, res) => {
	const { username, password } = req.body;

	const user = await User.findOne({username})

  const hashPass = user === null 
		? false
		: await bcrypt.compare(password, user.password)

	if(!hashPass){
		console.log("password or user incorrect")
		return res.status(401).end()
	}

	const forToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign(forToken, process.env.SECRET, {expiresIn: 60 * 1})

	res.status(200).json({token, username: user.username,	name: user.name})
})

module.exports= loginRouter