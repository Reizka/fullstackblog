const blogPostRouter = require('express').Router();
const BlogPost = require('../models/blogPost');

blogPostRouter.get('/', (request, response,next) => {
	console.log('getting all posted blogs');
	BlogPost
		.find({})
		.then(blogs => {
			response.json(blogs);
		}).catch( function(error){
			next(error);
		});
});

blogPostRouter.post('/', (request, response,next) => {
	const blog = new BlogPost(request.body);
	console.log('saving current blog post: ',blog ,typeof blog);
	blog
		.save()
		.then(result => {
			response.status(201).json(result);
		}).catch( function(error){
			next(error);
		});
});

module.exports = blogPostRouter;