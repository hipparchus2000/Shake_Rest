
console.log("starting imports");
const mongoConnectionString=process.env.DB_URL;
const express = require("express"); // express framework
const app = express();
const port = process.env.PORT || 13001;
const bodyParser = require('body-parser');
var cors = require('cors');
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect(mongoConnectionString); // connect to MongoDB

module.exports = app;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: 'https://dev.talkisbetter.com'}));

console.log("starting routes");
//Auth
const Login =require ("./api/auth/loginModel");
let loginRoutes = require("./api/auth/loginRoute");
loginRoutes(app);

//Kanban
const Project = require("./api/kanban/projectsModel");
const Blog = require ("./api/kanban/blogsModel");
const Task =require ("./api/kanban/tasksModel");
const Kanbanslot =require ("./api/kanban/kanbanslotsModel");
let projectRoutes = require("./api/kanban/projectsRoute");
let blogRoutes = require("./api/kanban/blogRoute");
let taskRoutes = require("./api/kanban/taskRoute");
let kanbanslotRoutes = require("./api/kanban/kanbanslotRoute");
projectRoutes(app);
blogRoutes(app);
taskRoutes(app);
kanbanslotRoutes(app);

//Bank
const Bank =require ("./api/bank/bankModel");
const Bankcategory =require ("./api/bank/bankcategoryModel");
let bankRoutes = require("./api/bank/bankRoute");
let bankcategoryRoutes = require("./api/bank/bankcategoryRoute");
bankRoutes(app);
bankcategoryRoutes(app);

//Trash
const Trash =require ("./api/trash/trashModel");
let trashRoutes = require("./api/trash/trashRoute");
trashRoutes(app);

//Part
const Part =require ("./api/part/partModel");
let partRoutes = require("./api/part/partRoute");
partRoutes(app);


//Template
//const Template =require ("./api/template/templateModel");
//let templateRoutes = require("./api/template/templateRoute");
//templateRoutes(app);

app.listen(port); 
console.log('App running on ' + port);

