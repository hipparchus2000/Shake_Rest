module.exports = (app) => {
	let Task = require('../controllers/taskController');
	app.route('/tasks')
		.get(Task.getBlogs) 
		.post(Task.createBlog);
	app.route('/tasks/:taskId')
		.get(Task.readBlog)
		.put(Task.updateBlog)
		.delete(Task.deleteBlog);
}


