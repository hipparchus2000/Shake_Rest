const mongoConnectionString=process.env.DB_URL;
const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 13001;
const mongoose = require("mongoose");

//schema
const Login =require ("./api/models/loginModel");
const Project = require("./api/models/projectsModel");
const Blog = require ("./api/models/blogsModel");
const Task =require ("./api/models/tasksModel");
const Kanbanslot =require ("./api/models/kanbanslotsModel");
const Bank =require ("./api/models/bankModel");
const Bankcategory =require ("./api/models/bankcategoryModel");

const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString); // connect to MongoDB

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors({origin: 'https://dev.talkisbetter.com'}));
let loginRoutes = require("./api/routes/loginRoute");
let projectRoutes = require("./api/routes/projectsRoute");
let blogRoutes = require("./api/routes/blogRoute");
let taskRoutes = require("./api/routes/taskRoute");
let kanbanslotRoutes = require("./api/routes/kanbanslotRoute");
let bankRoutes = require("./api/routes/bankRoute");
let bankcategoryRoutes = require("./api/routes/bankcategoryRoute");

// register our routes
loginRoutes(app);
projectRoutes(app);
blogRoutes(app);
taskRoutes(app);
kanbanslotRoutes(app);
bankRoutes(app);
bankcategoryRoutes(app);

app.listen(port); 
console.log('App running on ' + port);

