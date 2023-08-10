const supertest = require('supertest')

const app = require('../index')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
	{
		title: "Using Jest",
		author: "Me",
		likes: 10
	},
	{
		title: "Learning WebDev",
		author: "Open",
		likes: 20
	}
]

beforeEach( async () => {
	await Blog.deleteMany({})

	/* blogs.forEach(blog => {
		let blogtoSave = new Blog(blog)
		blogtoSave.save()
	}) */
})

test('check if user appears in blog', async () => {
	const blog = await api
		.post('/api/blogs')
		.send(blogs[1])
		.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkNodWNob01DIiwiaWQiOiI2NDg1MjYzN2ExOWRhYzFhNzg4ODQ0N2IiLCJpYXQiOjE2ODY0NTA3NTEsImV4cCI6MTY4NjQ1MDgxMX0.A1K5eQCAaOF4cKku_Z9Q8ArD2HfKzIFiMdV1P35IlYc')
		.expect(201)

	console.log(blog)
}, 100000)