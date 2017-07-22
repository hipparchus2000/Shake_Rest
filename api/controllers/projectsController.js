const mongoose = require("mongoose");
const Project = mongoose.model("Projects");

exports.getProjects = (req, res) => {
  Project.find({}, (err, Project) => {
    if (err)
      res.send(err);
    res.json(Project);
  });
};

exports.createProject = (req, res) => {
  let newProject = new Project(req.body);
  newProject.save( (err, Project) => {
    if (err)
      res.send(err);
    res.json(Project);
  });
};

exports.readProject = (req, res) => {
  Project.findById(req.params.id, (err, Project) => {
    if (err)
      res.send(err);
    res.json(Project);
  });
};

exports.updateProject = (req, res) => {
  Project.findOneAndUpdate(req.params.id, req.body, { new: true }, (err, Project) => {
    if (err) 
      res.send(err);
    res.json(Project);
  });
};

exports.deleteProject = (req, res) => {
  Project.remove({
      _id: req.params.id
    }, (err, Project) => {
      if (err)
	res.send(err);
      res.json({ message: 'Project deleted!!' });
  });
};

