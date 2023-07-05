const express = require('express');
const router = express.Router();
const { booking_request, handle_request } = require('../Controllers/ReservationOperations');

router.route('/booking/:id').post(booking_request).put(handle_request)

module.exports = router;