import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import loginForm from './components/loginForm'
import LoginForm from './components/loginForm'
import Notification from './components/Notification'
import { setNoti } from './reducers/notiReducer'
import { setBlogs, addBlog } from './reducers/blogReducer'
import { setUser, setUsers } from './reducers/userReducer'



const App = () => {
  const dispatch = useDispatch()
	const blogs = useSelector(state => state.blogs)
	const user = useSelector(state => state.user)
	 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const blogRef = useRef()

  useEffect(() => {
	
    blogService.getAll().then((blogs) => {
			dispatch(setBlogs(blogs)) 
		})
  }, [])

	useEffect(() => {
	
  }, [])

  useEffect(() => {	
		blogService.getUsers().then((users) => {
			
			dispatch(setUsers(users))
		})
		
    const jsonUser = window.localStorage.getItem('user')
		
    if (jsonUser) {
      const user = JSON.parse(jsonUser)
      dispatch(setUser(user)) 
      blogService.setToken(user.token)
    }
  }, [])

  function blogForm() {
    return (
      <Togglable ref={blogRef} buttonName="new note">
        <BlogForm handleBlog={handleBlog} />
      </Togglable>
    )
  }

  async function handleBlog(blogObj) { 
    try {
      const blog = await blogService.createNote(blogObj)
			
      dispatch(addBlog(blog[0]))
      setMessage('New blog Added')
      blogRef.current.setVisible(false)
    } catch (exception) {
      setMessage(exception.message)
    } finally {
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  async function handleLogin(event) {
    event.preventDefault()

    const credentials = {
      username: username,
      password: password,
    }

    try {
      const user = await loginService.loginUser(credentials)
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      dispatch(setUser(user)) 
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('Username or password invalid')
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  async function incLikeByOne(id, likes) {
    if (likes === undefined) {
      likes = 0
    }
    const newBlog = await blogService.incrementLike(id, { likes })
		
    const newBlogList = blogs.map((blog) => (blog.id !== newBlog.id ? blog : newBlog))
    dispatch(setBlogs(newBlogList))
  }

  function sortByLikes() {
    const blogsSort = [].concat(blogs).sort((b1, b2) => b2.likes - b1.likes)
    setBlogs(blogsSort)
  }

  async function deleteBlog(id) {
    if (window.confirm('sure?')) {
      try {
        await blogService.deleteBLog(id)
        const blogDel = blogs.filter((blog) => blog.id !== id)
        dispatch(setBlogs(blogDel))
      } catch (error) {
        console.error('blog error', error.message)
      }
    } else {
      console.log('ok')
    }
  }

	const UserComp = () => {
    return (
      <>
        <h2>Blogs</h2>
        <p> {user.user.username} is logged in</p>
        <button
          onClick={() => {
            window.localStorage.removeItem('user')
            window.location.reload()
          }}
        >	
          log out
        </button>
        <p>{message}</p>
      </>
    )
  }

	function User(){
		return(
			<TableContainer component={Paper}>
				<Table  sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Users</TableCell>
							<TableCell >Blogs Created</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{user.users.map(user => (
							<TableRow key={user.id}>
								<TableCell ><Link to={`/${user.id}`}> {user.username}</Link></TableCell>
								<TableCell> {user.blog.length}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>			
			</TableContainer>
		)
	}

	function Home(){
		if(!user.users){
			return(
				<div>Loading....</div>
			)
		} 
		
		return(
			<div>
				<UserComp />
				<User />
			</div>
		)
	}

	function Blogs({users}){
		if(!users){
			return null
		}
		const id = useParams().userId
		const blogsShow = blogs.filter(blog => blog.user.id === id)
		//const blogs = user.blog

		return(
			<>
				<h2>BLogs</h2>
				<div>
					{blogsShow.map((blog) => 
						<Link key={blog.id} 
							to={`/blogs/${blog.id}`}
							state={{ blog: blog}}
							style={{display:'block'}}
						>
								{blog.title}
						</Link>
					)}
				</div>
			</>	
		)
	}

  return (
    <div>
			<Router>
				<AppBar position="static"> 
					<Container maxWidth="xl"> 
						<Toolbar disableGutters> 			
							<Typography
								variant="h6"
								noWrap
								component="a"
								href="#app-bar-with-responsive-menu"
								sx={{
									mr: 2,
									display: 'flex',
									fontFamily: 'monospace',
									fontWeight: 700,
									letterSpacing: '.3rem',
									color: 'inherit',
									textDecoration: 'none',
								}}
							>
								LOGO
							</Typography>
						
							<Button component={Link} to={'/'}  variant="contained">Home</Button>
							<Button component={Link} to={'/blogs'} color="secondary" variant="contained">Blogs</Button>
				
						</Toolbar>
					</Container>
				</AppBar>
				<Routes> 
					<Route path='/' element={<Home />} />
					<Route path='/:userId' element={<Blogs users={user.users} />} />
					<Route path='/blogs/:id' element={<Blog incrLikeByOne={incLikeByOne} delBlog={deleteBlog}/>} />
				</Routes> 
			</Router> 
      {/* {user === null && (
        <LoginForm
          handleSubmit={handleLogin}
          handleUsernameChange={setUsername}
          handlePasswordChange={setPassword}
          username={username}
          password={password}
          message={message}
        />
      )}
 */}
      {/* {user !== null && blogsComp()} */}
      {/* {user !== null && <Notification />}
      {user !== null && blogForm()}
      {user !== null && <button onClick={sortByLikes}> Sort</button>} */}
        
    </div>
  )
}

export default App
