module.exports = (app) => {
	let templateList = require('./templateController');
	app.route('/templates')
		.get(templateList.getTemplates) 
		.post(templateList.createTemplate);
	app.route('/templates/:templateId')
		.get(templateList.readTemplate)
		.put(templateList.updateTemplate)
		.delete(templateList.deleteTemplate);
}


