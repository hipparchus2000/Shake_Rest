const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let $capitialisedInitialVersionSchema = new Schema({
	order: {
		type: String,
	},
	title: {
		type: String,
		Required: '$capitialisedInitialVersion Name is required!'
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
module.exports = mongoose.model('$capitialisedInitialVersions', $capitialisedInitialVersionSchema);

