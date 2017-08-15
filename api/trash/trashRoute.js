module.exports = (app) => {
	let trashList = require('../controllers/trashController');
	app.route('/trash')
		.get(trashList.getTrashs) 
		.post(trashList.createTrash);
	app.route('/trash/:trashId')
		.get(trashList.readTrash)
		.put(trashList.updateTrash)
		.delete(trashList.deleteTrash);
}


