const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BlogSchema = new Schema({
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
module.exports = mongoose.model('Blogs', BlogSchema);

