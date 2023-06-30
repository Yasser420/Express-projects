const Errorhandler = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || "Internal Server Error";
    res.status(error.statusCode).json({
        Status: error.status,
        Message: error.message
    })
}

module.exports = { Errorhandler }