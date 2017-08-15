const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let BankSchema = new Schema({
	
	transactionDate: { type: Date },
	Notes: { type: String },
	userId: { type: String },
	CategoryId: { type: String },
	Id { type: String },
	amount { type: Number },
    SubCategory { type: String },
    AccountId { type: String },
    SHA256 { type: String },
    ManualCategory { type: Boolean }
	
});
module.exports = mongoose.model('Banks', BankSchema);

