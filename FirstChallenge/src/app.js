const express = require('express');
const morgan = require('morgan');



//other imports incoming from routes
////
const userRoute = require('./routes/userRoute');
const eventRoute = require('./routes/eventRoute');


const app = express();

app.use(express.json()); 

//Using middlewares



//Use routes

//base route for events
app.use('/api/v1/events', eventRoute);

module.exports = app;