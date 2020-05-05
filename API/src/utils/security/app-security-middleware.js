const security = require('./app-security');
const { handle } = require('../error-handling/request-handler');
const { TokenNotPresentError } = require('../error-handling/custom-errors');

async function tokenValidation(req, res, next) {
    await handle(async () => {
        let token = req.headers['x-access-token'] || req.headers['authorization'];

        if (token) {
            if (token.includes('Bearer')) {
                token = token.replace('Bearer ', '');
            }

            const data = await security.validateToken(token);
            req.requestUserId = data.id;

            next();
        } else {
            throw new TokenNotPresentError();
        }

    }, next);
};

module.exports = {
    tokenValidation
};