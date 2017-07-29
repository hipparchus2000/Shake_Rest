//module shakeAuth
const apiToken=process.env.token;
var jwt_decode = require('jwt-decode');
const CryptoJS = require("crypto-js");
var jwt_decode = require('jwt-decode');


function base64url(source) {
	encodedSource = CryptoJS.enc.Base64.stringify(source);
	encodedSource = encodedSource.replace(/=+$/, '');
	encodedSource = encodedSource.replace(/\+/g, '-');
	encodedSource = encodedSource.replace(/\//g, '_');
	return encodedSource;
}

exports.checkRequestForValidAuth = (req,requiresAdmin,requiredRole) => {
	var presentedToken = req.headers['jwt'];
	if(presentedToken!=null) {
		var decoded = jwt_decode(presentedToken);
        if(requiresAdmin && (decoded.admin!=true)) {
			console.log("jwt protected resource usage attempted but token does not have required claims");
			return false;
		}
		var signedToken = makeJwtFunc(decoded,apiToken);	
        if (signedToken != presentedToken) {
			console.log("jwt presented but wasn't authentic");
			return false;
		}
		if(requiredRoll!=null) {
			if(decoded.roles.includes(requiredRole)==false) {
				console.log("jwt presented but didn't contain required role");
				return false;
			}
		}
	} else {
        console.log("no jwt so looking for apiToken");
		if (req.headers['token']!=apiToken) {
			console.log("no valid jwt and no valid apiToken");
			return false;
		}
	};
	return true;
}

exports.makeJwt = (data,secret) => {
	return makeJwtFunc(data,secret);
}

function makeJwtFunc = (data,secret) => { 
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