const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let LoginSchema = new Schema({
	username: {
		type: String,
	},
	password: {
		type: String
	},
	admin: {
		type: Boolean
	},
	roles: { 
		type: String 
	},
	expiry: {
		type: String
	}
	
	
	
});
module.exports = mongoose.model('Login', LoginSchema);

