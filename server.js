
const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 13001;
const mongoose = require("mongoose");
const Task = require("./api/models/projectsModel");
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/projects"); // connect to MongoDB

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors({origin: 'http://www.talkisbetter.com'}));
let routes = require("./api/routes/projectsRoute");
routes(app); // register our routes
app.listen(port); 
console.log('App running on ' + port);

