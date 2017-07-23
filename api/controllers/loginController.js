const apiToken=process.env.token;
const mongoose = require("mongoose");
const Login = mongoose.model("Login");

exports.getLogins = (req, res) => {
  Login.find({}, (err, Login) => {
    if (err)
      res.send(err);
    res.json(Login);
  });
};

exports.Login = (req, res) => {
  var urlArray = req.url.split('/');
  var id = urlArray[urlArray.length-1];
  Login.findById(id, (err, Login) => {
    if (err)
      res.send(err);
    res.json(Login);
  });
};
 

exports.createLogin = (req, res) => {
  let newLogin = new Login(req.body);
  if (req.headers['token']!=apiToken)
    res.send(err);
  newLogin.save( (err, Login) => {
    if (err)
      res.send(err);
    res.json(Login);
  });
};

exports.readLogin = (req, res) => {
  var urlArray = req.url.split('/');
  var id = urlArray[urlArray.length-1];
  Login.findById(id, (err, Login) => {
    if (err)
      res.send(err);
    res.json(Login);
  });
};

exports.updateLogin = (req, res) => {
  if (req.headers['token']!=apiToken)
    res.send(err);
  var urlArray = req.url.split('/');
  var id = urlArray[urlArray.length-1];
  Login.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Login) => {
    if (err) 
      res.send(err);
    res.json(Login);
  });
};

exports.deleteLogin = (req, res) => {
  if (req.headers['token']!=apiToken)
    res.send(err) ;
  var urlArray = req.url.split('/');
  var id = urlArray[urlArray.length-1];
  console.log('req param id = ',id);
  Login.remove({
	  _id: id
    }, (err, Login) => {
      if (err)
	res.send(err);
      res.json({ message: 'Login deleted!!' });
  });
};

