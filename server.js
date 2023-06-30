const sequelize = require('./Config/database');
const express = require('express');
require('dotenv').config();
require('./Relations/relations');
const { Errorhandler } = require('./Utiles/ErrorHandler');
const { AuthenticateToken } = require('./Middleware/Auth')
const bodyParser = require('body-parser');

const app = express();

const Login = require('./Routes/Login');
// const Client_Login = require('./Routes/ClientLogin');

const CreateAccount = require('./Routes/AccountCreation');
const RoomOperations = require('./Routes/RoomOperations');

const { urlencoded } = require('body-parser');

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/v1', Login);
app.use('/api/v1/Client', CreateAccount);

app.use(AuthenticateToken);

app.use('/api/v1/Employee', RoomOperations);
app.use('*', (req, res, next) => {
    const error = new Error(`The URL ${req.originalUrl} not found`);
    error.status = 'Failed to access';
    error.statusCode = 404;
    next(error);
})

app.use(Errorhandler);

app.listen(3000, async () => {
    console.log('Start listening on port 3000... ');
    await sequelize.authenticate()
    console.log('Database synchronized successfully');
})