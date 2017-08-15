const mongoose = require("mongoose");
const Trash = mongoose.model("Trashs");
const ShakeAuth = require("./shakeAuth");
const editorRole = "trash-editor";

exports.getTrashs = (req, res) => {
	Trash.find({}, (err, Trash) => {
		if (err)
			res.send(err);
		res.json(Trash);
	}).sort( { order: 1 } );
};

exports.readTrash = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Trash.findById(id, (err, Trash) => {
		if (err)
			res.send(err);
		res.json(Trash);
	});
};


exports.createTrash = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	let newTrash = new Trash(req.body);
	newTrash.save( (err, Trash) => {
		if (err)
			res.send(err);
		res.json(Trash);
	});
};

exports.updateTrash = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Trash.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Trash) => {
		if (err) 
			res.send(err);
		res.json(Trash);
	});
};

exports.deleteTrash = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Trash.remove({
		_id:	id 
		}, (err, Trash) => {
			if (err)
	res.send(err);
			res.json({ message: 'Trash deleted!!' });
	});
};

