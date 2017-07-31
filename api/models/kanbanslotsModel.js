const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let KanbanslotSchema = new Schema({
	slotOrder: {
		type: String
	},
	slotName: {
		type: String
	}
});
module.exports = mongoose.model('Kanbanslots', KanbanslotSchema);

