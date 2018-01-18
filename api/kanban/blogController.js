var configToUse = process.env.config;
if (configToUse == null || configToUse == "")
	configToUse = "../../config/controllerDefaultConfig";
const config = require(configToUse);
const mongoose = require(config.mongoose);
const ShakeAuth = require("../auth/shakeAuth");

const Blog = mongoose.model(config.Blog);
const editorRole = "blog-editor";

exports.getBlogs = (req, res) => {
	Blog.find({}).sort({date: -1}).exec(function(err, Blog) {
		if (err)
			res.send(err);
		res.json(Blog);
	});
};

exports.createBlog = (req, res) => {
	let newBlog = new Blog(req.body);
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;		
	};
	newBlog.save( (err, Blog) => {
		if (err)
			res.send(err);
		res.json(Blog);
	});
};

exports.readBlog = (req, res) => {
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Blog.findById(id, (err, Blog) => {
		if (err)
			res.send(err);
		res.json(Blog);
	});
};

exports.updateBlog = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Blog.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Blog) => {
		if (err) 
			res.send(err);
		res.json(Blog);
	});
};

exports.deleteBlog = (req, res) => {
	if (ShakeAuth.checkRequestForValidAuth(req,false,editorRole)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	console.log('req param id = ',id);
	Blog.remove({
		_id: id
		}, (err, Blog) => {
			if (err)
	res.send(err);
			res.json({ message: 'Blog deleted!!' });
	});
};

