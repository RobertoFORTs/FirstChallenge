const express = require('express');
const eventController = require(`./../controllers/eventControllers`);

const router = express.Router();

router.param('id', eventController.checkId);

router 
    .route('/')
    .get(eventController.getEventsOnWeekDay, eventController.getAllEvents) 
    .post(eventController.checkBodyEvent, eventController.createEvent) 
    .delete(eventController.deleteEventsFromWeekday);

router
    .route('/:id')
    .get(eventController.getEventById)
    .delete(eventController.deleteEventById);

module.exports = router;