const dummy = (blogs) => {

	return 1;
};

const totalLikes = (blogPosts) => {
	let likes = 0;
	return blogPosts.map((blogpost) => {
		return likes += blogpost.likes;

	});
};

module.exports = {
	dummy
};