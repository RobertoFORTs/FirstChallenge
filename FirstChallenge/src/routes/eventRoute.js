const express = require('express');
const eventController = require(`./../controllers/eventControllers`);

const router = express.Router();

router
    .route('/')
    .get(eventController.getAllEvents);

router
    .route('/:id')
    .get(eventController.getEventById);
module.exports = router;