const mongoose = require("mongoose");
const Part = mongoose.model("Parts");
const ShakeAuth = require("../auth/shakeAuth");
const editorRole = "part-editor";

exports.getParts = (req, res) => {
	Part.find({}, (err, Part) => {
		if (err)
			res.send(err);
		res.json(Part);
	}).sort( { order: 1 } );
};

exports.readPart = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Part.findById(id, (err, Part) => {
		if (err)
			res.send(err);
		res.json(Part);
	});
};


exports.createPart = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	let newPart = new Part(req.body);
	newPart.save( (err, Part) => {
		if (err)
			res.send(err);
		res.json(Part);
	});
};

exports.updatePart = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Part.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Part) => {
		if (err) 
			res.send(err);
		res.json(Part);
	});
};

exports.deletePart = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Part.remove({
		_id:	id 
		}, (err, Part) => {
			if (err)
	res.send(err);
			res.json({ message: 'Part deleted!!' });
	});
};

