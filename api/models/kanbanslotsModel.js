const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let KanbanslotSchema = new Schema({
	order: {
		type: String,
	},
	date: {
		type: String,
	},
	storyName: {
		type: String
	},
	storyText: {
		type: String
	}
});
module.exports = mongoose.model('Kanbanslots', KanbanslotSchema);

