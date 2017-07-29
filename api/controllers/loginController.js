const mongoose = require("mongoose");
const Login = mongoose.model("Login");
const ShakeAuth = require("./shakeAuth");


exports.getLogins = (req, res) => {
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
	};
	Login.find({}, (err, Login) => {
		if (err)
			res.send(err);
		res.json(Login);
	});
};


exports.login = (req, res) => {
    console.log(JSON.stringify(req.body));
	let username = req.body.username;
    let password = req.body.password;
	let emptyData = {
		"loginSuccess": false, 
		"admin" : false,
		"roles" : "",
		"username" : "guest"
	};
	Login.findOne({ "username":username, "password":password}, (err, Login) => {
		if (err||Login == null) {
			res.send(emptyData);
			return;
		};
		let data = {
			"admin" : Login.admin,
			"roles" : Login.roles,
			"username": username
			};
		var signedToken = ShakeAuth.makeJwt(data,apiToken);	
		res.json({
			"loginSuccess": true, 
			"admin": Login.admin,
			"roles" : Login.roles,
			"username" : username,
			"token": signedToken, 
			});
	});
};
 

exports.createLogin = (req, res) => {
	let newLogin = new Login(req.body);
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
	};
	newLogin.save( (err, Login) => {
		if (err)
			res.send(err);
		res.json(Login);
	});
};

exports.readLogin = (req, res) => {
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Login.findById(id, (err, Login) => {
		if (err)
			res.send(err);
		res.json(Login);
	});
};

exports.updateLogin = (req, res) => {
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Login.findOneAndUpdate({"_id":id}, req.body, { new: true }, (err, Login) => {
		if (err) 
			res.send(err);
		res.json(Login);
	});
};

exports.deleteLogin = (req, res) => {
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
	};
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

