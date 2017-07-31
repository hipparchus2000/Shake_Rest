module.exports = (app) => {
	let Task = require('../controllers/taskController');
	app.route('/tasks')
		.get(Task.getTasks) 
		.post(Task.createTask);
	app.route('/tasks/:taskId')
		.get(Task.readTask)
		.put(Task.updateTask)
		.delete(Task.deleteTask);
}


