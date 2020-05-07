const { ErrorBase, UnknownError } = require('./custom-errors');
const { validationResult } = require('express-validator');
const { ExpressValidationError } = require('./custom-errors');

async function handle(func, next) {
    try {
        await func();
    } catch (error) {
        console.log(error);
        if ((error instanceof ErrorBase) === false) {
            error = new UnknownError(error.message);
        }

        next(error);
    }
}

async function handleAndValidate(func, next, req) {
    handle(async () => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            throw new ExpressValidationError(errors.errors);
        }

        await func();
    }, next);
}

module.exports = {
    handle,
    handleAndValidate
};