const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
const uniqueValidator = require('mongoose-unique-validator');

const blogPostSchema = mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	author: {
		type: String,
		required: true
	},
	url: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		default: 0
	},
	userId: {
		required: true,
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}
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