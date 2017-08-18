module.exports = (app) => {
	let loginList = require('./loginController');
	app.route('/auth')
		.post(loginList.login);
	app.route('/users')
		.get(loginList.getLogins) 
		.post(loginList.createLogin);
	app.route('/users/:loginId')
		.get(loginList.readLogin)
		.put(loginList.updateLogin)
		.delete(loginList.deleteLogin);
}


