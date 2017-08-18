const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let PartSchema = new Schema({
	order: {
		type: String,
	},
	title: {
		type: String,
		Required: 'Part Name is required!'
	},
	description: {
		type: String
	},
	year: {
		type: String
	},
	pdfUrl: {
		type: String
	},
	url: {
		type: String
	},
	codeUrl: {
		type: String
	}
});
module.exports = mongoose.model('Parts', PartSchema);

