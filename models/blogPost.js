
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
const uniqueValidator = require('mongoose-unique-validator');

const blogPostSchema = mongoose.Schema({
	title: String,
	author: String,
	url: String,
	likes: Number
});


blogPostSchema.plugin(uniqueValidator);

blogPostSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('BlogPost', blogPostSchema);