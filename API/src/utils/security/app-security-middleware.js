const security = require('./app-security');
const { handle } = require('../error-handling/error-handler');
const { TokenNotPresentError, TokenExpiredError, InvalidTokenError} = require('../error-handling/custom-errors');

async function tokenValidation(req, res, next) {
    await handle(async () => {

        let token = req.headers['x-access-token'] || req.headers['authorization'];
        console.log(token);
        if (token) {
            token = token.replace('Bearer ',''); 
            console.log(token);
            const data = await security.validateToken(token);
            
            console.log(data);
            
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