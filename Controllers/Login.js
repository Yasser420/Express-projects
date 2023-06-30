const Employee = require('../models/Employee');
const JWT = require('jsonwebtoken');
const CheckPassword = require('../Utiles/password_checking');
const CustomError = require('../Utiles/CustomError');
const Client = require('../models/Client');

const Employee_login = async (req, res, next) => {
    try {
        const { Email, password } = req.body;
        const employee = await Employee.findOne({ where: { Email } });
        if (employee) {
            if (!CheckPassword(employee.password, password)) {
                const error = new CustomError("The provided password doesnot match the Email ", 400);
                next(error);;
            } else {
                const empID = employee.id ;
                const payload = { empID, Email, password, type: 'employee' };
                const key = process.env.KEY;
                const token = JWT.sign(payload, key)
                res.status(200).json({ 'message': 'Login done successfully', data: { Email, password, token } })
            }
        }
        else {
            const error = new CustomError("The provided Email is not found", 404);
            next(error);

        }

    } catch (err) {
        const error = new CustomError("Internal server Error", 500);
        next(error);

    }
}
const Client_login= async(req,res,next)=>{
    try {
        console.log('yasser');
        const { Email, password } = req.body;
        const client = await Client.findOne({ where: { Email: Email } });
        if (client) {
            if (!CheckPassword(client.password, password)) {
                const error = new CustomError("The provided password doesnot match the Email ", 400);
                next(error);
            } else {
                const clientID =  Client.id;
                const payload = { clientID, Email, password , type:'client'};
                const key = process.env.KEY;
                const token = JWT.sign(payload, key)
                res.status(200).json({ 'message': 'Login done successfully', data: { Email, password, token } })
            }
        }
        else {
            console.log('ayyyya');
            const error = new CustomError("The provided Email is not found", 404);
            next(error);

        }

    } catch (err) {
        const error = new CustomError("Internal server Error", 500);
        console.log(err.message);
        next(error);

    }
}
module.exports = { Employee_login, Client_login }