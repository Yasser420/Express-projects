const express = require('express');
const router = express.Router();
const { Employee_login ,Client_login } = require('../Controllers/Login');

router.post('/Employee/Login', Employee_login);
router.post('/Client/Login',Client_login) ; 
module.exports = router;
