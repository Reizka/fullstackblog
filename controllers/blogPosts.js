const blogPostRouter = require('express').Router();
const BlogPost = require('../models/blogPost');
const Log = require('../utils/logger');
const User = require('../models/user');
const jwt = require('jsonwebtoken');



blogPostRouter.get('/', async (request, response, next) => {
	//console.log('getting all posted blogs');
	try {

		const blogs = await BlogPost.find({}).populate('userId', {
			username: 1,
			name: 1
		});
		response.json(blogs);
	} catch (error) {
		next(error);
	}

});

blogPostRouter.get('/:id', async (request, response, next) => {
	try {
		//console.log('SEARCHING');
		const blog = await BlogPost.findById(request.params.id);
		response.json(blog);
	} catch (error) {
		next(error);
	}
});

blogPostRouter.post('/', async (request, response, next) => {
	const body = request.body;
	console.log(request.token);
	try {
		const decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!request.token || !decodedToken.id) {
			return response.status(401).json({
				error: 'token missing or invalid'
			});
		}

		const user = await User.findById(decodedToken.id);

		const blog = new BlogPost({
			title: body.title,
			url: body.url,
			author: user.username,
			userId: user._id
		});
		Log.info('saving current blog post: ', blog, typeof blog);
		const savedBlog = await blog.save();

		user.blogposts = user.blogposts.concat(savedBlog._id);
		await user.save();

		response.status(201).json(savedBlog.toJSON());
	} catch (error) {
		next(error);
		response.status(400);
	}

});

blogPostRouter.put('/:id', async (request, response, next) => {
	console.log('update request received', request.body);
	console.log(request.params.id);
	const blog = {
		title: request.body.title,
		author: request.body.author,
		likes: request.body.likes
	};

	try {
		const uBlog = await BlogPost.findByIdAndUpdate(request.params.id,
			blog, {
				new: true
			});
		response.status(200).json(uBlog);
	} catch (error) {
		next(error);
	}

});
blogPostRouter.delete('/:id', async (request, response, next) => {
	try {
		Log.info('DELETE REQUEST');
		const decodedToken = jwt.verify(request.token, process.env.SECRET);

		if (!request.token || !decodedToken.id) {
			return response.status(401).json({
				error: 'token missing or invalid'
			});
		}


		const user = await User.findById(decodedToken.id);

		const blogToDelete = await BlogPost.findById(request.params.id);
		Log.info(blogToDelete.userId.toString());
		Log.info(user.id);
		if (blogToDelete.userId.toString() === user.id) {
			Log.info('deleting blog');
			await BlogPost.findByIdAndRemove(request.params.id);
			response.status(204).end();
		} else {
			return response.status(401).json({
				error: 'No priviliges to delete this blog'
			});
		}



	} catch (error) {
		next(error);
	}
});

module.exports = blogPostRouter;