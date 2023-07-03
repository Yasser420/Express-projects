class CustomError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.errors = [];
        if (message) {
            this.errors.push(message);
        }
        this.statusCode = statusCode
        this.status = statusCode > 399 && statusCode < 500 ? 'Failed' : 'Internal Server Error'
        Error.captureStackTrace(this, this.constructor)
    }

}
module.exports = CustomError