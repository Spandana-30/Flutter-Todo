const express = require("express");
const bodyParser = require("body-parser") //to read the data from req body 
const cors = require("cors");
const UserRoute = require("./routes/user.route");
const ToDoRoute = require('./routes/todo.routes');
const app = express();

// Enable CORS for all origins
app.use(cors({
    origin: "*", // Allow all origins for development
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(bodyParser.json())

app.use("/", UserRoute);
app.use("/", ToDoRoute);

module.exports = app;