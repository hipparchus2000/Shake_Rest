const mongoose = require("mongoose");
const Login = mongoose.model("Login");
const ShakeAuth = require("./shakeAuth");


exports.getLogins = (req, res) => {
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
		return;
	};
	Login.find({}, (err, Login) => {
		if (err)
			res.send(err);
		let loginsWithoutPassword = Login;
		loginsWithoutPassword.forEach(function(item,index) {
			loginsWithoutPassword[index].password="xxxx";
		});
		res.json(loginsWithoutPassword);
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
		console.log("login: user record found");
		if (err||Login == null) {
			console.log("err or null");
			res.send(emptyData);
			return;
		};
		let oneHour = 1000*3600;
		let expiry = Date.now()+oneHour*12;
		let data = {
			"loginSuccess": true,
			"admin" : Login.admin,
			"roles" : Login.roles,
			"username" : username,
			"userId" : Login._id,
			"expiry" : expiry
			};
		console.log(JSON.stringify(data));
		var signedToken = ShakeAuth.makeJwt(data);
		console.log(signedToken);
		res.json({
			"loginSuccess": true, 
			"admin": Login.admin,
			"roles" : Login.roles,
			"username" : username,
			"userId" : Login._id,
			"expiry" : expiry,
			"token": signedToken,
			});
	});
};
 

exports.createLogin = (req, res) => {
	let newLogin = new Login(req.body);
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
		return;
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
		return;
	};
	var urlArray = req.url.split('/');
	var id = urlArray[urlArray.length-1];
	Login.findById(id, (err, Login) => {
		if (err)
			res.send(err);
		var newLogin = Login;
		newLogin.password = "xxxxx";
		res.json(newLogin);
	});
};

exports.updateLogin = (req, res) => {
    if (ShakeAuth.checkRequestForValidAuth(req,true,null)==false) {
		res.json({ authorizationFailed: true });
		return;
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
		return;
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

