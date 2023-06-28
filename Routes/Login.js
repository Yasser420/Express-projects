const express = require('express');
const router = express.Router();
const { Employee_login } = require('../Controllers/Login');

router.post('/Login', Employee_login);

module.exports = router;
