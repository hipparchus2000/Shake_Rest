const apiToken=process.env.token;
const mongoose = require("mongoose");
const Login = mongoose.model("Login");
const CryptoJS = require("crypto-js");
var jwt_decode = require('jwt-decode');

function base64url(source) {
	encodedSource = CryptoJS.enc.Base64.stringify(source);
	encodedSource = encodedSource.replace(/=+$/, '');
	encodedSource = encodedSource.replace(/\+/g, '-');
	encodedSource = encodedSource.replace(/\//g, '_');
	return encodedSource;
}


exports.getLogins = (req, res) => {
	if (req.headers['token']!=apiToken)
		res.send(err);
	Login.find({}, (err, Login) => {
		if (err)
			res.send(err);
		res.json(Login);
	});
};

function makeJwt(data,secret) { 
	let header = {
		"alg": "HS256",
		"typ": "JWT"
	};
	let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
	let encodedHeader = base64url(stringifiedHeader);
	let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
	let encodedData = base64url(stringifiedData);
	let token = encodedHeader + "." + encodedData;
	let tokenHash = CryptoJS.HmacSHA256(token, secret);
	b64tokenHash = base64url(tokenHash);
	let signedToken = token + "." + b64tokenHash;
	return signedToken;
}

exports.login = (req, res) => {
	let username = req.body["username"];
	Login.findOne({ "username":username}, (err, Login) => {
		if (err)
			res.send(err);
		let password = req.body["password"];
		if (Login.password == password) {
			let data = {
				"admin" : Login.admin,
				"roles" : Login.roles,
				"username": username
				};
			var signedToken = makeJwt(data,apiToken);	
			res.json({"loginSuccess": true, "token": signedToken, roles : Login.roles });
		} else {
			res.json({"loginSuccess":false});
		}
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
    var presentedToken = req.headers['jwt'];
	if(presentedToken!=null) {
		var decoded = jwt_decode(presentedToken);
        if(decoded.admin!=true) {
			console.log("jwt protected resource usage attempted but token does not have required claims");
			res.send({});
			return;
		}
		var signedToken = makeJwt(decoded,apiToken);	
        if (signedToken != presentedToken) {
			console.log("jwt presented but wasn't authentic");
			res.send({});
			return;
		}
	} else {
        console.log("no jwt so looking for apiToken");
		if (req.headers['token']!=apiToken) {
			res.send({"loginSuccess":false});
			return;
		}
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

