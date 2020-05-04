class ErrorBase extends Error {
    constructor(httpErrorCode, message) {
        super(message);

        this.httpErrorCode = httpErrorCode;
    }
}

class ValidationFailedError extends ErrorBase {
    constructor(message) {
        super(400, message);
    }
}

class EntityAlreadyExists extends ErrorBase {
    constructor(entity, message) {
        super(400, message);

        this.entity = entity;
    }
}

class EntityNotFoundError extends ErrorBase {
    constructor(entity, message) {
        super(404, message);

        this.entity = entity;
    }
}

class InvalidPasswordError extends ErrorBase {
    constructor() {
        super(403, 'Invalid Password!');
    }
}

class TokenExpiredError extends ErrorBase {
    constructor(){
        super(401, 'Token expired');
    }
}

class InvalidTokenError extends ErrorBase {
    constructor(){
        super(401, 'Invalid Token Provided');
    }
}

class TokenNotPresentError extends ErrorBase {
    constructor() {
        super(401, 'Token not present in request');
    }
}

class UnknownError extends ErrorBase {
    constructor(message) {
        super(412, message);
    }
}

class ExpressValidationError extends ErrorBase {
    constructor(errors) {
        let messages = [];
        errors.forEach(error => {
            messages.push(`${error.msg}`);
        });
        super(400, messages.join());
    }
}

module.exports = {
    ErrorBase,
    ValidationFailedError,
    EntityAlreadyExists,
    EntityNotFoundError,
    InvalidPasswordError,
    ExpressValidationError,
    UnknownError,
    TokenExpiredError,
    InvalidTokenError,
    TokenNotPresentError
};