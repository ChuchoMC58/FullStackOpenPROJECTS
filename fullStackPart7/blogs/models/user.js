const mongoose = require('mongoose')
const validator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  name: String,
	username: {
		type: String,
		required: true,
		minLength: 3,
		unique: true
	},
	password: String,
	blog: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		},
	]
})

userSchema.plugin(validator)

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		delete returnedObject.password;
	}
});

module.exports = mongoose.model('User', userSchema)