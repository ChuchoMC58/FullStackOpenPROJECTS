import { useState } from "react"

const BlogForm = ({ handleBlog }) => {
	
	const [title, setTitle] = useState('')
	const [author, setAuthor] = useState('')
	
	const addBlog = (event) => {
		event.preventDefault()

		handleBlog(
			{ 
				title: title,
				author: author
			}
		)

		setTitle('')
		setAuthor('')
	}

	return(
	<>
		<form onSubmit={addBlog} className='form'>
				<h2> Add BLogs </h2>
				<div>
					title: 
					<input 
					data-cy="title"
					name='title'
					value={title}
					onChange={({target}) => setTitle(target.value)}
					/>
				</div>
				
				<div>
					author: 
					<input 
					data-cy="author"
					name='author'
					value={author}
					placeholder='placeholder'
					onChange={({target}) => setAuthor(target.value)}
					/>
				</div>
				
				<button type='submit'> Save </button>
		</form>
	</>	
	)
}

export default BlogForm