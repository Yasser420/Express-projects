const express = require('express');
const router = express.Router();
const CreateAccount = require('../Controllers/AccountCreation');

router.route('/accounts').post(CreateAccount)

module.exports = router; 