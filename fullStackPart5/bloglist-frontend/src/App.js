import { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import loginForm from './components/loginForm'
import LoginForm from './components/loginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
	const [user, setUser] = useState(null)
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const [message, setMessage] = useState('')

	const blogRef = useRef()
	
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

	useEffect( () => {
		const jsonUser = window.localStorage.getItem('user')
		if(jsonUser){
			const user = JSON.parse(jsonUser)
			setUser(user)
			blogService.setToken(user.token)
		}
	}, [])

	function blogForm(){
		return(
			<Togglable ref={blogRef} buttonName='new note'>
				<BlogForm 
					handleBlog={handleBlog}
				/>
			</Togglable>
		)
	}

	async function handleBlog(blogObj){
		try{
			const blog = await blogService.createNote(blogObj)
			setBlogs(blogs.concat(blog))
			setMessage('New blog Added')
			blogRef.current.setVisible(false)
		}catch(exception){	
			setMessage(exception.message)	
		}finally{
			setTimeout(() => {
				setMessage('')
			},5000)
		}	
	}

	async function handleLogin(event){
		event.preventDefault()

		const credentials = { 
			username: username,
			password: password
		}

		try{
			const user = await loginService.loginUser(credentials)
			window.localStorage.setItem('user', JSON.stringify(user))
			blogService.setToken(user.token)
			setUser(user)
			setUsername('')
			setPassword('')
		}catch(exception){
			setMessage('Username or password invalid')
			setTimeout(() => {
				setMessage('')	
			}, 5000)
		}
	}

	const blogsComp = () => {
		return(
			<>
				<h2>Blogs</h2>
				<p> {user.username} is logged in</p>
				<button onClick={ () => {
					window.localStorage.removeItem('user') 
					window.location.reload()
				}}> 
					log out
				</button>
				<p>{message}</p>
				
			</>
		)
	}

	async function incLikeByOne(id,likes){
		if(likes === undefined){
			likes = 0
		}
		const newBlog = await blogService.incrementLike(id, {likes})
		const newBlogList = blogs.map(blog => blog.id !== id? blog: newBlog)
		setBlogs(newBlogList)
	}

	function sortByLikes(){
		const blogsSort = [].concat(blogs)
				.sort((b1, b2) => b2.likes - b1.likes)
		setBlogs(blogsSort)
	}

	async function deleteBlog(id){
		if(window.confirm('sure?')){
			try{
				await blogService.deleteBLog(id) 
				const blogDel = blogs.filter(blog => blog.id !== id)
				setBlogs(blogDel)
				
			}catch(error){
				console.error('blog error', error.message )
			}
		}else{
			console.log('ok')
		}
		
	}

  return (
    <div>
			
			{user === null && <LoginForm handleSubmit={handleLogin} handleUsernameChange={setUsername}
				handlePasswordChange={setPassword} username={username} password={password} message={message}/>}
			{user !== null && blogsComp()}
      {user !== null && blogForm()}
			{user !== null && <button onClick={sortByLikes}> Sort</button>}
			{user !== null && blogs.map(blog =>
					<Blog key={blog.id} blog={blog} incrLikeByOne={incLikeByOne} 
						delBlog={deleteBlog}/>
			)}
			
    </div>
  )
}

export default App