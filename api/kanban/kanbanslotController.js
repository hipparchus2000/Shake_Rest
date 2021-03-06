var configToUse = process.env.config;
if (configToUse == null || configToUse == "")
	configToUse = "../../config/controllerDefaultConfig";
const config = require(configToUse);
const mongoose = require(config.mongoose);
const ShakeAuth = require("../auth/shakeAuth");

const Kanbanslot = mongoose.model(config.Kanbanslot);
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
		return;
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
		return;
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
		return;
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

