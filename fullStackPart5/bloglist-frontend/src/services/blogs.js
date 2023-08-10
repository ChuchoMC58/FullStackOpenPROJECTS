import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const createNote = async (blog) => {
	const config = {
		headers: {Authorization: token}
	}
	
	const response = await axios.post(baseUrl, blog, config)
	return response.data
}

const deleteBLog = async (id) => {
	const config = {
		headers: {Authorization: token}
	}
	const url = `${baseUrl}/${id}`
	try{
		await axios.delete(url,config)
	}catch(error){
		if(error.response){ 
			console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
			throw error
		}
		else if (error.request) {
			// The request was made but no response was received
			// `error.request` is an instance of XMLHttpRequest in the 
			// browser and an instance of
			// http.ClientRequest in node.js
			console.log(error.request);
	} else {
			// Something happened in setting up the request that triggered an Error
			console.log('Error', error.message);
	}
		console.log(error.config);
	}
}

const incrementLike = async (id, likes) => {
	const url = `${baseUrl}/${id}`
	const response = await axios.put(url, likes)

	return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, createNote, incrementLike, deleteBLog}