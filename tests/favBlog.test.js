const listHelper = require('../utils/list_helper');

describe('favourite blog tests', () => {

	test('yoda has more likes', () => {
		const blogs = [{
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

		const result = listHelper.favouriteBlog(blogs);
		expect(result).toEqual(
			{
				_id: '5a4g23445235235',
				title: 'Begun the Clonewars have',
				author: 'Yoda',
				url: 'http://www.yoda.com',
				likes: 100,
				__v: 0
			}
		);
	});
});