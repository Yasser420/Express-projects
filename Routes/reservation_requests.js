const express = require('express');
const router = express.Router();
const { booking_request } = require('../Controllers/ReservationOperations') ; 

router.post('/booking/:id', booking_request);

module.exports = router ;