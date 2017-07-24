
const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 13001;
const mongoose = require("mongoose");

//schema
const Project = require("./api/models/projectsModel");
const Blog = require ("./api/models/blogsModel");
const Login =require ("./api/models/loginModel");

const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/projects"); // connect to MongoDB

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors({origin: 'http://www.talkisbetter.com'}));
let projectRoutes = require("./api/routes/projectsRoute");
let blogRoutes = require("./api/routes/blogRoute");
let loginRoutes = require("./api/routes/loginRoute");

// register our routes
projectRoutes(app);
blogRoutes(app);
loginRoutes(app);

app.listen(port); 
console.log('App running on ' + port);

