module.exports = (app) => {
	let trashList = require('./trashController');
	app.route('/trashs')
		.get(trashList.getTrashs) 
		.post(trashList.createTrash);
	app.route('/trashs/:trashId')
		.get(trashList.readTrash)
		.put(trashList.updateTrash)
		.delete(trashList.deleteTrash);
}


