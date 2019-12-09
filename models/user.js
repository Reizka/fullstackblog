const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20
	},
	passwordHash: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 20,
		unique: true
	},
	blogposts: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'BlogPost'
	}]

});


userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
		// the passwordHash should not be revealed
		delete returnedObject.passwordHash;
	}
});

module.exports = mongoose.model('User', userSchema);