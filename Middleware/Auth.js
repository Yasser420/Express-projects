const CustomError = require('../Utiles/CustomError');
const jwt = require('jsonwebtoken');

const AuthenticateToken = (req, res, next) => {
    try {  
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        if (!token) {
            const error = new CustomError("No access token provided", 401);
            next(error)
        }

        jwt.verify(token, process.env.KEY, (err, user) => {
            if (err) {
                const error = new CustomError("Invalid access token ", 401);
                next(error)
            }
            req.user = user;
            next();
        });
    }catch(err){
        const error = new CustomError("Intrenal Server Error", 500);
        next(error)
    }
};

module.exports = { AuthenticateToken }; 