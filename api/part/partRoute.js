module.exports = (app) => {
	let partList = require('./partController');
	app.route('/parts')
		.get(partList.getParts) 
		.post(partList.createPart);
	app.route('/parts/:partId')
		.get(partList.readPart)
		.put(partList.updatePart)
		.delete(partList.deletePart);
}


