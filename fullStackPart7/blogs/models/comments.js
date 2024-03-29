const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
	title: String,
	blog: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog'
	}
})

/* .set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
}); */

module.exports = mongoose.model('Comment', commentsSchema)