// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require("body-parser");
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
const port = 8000
const server = app.listen(port,function(){console.log(`runing on port ${port}`)});

// get data route
app.get('/retriveWeatherData',retriveWeatherData);

function retriveWeatherData(req,res) {
    res.send(projectData)
}

//post data route
const SavingOurData =[]
app.post('/updateWeatherData',sendWeatherData);

function sendWeatherData(req,res) {
    projectData= req.body;
    SavingOurData.push(projectData);
    //console.log(SavingOurData)
}
