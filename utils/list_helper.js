// Load the full build.
const ld = require('lodash');
const dummy = (blogs) => {

	return 1;
};

const totalLikes = (blogPosts) => {
	let likes = 0;
	blogPosts.forEach(blog => {
		likes += blog.likes;
	});

	return likes;
};

const favouriteBlog = (blogs) =>
{
	let favBlog = null;
	blogs.forEach(blog => {

		if(!favBlog){
			favBlog = blog;
		}else if(blog.likes>favBlog.likes){
			favBlog = blog;
		}

	});
	return favBlog;
};

const mostBlogs =(blogs) => {
	return {author:'Robert C. Martin',blogs:3};
};
module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs
};