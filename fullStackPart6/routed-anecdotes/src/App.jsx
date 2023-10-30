import {Alert, TextField, Table,
	 Paper, TableBody, TableCell, TableContainer, 
	 TableRow, AppBar, Toolbar, IconButton } from '@mui/material'
import { useState } from 'react'
import {Form, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router,
	Routes, Route, Link, useParams, useNavigate } from 'react-router-dom'

import { useField } from './hooks/index'

import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`
const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`
const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`
const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <a href='#' style={padding}>anecdotes</a>
      <a href='#' style={padding}>create new</a>
      <a href='#' style={padding}>about</a>
    </div>
  )
}

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('mluukkai')
    navigate('/')
  }

  return (
    <div>
      <h2>login</h2>
			<form onSubmit={onSubmit}>
			
        <div>
					username
          <Input label="" />
        </div>
        <div>
				password
          <Input type='password' />
        </div>
        <div>
          <Button type="submit">
            login
          </Button>
        </div>
   
        {/* <Form.Group>
          <Form.Label>username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button variant="primary" type="submit">
            login
          </Button>
        </Form.Group> */}
      </form>
    </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

/* const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
) */

const CreateNew = (props) => {
	const navigate = useNavigate()

	const content = useField('text')
	const author = useField('text')
	const info = useField('text')

  const handleSubmit = (e) => { 
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
		navigate('/')
  }

	const reset = () => {
		rCOntent()
		rAuthor()
		rInfo()
	}

	const {resetValue: rCOntent, ...rest1} = content
	const {resetValue: rAuthor, ...rest2} = author
	const {resetValue: rInfo, ...rest3} = info

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...rest1}/>
        </div>
        <div>
          author
          <input {...rest2} />
        </div>
        <div>
          url for more info
          <input {...rest3} />
        </div>
        <button>create</button>
      </form>
			<button onClick={reset}>reset</button>
    </div>
  )
}

function Anecdote({anecdotes}){
	const id = Number(useParams().id)
	const anecdote = anecdotes.find(a => a.id === id)

	return(
		<div>
			<span>{anecdote.content}</span>
			<span>{anecdote.author}</span>
		</div>
	)
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
		<TableContainer component={Paper}>
			<Table>
				<TableBody>
					{anecdotes.map(anecdote => 
						<TableRow key={anecdote.id}>
							<TableCell>
								<Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
							</TableCell>
						</TableRow>
					)}	
				</TableBody>
			</Table>
		</TableContainer>
  </div>
)

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
	const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`${anecdote.content} has been added.`)
		setTimeout(()=>{
			setNotification('')
		},5000)
  }

	const login = (user) => {
    setUser(user)
		setNotification(`welcome ${user}`)
		setTimeout(() =>{
			setNotification(null)
		}, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
		<Page>

			<h1>Software anecdotes</h1> 
		{/* 	<Menu /> */}
			{(notification && 
				<Alert severity="success"> 
					{notification}
				</Alert>
			)}
			
			<Router>

			<Navigation>        
				<Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">create</Link>
        <Link style={padding} to="/about">about</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </Navigation>

			{/* <AppBar position="static">
  <Toolbar>
    <IconButton edge="start" color="inherit" aria-label="menu">
    </IconButton>
    <Button color="inherit" component={Link} to='/'>
		 Anecdotes
    </Button>
    <Button color="inherit" component={Link} to='/create'>
			CreateNote
    </Button>
    <Button color="inherit"  component={Link} to='/about' >
			About
    </Button>  
    
      {user
        ? <em>{user} logged in</em>
        : <Button color="inherit"  component={Link} to='/login'>
					login
					</Button> 
      }        
  </Toolbar>
</AppBar> */}
				{/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
 			  	<Navbar.Toggle aria-controls="responsive-navbar-nav" />
  				<Navbar.Collapse id="responsive-navbar-nav">
    				<Nav className="me-auto">
     		  		<Nav.Link href="#" as="span">
        				<Link to={'/'}>Anecdotes</Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
							<Link style={{padding:5}} to={'/create'}>CreateNote </Link>
							</Nav.Link>
							<Nav.Link href="#" as="span">
								<Link style={{padding:5}} to={'/about'}>About</Link>
							</Nav.Link>
								<Nav.Link href="#" as="span">
								{user
								? <em >{user} logged in</em>
								: <Link style={{padding:5}} to={'/login'}>Login </Link>
								}
							</Nav.Link>
    				</Nav>
  </Navbar.Collapse>
</Navbar> */}
		
				<Routes>
					<Route path='/about' element={<About />} />	
					<Route path='/create' element={<CreateNew addNew={addNew}/>} />
					<Route path='/login' element={<Login onLogin={login}/>} />
					<Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
					<Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes}/>} />
				</Routes>

			</Router>
			<Footer>        
				<em>Note app, Department of Computer Science 2022</em>
      </Footer> 
		</Page>
    
  )
}

export default App
