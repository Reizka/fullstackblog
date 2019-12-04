const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');
const api = supertest(app);
const Blog = require('../models/blogPost');




beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(helper.initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[1]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[2]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[3]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[4]);
	await blogObject.save();

	blogObject = new Blog(helper.initialBlogs[5]);
	await blogObject.save();
});

test('blogs are returned as json', async () => {
	const response = await api.get('/api/notes');

	expect(response.body.lenghth).toBe(helper.initialBlogs.lenghth);
});

test('a specific blogpost is within the returned blogs', async () => {
	const response = await api.get('/api/blogposts');

	const contents = response.body.map(r => r.content);
	expect(contents).toContain(
		'Type wars'  );
});

test('a valid blogpost can be added ', async () => {
	const newBlogPost = {
		title: 'Test Mah Post o blog',
		author: 'Test M. An',
		url: 'www.blogMahblog.com',
		likes: 5
	};

	await api
		.post('/api/blogposts')
		.send(newBlogPost)
		.expect(200)
		.expect('Content-Type', /application\/json/);


	const blogsAtEnd = await helper.notesInDb();
	expect(blogsAtEnd.length).toBe(helper.initialNotes.length + 1);

	const contents = blogsAtEnd.map(n => n.content);
	expect(contents).toContain('Test Mah Post o blog'
	);
});

test('blogpost without content is not added', async () => {
	const newBlogPost = {
		title: 'wah wah waah'
	};

	await api
		.post('/api/blogposts')
		.send(newBlogPost)
		.expect(400);

	const blogsAtEnd = await helper.notesInDb();
	expect(blogsAtEnd.length).toBe(helper.initialNotes.length);
});

test('a blogpost can be deleted', async () => {
	const blogpostsAtStart = await helper.notesInDb();
	const blogpostsToDelete = blogpostsAtStart[0];

	await api
		.delete(`/api/blogposts/${blogpostsToDelete.id}`)    .expect(204);
	const blogsAtEnd = await helper.notesInDb();

	expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);

	const contents = blogsAtEnd.map(r => r.content);

	expect(contents).not.toContain(blogpostsToDelete.content);
});

test('a specific blogPost can be viewed', async () => {
	const blogpostsAtStart = await helper.notesInDb();

	const blogPostToView = blogpostsAtStart[0];

	const resultbp = await api
		.get(`/api/notes/${blogPostToView.id}`)    .expect(200)    .expect('Content-Type', /application\/json/);
	expect(resultbp.body).toEqual(blogPostToView);
});

afterAll(() => {
	mongoose.connection.close();
});