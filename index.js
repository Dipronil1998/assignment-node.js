require('dotenv').config();
const express = require('express');
var cookieParser = require('cookie-parser')

require("./db/conn");   //database connection

//Define Model
const Student = require('./model/student');
const Schoool = require('./model/school');
const User = require("./model/user");
const Role = require("./model/role");


const app = express();
app.use(express.json({}));
app.use(cookieParser())

port = process.env.PORT || 3002;

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//Router

const SchoolRouter = require("./routers/school");
app.use(SchoolRouter)

const RoleRouter = require("./routers/role");
app.use(RoleRouter)

const StudentRouter = require("./routers/student");
app.use(StudentRouter)

const UserRouter=require("./routers/auth");
app.use(UserRouter)



app.listen(port, () => {
    console.log(`Server is run: ${port}`);
})