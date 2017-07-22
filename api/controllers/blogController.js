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
  newBlog.save( (err, Blog) => {
    if (err)
      res.send(err);
    res.json(Blog);
  });
};

exports.readBlog = (req, res) => {
  Blog.findById(req.params.id, (err, Blog) => {
    if (err)
      res.send(err);
    res.json(Blog);
  });
};

exports.updateBlog = (req, res) => {
  Blog.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, Blog) => {
    if (err) 
      res.send(err);
    res.json(Blog);
  });
};

exports.deleteBlog = (req, res) => {
  Blog.remove({
	  _id:  req.params.id 
    }, (err, Blog) => {
      if (err)
	res.send(err);
      res.json({ message: 'Blog deleted!!' });
  });
};

