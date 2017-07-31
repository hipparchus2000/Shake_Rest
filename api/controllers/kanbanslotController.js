const mongoose = require("mongoose");
const Kanbanslot = mongoose.model("Kanbanslots");
const ShakeAuth = require("./shakeAuth");
const editorRole = "kanbanslot-editor";

exports.getKanbanslots = (req, res) => {
	Kanbanslot.find({}, (err, Kanbanslot) => {
		if (err)
			res.send(err);
		res.json(Kanbanslot);
	});
};

exports.createKanbanslot = (req, res) => {
	let newKanbanslot = new Kanbanslot(req.body);
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	newKanbanslot.save( (err, Kanbanslot) => {
		if (err)
			res.send(err);
		res.json(Kanbanslot);
	});
};

exports.readKanbanslot = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Kanbanslot.findById(id, (err, Kanbanslot) => {
		if (err)
			res.send(err);
		res.json(Kanbanslot);
	});
};

exports.updateKanbanslot = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Kanbanslot.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Kanbanslot) => {
		if (err) 
			res.send(err);
		res.json(Kanbanslot);
	});
};

exports.deleteKanbanslot = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	console.log('req param id = ',id);
	Kanbanslot.remove({
		_id: id
		}, (err, Kanbanslot) => {
			if (err)
	res.send(err);
			res.json({ message: 'Kanbanslot deleted!!' });
	});
};

