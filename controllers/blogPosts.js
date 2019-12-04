const blogPostRouter = require('express').Router();
const BlogPost = require('../models/blogPost');

blogPostRouter.get('/', async (request, response,next) => {
	console.log('getting all posted blogs');
	try {
		const blogs = await BlogPost.find({});
		response.json(blogs);
	} catch (error) {
		next(error);
	}

});

blogPostRouter.get('/:id', async (request,response,next) => {
	try {
		const blog = await BlogPost.find(request.id);
		response.json(blog);
	} catch (error) {
		next(error);
	}
});

blogPostRouter.post('/', async (request, response,next) => {
	const blog = new BlogPost(request.body);
	console.log('saving current blog post: ',blog ,typeof blog);
	try {
		const newBlog = await blog.save();
		response.status(201).json(newBlog);
	} catch (error) {
		next(error);
	}
});

blogPostRouter.delete('/:id', async(request,response,next) => {
	try {
		await BlogPost.delete(request.id);
		response.status(204);
	} catch (error) {
		next(error);
	}
});

module.exports = blogPostRouter;