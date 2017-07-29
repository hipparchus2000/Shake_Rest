const mongoose = require("mongoose");
const Blog = mongoose.model("Blogs");
const ShakeAuth = require("./shakeAuth");

exports.getBlogs = (req, res) => {
	Blog.find({}, (err, Blog) => {
		if (err)
			res.send(err);
		res.json(Blog);
	});
};

exports.createBlog = (req, res) => {
	let newBlog = new Blog(req.body);
	if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
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
	if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
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
	if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
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

