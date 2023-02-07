const express = require('express');
const morgan = require('morgan');

//other imports incoming from routes
////
const userRoute = require('./routes/userRoute');
const eventRoute = require('./routes/eventRoute');


const app = express.json();

app.use(express()); 

//Using middlewares



//Use routes

module.export = app;