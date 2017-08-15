const mongoose = require("mongoose");
const Template = mongoose.model("Templates");
const ShakeAuth = require("../auth/shakeAuth");
const editorRole = "template-editor";

exports.getTemplates = (req, res) => {
	Template.find({}, (err, Template) => {
		if (err)
			res.send(err);
		res.json(Template);
	}).sort( { order: 1 } );
};

exports.readTemplate = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Template.findById(id, (err, Template) => {
		if (err)
			res.send(err);
		res.json(Template);
	});
};


exports.createTemplate = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	let newTemplate = new Template(req.body);
	newTemplate.save( (err, Template) => {
		if (err)
			res.send(err);
		res.json(Template);
	});
};

exports.updateTemplate = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Template.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Template) => {
		if (err) 
			res.send(err);
		res.json(Template);
	});
};

exports.deleteTemplate = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Template.remove({
		_id:	id 
		}, (err, Template) => {
			if (err)
	res.send(err);
			res.json({ message: 'Template deleted!!' });
	});
};

