const mongoose = require("mongoose");
const Bankcategory = mongoose.model("Bankcategorys");
const Slot = mongoose.model("Kanbanslots");
const ShakeAuth = require("./shakeAuth");
const editorRole = "bankcategory-editor";

exports.getBankcategorys = (req, res) => {
	Bankcategory.find({}, (err, Bankcategory) => {
		if (err)
			res.send(err);
		res.json(Bankcategory);		
	});
};

exports.createBankcategory = (req, res) => {
	let newBankcategory = new Bankcategory(req.body);
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	newBankcategory.save( (err, Bankcategory) => {
		if (err)
			res.send(err);
		res.json(Bankcategory);
	});
};

exports.readBankcategory = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Bankcategory.findById(id, (err, Bankcategory) => {
		if (err)
			res.send(err);
		res.json(Bankcategory);
	});
};

exports.updateBankcategory = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Bankcategory.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Bankcategory) => {
		if (err) 
			res.send(err);
		res.json(Bankcategory);
	});
};

exports.deleteBankcategory = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	console.log('req param id = ',id);
	Bankcategory.remove({
		_id: id
		}, (err, Bankcategory) => {
			if (err)
	res.send(err);
			res.json({ message: 'Bankcategory deleted!!' });
	});
};

