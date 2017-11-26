module.exports = (app) => {
	let projectList = require('./projectsController');
	app.route('/projects')
		.get(projectList.getProjects) 
		.post(projectList.createProject);
	app.route('/projects/:projectId')
		.get(projectList.readProject)
		.put(projectList.updateProject)
		.delete(projectList.deleteProject);
}


