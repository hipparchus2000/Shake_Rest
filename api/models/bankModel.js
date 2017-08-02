const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BankSchema = new Schema({
	transactionDate: {
		type: String,
	},
	notes: {
		type: String,
	},
	userId: {
		type: String
	},
	categoryId: {
		type: String
	}
});
module.exports = mongoose.model('Banks', BankSchema);

