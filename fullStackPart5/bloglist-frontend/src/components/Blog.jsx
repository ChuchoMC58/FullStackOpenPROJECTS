import { useState } from "react"

const Blog = ({blog, incrLikeByOne, delBlog}) => {
	const [show, setShow] = useState(false)
	console.log(blog)
	const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  } 
	if(show){
		return ( 
			<div style={blogStyle} >
				<p data-cy='title'> Title: {blog.title} </p> 
				<p>Author: {blog.author}</p> 
				<button onClick={()=>setShow(false)}>show less</button>
				<p> Likes: {blog.likes} </p>
				<button className="likeButton" onClick={()=>incrLikeByOne(blog.id, blog.likes)}> like</button>
				<p> Url: {blog.url} </p>
				{/* <p> CreatedBy: {blog.user.username} </p> */}
				<button onClick={()=>delBlog(blog.id)}> Delete</button>
			</div> 
		)
	} else{
		return ( 
			<div style={blogStyle} className='blog'>
				<p>{blog.title}</p>
				 <p>{blog.author}</p>
				<button onClick={()=>setShow(true)}> show more</button>
			</div> 
		)
	}
}

export default Blog