import { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import blogService from '../services/blogs'

const Blog = ({ incrLikeByOne, delBlog }) => {
	const [comments, setComments] = useState([])
	const [title, setTitle] = useState('')

  const blogs = useSelector((state) => state.blogs)

  const location = useLocation()
  const { blog } = location.state

  const newBlog = blogs.find((blogF) => blogF.id === blog.id)

	useEffect(() => {
		blogService.getComments(newBlog.id).
			then(res => {
				setComments(res)
			})
	},[])

	async function addComment(event){
		event.preventDefault()
		const newComment = await blogService.addComment(newBlog.id,{
			title: title,
		})
		setComments(comments.concat(newComment))
	}

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
	console.log(blogs)
	return (
		<div style={blogStyle}>
			<p data-cy="title"> Title: {newBlog.title} </p>
			<p>Author: {newBlog.author}</p>

			<p> Likes: {newBlog.likes} </p>
			<button
				className="likeButton"
				onClick={() => incrLikeByOne(newBlog.id, newBlog.likes)}
			>
				{' '}
				like
			</button>
			<p> Url: {newBlog.url} </p>
			{/* <p> CreatedBy: {blog.user.username} </p> */}
			<button onClick={() => delBlog(newBlog.id)}> Delete</button>

			<h2>COmments below </h2>
			<form onSubmit={addComment} >
				<input 
					onChange={event => setTitle(event.target.value)}
				/>
				<button type='submit'>add comment</button>
			</form>
			{comments.map(c => 
				<p key={c._id} style={{marginLeft: 20}}> {c.title}</p>
			)}
		</div>
	)
}

export default Blog
