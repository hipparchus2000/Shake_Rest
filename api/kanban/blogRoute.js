module.exports = (app) => {
	let blogList = require('./blogController');
	app.route('/blogs')
		.get(blogList.getBlogs) 
		.post(blogList.createBlog);
	app.route('/blogs/:blogId')
		.get(blogList.readBlog)
		.put(blogList.updateBlog)
		.delete(blogList.deleteBlog);
}


