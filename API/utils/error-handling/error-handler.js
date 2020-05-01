const { ErrorBase, UnknownError } = require('./custom-errors');

async function handle(func, next) {
    try {
        await func();
    } catch (error) {
        if ((error instanceof ErrorBase) === false) {
            error = new UnknownError(error.message);
        } 

        next(error);
    }
}

async function errorHandlingMiddleware(err, req, res, next) {
    if (err instanceof ErrorBase) {
        err.statusCode = err.httpErrorCode;
    } else {
        err.statusCode = 500;
    }

    res.status(err.statusCode).json({
        statusCode: err.statusCode,
        message: err.message
    });
}

module.exports = {
    handle,
    errorHandlingMiddleware
};