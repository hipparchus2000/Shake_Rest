const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BlogSchema = new Schema({
  title: {
    type: String,
    Required: 'Blog Name is required!'
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
module.exports = mongoose.model('Blogs', BlogSchema);

