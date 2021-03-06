module.exports = (app) => {
	let Kanbanslot = require('./kanbanslotController');
	app.route('/kanbanslots')
		.get(Kanbanslot.getKanbanslots) 
		.post(Kanbanslot.createKanbanslot);
	app.route('/kanbanslots/:kanbanslotId')
		.get(Kanbanslot.readKanbanslot)
		.put(Kanbanslot.updateKanbanslot)
		.delete(Kanbanslot.deleteKanbanslot);
}


