const apiToken=process.env.token;
const mongoose = require("mongoose");
const Login = mongoose.model("Login");
const CryptoJS = require("crypto-js");

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

exports.login = (req, res) => {
  let username = req.body["username"];
  Login.findOne({ "username":username}, (err, Login) => {
    if (err)
      res.send(err);
    let password = req.body["password"];
    if (Login.password == password) {
      let header = {
        "alg": "HS256",
        "typ": "JWT"
      };
      console.log("password matched, generating token");
      let stringifiedHeader = CryptoJS.enc.Utf8.parse(JSON.stringify(header));
      let encodedHeader = base64url(stringifiedHeader);
      let data = {
	      "admin" : false,
	      "roles" : Login.roles,
	      "username": username
	      };
	    let stringifiedData = CryptoJS.enc.Utf8.parse(JSON.stringify(data));
	    console.log("converted to utf8");
	    let encodedData = base64url(stringifiedData);
	    console.log("base64 encoded");
	    let token = encodedHeader + "." + encodedData;
	    let tokenHash = CryptoJS.HmacSHA256(token, apiToken);
	    b64tokenHash = base64url(tokenHash);
	    let signedToken = token + "." + b64tokenHash;
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
  if(req.headers['jwt']!=null) {
	var json = CryptoJS.enc.Base64.parse(req.headers['jwt']);
	res.send(json);
	//var signature = CryptoJS.HmacSHA256(base64Header + "." + base64Payload , apiToken ).toString(CryptoJS.enc.Base64);
	//if(signature != base64Sign) {
        //  res.send({ "error":"error" });
	//}
  } else {
    if (req.headers['token']!=apiToken)
      res.send({"loginSuccess":false});
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

