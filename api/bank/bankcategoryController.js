const mongoose = require("mongoose");
const Bankcategory = mongoose.model("Bankcategorys");
const Slot = mongoose.model("Kanbanslots");
const ShakeAuth = require("../auth/shakeAuth");
const editorRole = "bankcategory-editor";

exports.getBankcategorys = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	Bankcategory.find({ userId: ShakeAuth.getUserId(req) }, (err, Bankcategory) => {
		if (err)
			res.send(err);
		res.json(Bankcategory);		
	});
};

exports.createBankcategory = (req, res) => {
	let newBankcategory = new Bankcategory(req.body);
	console.log("create new category");
	if(newBankcategory.userId != ShakeAuth.getUserId(req)) {
		res.json({ authorizationFailed: true });
		return;
	}
	console.log("authorized ok");
	console.log(newBankcategory);
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	newBankcategory.save( (err, Bankcategory) => {
		if (err)
			res.send(err);
		res.json(Bankcategory);
	});
};


exports.readBankcategory = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
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
		return;
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
		return;
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

