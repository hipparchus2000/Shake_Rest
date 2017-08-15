const mongoConnectionString=process.env.DB_URL;
const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 13001;
const mongoose = require("mongoose");

const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString); // connect to MongoDB

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var cors = require('cors');

app.use(cors({origin: 'https://dev.talkisbetter.com'}));

//Auth
const Login =require ("./api/models/loginModel");
let loginRoutes = require("./api/auth/loginRoute");
loginRoutes(app);

//Kanban
const Project = require("./api/models/projectsModel");
const Blog = require ("./api/models/blogsModel");
const Task =require ("./api/models/tasksModel");
const Kanbanslot =require ("./api/models/kanbanslotsModel");
let projectRoutes = require("./api/routes/projectsRoute");
let blogRoutes = require("./api/routes/blogRoute");
let taskRoutes = require("./api/routes/taskRoute");
let kanbanslotRoutes = require("./api/routes/kanbanslotRoute");
projectRoutes(app);
blogRoutes(app);
taskRoutes(app);
kanbanslotRoutes(app);

//Bank
const Bank =require ("./api/models/bankModel");
const Bankcategory =require ("./api/models/bankcategoryModel");
let bankRoutes = require("./api/routes/bankRoute");
let bankcategoryRoutes = require("./api/routes/bankcategoryRoute");
bankRoutes(app);
bankcategoryRoutes(app);

//Trash
const Trash =require ("./api/models/trashModel");
let trashRoutes = require("./api/routes/trashRoute");
trashRoutes(app);

//Template
//const Template =require ("./api/models/templateModel");
//let templateRoutes = require("./api/routes/templateRoute");
//templateRoutes(app);

app.listen(port); 
console.log('App running on ' + port);

