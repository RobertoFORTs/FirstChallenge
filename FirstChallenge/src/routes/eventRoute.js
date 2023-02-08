const express = require('express');
const eventController = require(`./../controllers/eventControllers`);

const router = express.Router();

router //the getAllEvents also gets events by weekDay
    .route('/')
    .get(eventController.getAllEvents);

router
    .route('/:id')
    .get(eventController.getEventById);

module.exports = router;