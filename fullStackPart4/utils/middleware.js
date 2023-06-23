const User = require('../models/user')
const jwt = require('jsonwebtoken')

async function userExtractor (req, res, next) {
	const authorization = req.get('Authorization')
	if(authorization && authorization.startsWith('Bearer ')){
		const token = authorization.replace('Bearer ', '');
		const decodedToken = jwt.verify(token, process.env.SECRET);
		req.user = await User.findById(decodedToken.id)
	}
	
	next()
}

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  } else if (error.name === 'TokenExpiredError') {
		  return response.status(401).json({      error: 'token expired'    })  
	}
  next(error)
}

module.exports = {
	userExtractor,
	errorHandler
}