module.exports = (app) => {
	let Bankcategory = require('./bankcategoryController');
	app.route('/bankcategorys')
		.get(Bankcategory.getBankcategorys) 
		.post(Bankcategory.createBankcategory);
	app.route('/bankcategorys/:bankcategoryId')
		.get(Bankcategory.readBankcategory)
		.put(Bankcategory.updateBankcategory)
		.delete(Bankcategory.deleteBankcategory);
}


