const supertest = require('supertest')
const bcrypt = require('bcrypt')

const app = require('../index')
const User = require('../models/user')
const blog = require('../models/blog')

const api = supertest(app)

const users = [
	{
		name: "otto",
		username:"violin",
		password: "dub"
	},
	{
		name: "lol",
		username:"yolo",
		password: "Wassa"
	}	
]

/* beforeEach( async () => {
	await User.deleteMany({})
	console.log("starting for each")
	const userObjs = users.map( async (user) => {
		let hashPass = await bcrypt.hash(user.password, 10);
		return new User({
			name: user.name,
			username: user.username,
			password: hashPass
		})
	})

	const promiseArr = userObjs.map( userObj => userObj.save())
	Promise.all(promiseArr)
	
	console.log("finished beforeEach")
}) */

test('adding a user', async () => {
	console.log("entered first test")
	const users = await User.find({})
	console.log(users)

})