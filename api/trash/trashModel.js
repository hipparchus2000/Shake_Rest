const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let TrashSchema = new Schema({
	customerUserId: {
		type: String,
	},
	vendorUserId: {
		type: String,
		Required: 'Trash Name is required!'
	},
	location: {
		type: String
	},
	numberOfBags: {
		type: Number
	},
	maxNumberOfHoursFromNow: {
		type: Number
	},
	wasteType: {
		type: String
	},
	paymentAmount: {
		type: Number
	},
	paymentReferemce: {
		type: Number
	}
});
module.exports = mongoose.model('Trashs', TrashSchema);

