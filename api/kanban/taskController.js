var configToUse = process.env.config;
if (configToUse == null || configToUse == "")
	configToUse = "../../config/controllerDefaultConfig";
const config = require(configToUse);
const mongoose = require(config.mongoose);
const ShakeAuth = require("../auth/shakeAuth");

const Task = mongoose.model(config.Task);
const editorRole = "task-editor";

exports.getTasks = (req, res) => {
	Task.find({}, (err, Task) => {
		if (err)
			res.send(err);
		res.json(Task);		
	});
};

exports.createTask = (req, res) => {
	let newTask = new Task(req.body);
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	newTask.save( (err, Task) => {
		if (err)
			res.send(err);
		res.json(Task);
	});
};

exports.readTask = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Task.findById(id, (err, Task) => {
		if (err)
			res.send(err);
		res.json(Task);
	});
};

exports.updateTask = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Task.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Task) => {
		if (err) 
			res.send(err);
		res.json(Task);
	});
};

exports.deleteTask = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	console.log('req param id = ',id);
	Task.remove({
		_id: id
		}, (err, Task) => {
			if (err)
	res.send(err);
			res.json({ message: 'Task deleted!!' });
	});
};

