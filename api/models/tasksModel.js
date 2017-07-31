const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TaskSchema = new Schema({
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
	storySlot: {
		type: String
	}
	
});
module.exports = mongoose.model('Tasks', TaskSchema);

