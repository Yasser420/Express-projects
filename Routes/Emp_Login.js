const express = require('express');
const router = express.Router();
const { Employee_login } = require('../Controllers/Emp_login');

router.post('/Login', Employee_login);

module.exports = router;
