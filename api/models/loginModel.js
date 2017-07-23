const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let LoginSchema = new Schema({
  username: {
    type: String,
  },
  password: {
	  type: String
  }
});
module.exports = mongoose.model('Login', LoginSchema);

