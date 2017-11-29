const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BankcategorySchema = new Schema({
	
	Id: { type: String },
	userId: { type: String },
	Name: { type: String },
	SearchString: { type: String }

});
module.exports = mongoose.model('Bankcategorys', BankcategorySchema);

