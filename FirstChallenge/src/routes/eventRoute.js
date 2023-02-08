const express = require('express');
const eventController = require(`./../controllers/eventControllers`);

const router = express.Router();

router
    .route('/')
    .get(eventController.getAllEvents);

module.exports = router;