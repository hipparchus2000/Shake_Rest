const mongoose = require("mongoose");
const $capitialisedInitialVersion = mongoose.model("$capitialisedInitialVersions");
const ShakeAuth = require("../auth/shakeAuth");
const editorRole = "$1-editor";

exports.get$capitialisedInitialVersions = (req, res) => {
	$capitialisedInitialVersion.find({}, (err, $capitialisedInitialVersion) => {
		if (err)
			res.send(err);
		res.json($capitialisedInitialVersion);
	}).sort( { order: 1 } );
};

exports.read$capitialisedInitialVersion = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	$capitialisedInitialVersion.findById(id, (err, $capitialisedInitialVersion) => {
		if (err)
			res.send(err);
		res.json($capitialisedInitialVersion);
	});
};


exports.create$capitialisedInitialVersion = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	let new$capitialisedInitialVersion = new $capitialisedInitialVersion(req.body);
	new$capitialisedInitialVersion.save( (err, $capitialisedInitialVersion) => {
		if (err)
			res.send(err);
		res.json($capitialisedInitialVersion);
	});
};

exports.update$capitialisedInitialVersion = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	$capitialisedInitialVersion.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, $capitialisedInitialVersion) => {
		if (err) 
			res.send(err);
		res.json($capitialisedInitialVersion);
	});
};

exports.delete$capitialisedInitialVersion = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	$capitialisedInitialVersion.remove({
		_id:	id 
		}, (err, $capitialisedInitialVersion) => {
			if (err)
	res.send(err);
			res.json({ message: '$capitialisedInitialVersion deleted!!' });
	});
};

