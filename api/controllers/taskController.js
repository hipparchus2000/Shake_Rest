const mongoose = require("mongoose");
const Task = mongoose.model("Tasks");
const Slot = mongoose.model("Kanbanslots");
const ShakeAuth = require("./shakeAuth");
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

