const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let ProjectSchema = new Schema({
  order: {
    type: String,
  },
  title: {
    type: String,
    Required: 'Project Name is required!'
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
module.exports = mongoose.model('Projects', ProjectSchema);

