const mongoose = require("mongoose");
const Bank = mongoose.model("Banks");
const Slot = mongoose.model("Kanbanslots");
const ShakeAuth = require("./shakeAuth");
const editorRole = "bank-editor";

exports.getBanks = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	Bank.find({ userId: ShakeAuth.getUserId(req.body) }, (err, Bank) => {
		if (err)
			res.send(err);
		res.json(Bank);		
	});
};

exports.createBank = (req, res) => {
	let newBank = new Bank(req.body);
	newBank.userId = ShakeAuth.getUserId(req.body);
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	newBank.save( (err, Bank) => {
		if (err)
			res.send(err);
		res.json(Bank);
	});
};

exports.readBank = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Bank.findById(id, (err, Bank) => {
		if (err)
			res.send(err);
		res.json(Bank);
	});
};

exports.updateBank = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	req.body.userId = ShakeAuth.getUserId(req.body);
	Bank.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Bank) => {
		if (err) 
			res.send(err);
		res.json(Bank);
	});
};

exports.deleteBank = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	console.log('req param id = ',id);
	Bank.remove({
		_id: id,
		userId: ShakeAuth.getUserId(req.body)
		}, (err, Bank) => {
			if (err)
	res.send(err);
			res.json({ message: 'Bank deleted!!' });
	});
};

