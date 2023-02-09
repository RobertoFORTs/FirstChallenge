const express = require('express');
const eventController = require(`./../controllers/eventControllers`);

const router = express.Router();

router //the getAllEvents also gets events by weekDay
    .route('/')
    .get(eventController.getAllEvents) //planing on changing name of function to getEvents
    .post(eventController.createEvent)
    .delete(eventController.deleteEventsFromWeekday);

router
    .route('/:id')
    .get(eventController.getEventById)
    .delete(eventController.deleteEventById);

module.exports = router;