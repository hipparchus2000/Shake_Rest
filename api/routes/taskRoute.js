module.exports = (app) => {
	let taskList = require('../controllers/taskController');
	app.route('/tasks')
		.get(taskList.gettasks) 
		.post(taskList.createtask);
	app.route('/tasks/:taskId')
		.get(taskList.readtask)
		.put(taskList.updatetask)
		.delete(taskList.deletetask);
}


