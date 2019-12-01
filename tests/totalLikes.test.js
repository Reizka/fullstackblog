const listHelper = require('../utils/list_helper');
describe('total likes tests ', () => {

	test('total likes', () => {
		const listWithOneBlog = [{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 5,
			__v: 0
		}];


		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(5);

	});


	test('total zero likes', () => {
		const listWithOneBlog = [{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 0,
			__v: 0
		}];


		const result = listHelper.totalLikes(listWithOneBlog);
		expect(result).toBe(0);

	});


	test('total likes of 2 Blog Posts', () => {
		const listWithTwoBlog = [{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
			likes: 1,
			__v: 0
		}, {
			_id: '5a4g23445235235',
			title: 'Begun the Clonewars have',
			author: 'Yoda',
			url: 'http://www.yoda.com',
			likes: 100,
			__v: 0
		}, ];


		const result = listHelper.totalLikes(listWithTwoBlog);
		expect(result).toBe(101);

	});
});