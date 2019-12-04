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

	let authorOfMostBlogs = 'none';
	let currentHighNo = 0;
	blogs.forEach(blog => {
		let author = blog.author;
		let noOfBlogs = 0;
		blogs.forEach((b) => {
			if(b.author === author){
				noOfBlogs++;
			}

			if(noOfBlogs>currentHighNo){
				currentHighNo = noOfBlogs;
				authorOfMostBlogs = author;
			}
		});

	});
	return {author: authorOfMostBlogs,blogs:currentHighNo};
};

const mostLikes = (blogs) => {
	let authorOfMostlikes = 'none';
	let currentHighNo = 0;
	blogs.forEach(blog => {
		let author = blog.author;
		let noOfLikes = 0;
		blogs.forEach((b) => {
			if(b.author === author){
				noOfLikes += b.likes;
			}

			if(noOfLikes>currentHighNo){
				currentHighNo = noOfLikes;
				authorOfMostlikes = author;
			}
		});

	});

	return {author: authorOfMostlikes,likes:currentHighNo};
};
module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes
};