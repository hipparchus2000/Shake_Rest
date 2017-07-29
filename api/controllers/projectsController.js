const mongoose = require("mongoose");
const Project = mongoose.model("Projects");
const ShakeAuth = require("./shakeAuth");
const editorRole = "project-editor";

exports.getProjects = (req, res) => {
	Project.find({}, (err, Project) => {
		if (err)
			res.send(err);
		res.json(Project);
	}).sort( { order: 1 } );
};

exports.readProject = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Project.findById(id, (err, Project) => {
		if (err)
			res.send(err);
		res.json(Project);
	});
};


exports.createProject = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	let newProject = new Project(req.body);
	newProject.save( (err, Project) => {
		if (err)
			res.send(err);
		res.json(Project);
	});
};

exports.updateProject = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Project.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Project) => {
		if (err) 
			res.send(err);
		res.json(Project);
	});
};

exports.deleteProject = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Project.remove({
		_id:	id 
		}, (err, Project) => {
			if (err)
	res.send(err);
			res.json({ message: 'Project deleted!!' });
	});
};

