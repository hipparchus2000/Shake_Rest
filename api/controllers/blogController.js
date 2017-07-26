const apiToken=process.env.token;
const mongoose = require("mongoose");
const Blog = mongoose.model("Blogs");

exports.getBlogs = (req, res) => {
	Blog.find({}, (err, Blog) => {
		if (err)
			res.send(err);
		res.json(Blog);
	});
};

exports.createBlog = (req, res) => {
	let newBlog = new Blog(req.body);
	if (req.headers['token']!=apiToken)
		res.send(err);
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
	if (req.headers['token']!=apiToken)
		res.send(err);
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Blog.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Blog) => {
		if (err) 
			res.send(err);
		res.json(Blog);
	});
};

exports.deleteBlog = (req, res) => {
	if (req.headers['token']!=apiToken)
		res.send(err) ;
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

