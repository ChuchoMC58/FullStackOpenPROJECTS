const mongoose = require('mongoose');

const url = process.env.MONGO_DB;

mongoose.set('strictQuery',false);
mongoose.connect(url);

const persSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		validate: {
			validator: function(v) {
				return /^\d{2,3}-\d{6,}/.test(v);
			},
			message: props => `${props.value} is not a valid phone number!`
		},
		minlength: 8,
		required: true
	}
});

persSchema.set('toJSON',
	{ transform: (document, retDoc) => {
		retDoc.id = retDoc._id.toString();
		delete retDoc._id;
		delete retDoc.__v;
	} }
);

module.exports = mongoose.model('Person', persSchema);
