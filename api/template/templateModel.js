const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TemplateSchema = new Schema({
	order: {
		type: String,
	},
	title: {
		type: String,
		Required: 'Template Name is required!'
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
module.exports = mongoose.model('Templates', TemplateSchema);

