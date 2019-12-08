const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blogPost');
const Log = require('../utils/logger');



describe('when there is initially some blogs saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({});
		//await Blog.insertMany(helper.initialBlogs);
		/* Leaving this here for myself
			helper.initialBlogs.forEach(async (blog) => {
				let blogObject = new Blog(blog);
				await blogObject.save();
				console.log('saved');
			});
			console.log('test setup done -- starting tests');*/

		const blogObjects = helper.initialBlogs.map(blog => new Blog(blog));
		const promiseArray = blogObjects.map(blog => blog.save());
		await Promise.all(promiseArray);
	});

	test('blogs are returned as json', async () => {
		const response = await api.get('/api/blogposts');
		//console.log(response.body);
		expect(response.body.lenghth).toBe(helper.initialBlogs.lenghth);
	});

	test('a specific blogpost title is within the returned blogs', async () => {
		const response = await api.get('/api/blogposts');
		//console.log(response.body);
		const contents = response.body.map(r => r.title);
		//console.log('2ND: ', contents);
		expect(contents).toContain('Type wars');
	});
});
describe('Viewing a specific blog', () => {
	test('a specific blogPost can be viewed', async () => {
		const blogpostsAtStart = await helper.blogPostsInDb();

		const blogPostToView = blogpostsAtStart[0];

		const resultbp = await api
			.get(`/api/blogposts/${blogPostToView.id}`).expect(200).expect('Content-Type', /application\/json/);
		expect(resultbp.body).toEqual(blogPostToView);
	});

	test('returned object uses id instead of _id', async () => {
		const blogs = await helper.blogPostsInDb();
		const blog = blogs[0];
		expect(blog.id).not.toBe(blog._id);
	});
});

describe('Deletings Blogs', () => {
	test('a blogpost can be deleted', async () => {
		const blogpostsAtStart = await helper.blogPostsInDb();
		const blogpostsToDelete = blogpostsAtStart[0];

		await api
			.delete(`/api/blogposts/${blogpostsToDelete.id}`).expect(204);

		const blogsAtEnd = await helper.blogPostsInDb();

		expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

		const contents = blogsAtEnd.map(r => r.title);

		expect(contents).not.toContain(blogpostsToDelete.title);
	});
});

describe('Adding Blogs', () => {

	test('blogpost without content is not added', async () => {
		const newBlogPost = {
			title: 'wah wah waah'
		};

		const blogsAtStart = await helper.blogPostsInDb();
		await api
			.post('/api/blogposts')
			.send(newBlogPost)
			.expect(400);

		const blogsAtEnd = await helper.blogPostsInDb();
		expect(blogsAtEnd.length).toBe(blogsAtStart.length);
	});

	test('likes has value 0 if not defined', async () => {
		const newBlog = {
			title: 'DOOM',
			author: 'DOO, M',
			url: 'http://www.doom.com',
		};
		const result = await api
			.post('/api/blogposts')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/);
		console.log(result.body);
		expect(result.body.likes).toBeDefined();
	});

	test('a valid blogpost can be added ', async () => {
		const newBlogPost = {
			title: 'Test Mah Post o blog2',
			author: 'Test M. An',
			url: 'www.blogMahblog.com',
			likes: 5
		};

		await api
			.post('/api/blogposts')
			.send(newBlogPost)
			.expect(201)
			.expect('Content-Type', /application\/json/);


		const blogsAtEnd = await api.get('/api/blogposts');
		expect(blogsAtEnd.body.length).toBe(helper.initialBlogs.length + 1);

		const contents = blogsAtEnd.body.map(n => n.title);
		//console.log(contents);
		expect(contents).toContain('Test Mah Post o blog2');
	});
});

describe('updating blogs', () => {

	test('updating number of likes', async () => {
		const blogs = await helper.blogPostsInDb();
		let blog = blogs[0];
		blog.likes = 2000;
		const newBlog = await api
			.put(`/api/blogposts/${blog.id}`)
			.send(blog)
			.expect(200);

		expect(newBlog.body.likes).toBe(2000);
	});
});

describe('Finished testing, doing post handling', () => {
	afterAll(async () => {
		mongoose.connection.close();
	});
});