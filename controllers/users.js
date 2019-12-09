const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.post('/', async (request, response, next) => {
	try {
		const body = request.body;
		console.log(body);
		const saltRounds = 10;
		const passwordHash = await bcrypt.hash(body.password, saltRounds);

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash,
		});

		const savedUser = await user.save();

		response.json(savedUser);
	} catch (exception) {
		response.status(400).json(exception);
		next(exception);
	}
});

usersRouter.get('/', async (request, response, next) => {
	try {
		console.log('STARTED');
		const users = await User.find({}).populate('blogposts');
		console.log('RECEIVED', users);
		response.json(users.map(u => u.toJSON()));
	} catch (error) {
		next(error);
	}

});

module.exports = usersRouter;