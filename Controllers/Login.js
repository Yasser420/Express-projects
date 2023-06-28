const Employee = require('../models/Employee');
const JWT = require('jsonwebtoken');
const CheckPassword = require('../Utiles/password_checking');
const CustomError = require('../Utiles/CustomError');
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
                const payload = { empID ,Email, password };
                const key = process.env.KEY;
                const token = JWT.sign(payload, key)
                res.status(200).json({ 'message': 'Login done successfully', data: { Email, password, token } })
            }
        }
        else {
            const error = new CustomError("The provided Email is not found", 404);
            next(error);

        }

    } catch (error) {
        res.status(500).json({ 'message': 'Server error' })

    }
}
module.exports = { Employee_login }