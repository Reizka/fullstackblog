const blogPostRouter = require('express').Router();
const BlogPost = require('../models/blogPost');
const Log = require('../utils/logger');
blogPostRouter.get('/', async (request, response, next) => {
	//console.log('getting all posted blogs');
	try {
		const blogs = await BlogPost.find({});
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
	const blog = new BlogPost(request.body);
	Log.info('saving current blog post: ', blog, typeof blog);
	try {
		console.log('ADDING: ', blog);
		const newBlog = await blog.save();
		response.status(201).json(newBlog);
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
		//const blogToDelete = new BlogPost(request.body);
		//console.log(request.params.id);
		await BlogPost.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

module.exports = blogPostRouter;