module.exports = (app) => {
	let Bank = require('../controllers/bankController');
	app.route('/banks')
		.get(Bank.getBanks) 
		.post(Bank.createBank);
	app.route('/banks/:bankId')
		.get(Bank.readBank)
		.put(Bank.updateBank)
		.delete(Bank.deleteBank);
}


