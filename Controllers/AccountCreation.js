const CustomError = require("../Utiles/CustomError");
const checkEmailExists = require("../Utiles/checkEmailExisits");
const validPassword = require("../Utiles/valid_password");
const Client = require("../models/Client");

const CreateAccount = async (req, res, next) => {
    try {
        const { First_name, Last_name, Email, password, address, phoneNumber } = req.body;
        if (!validPassword(password)) {
            const error = new CustomError('The password is not strong', 400)
            next(error);
        }
        else if (! await checkEmailExists(Email)) {
            const error = new CustomError('The Email is used for other account', 400)
            next(error);
        }
        else {
            const NewCLient = await Client.create({
                First_name, Last_name, Email,
                password, address, phoneNumber
            })
            res.status(200).json({ 'Message': 'Success', 'data': { First_name, Last_name, Email, password, address, phoneNumber } })
        }
    } catch (err) {
        const error = new CustomError('Internal Server Error ', 500)
        console.log(err);
        next(error);
    }
}
module.exports = CreateAccount 