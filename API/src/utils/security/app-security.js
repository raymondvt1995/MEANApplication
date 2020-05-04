const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../app-config');
const { TokenNotPresentError, TokenExpiredError, InvalidTokenError} = require('../error-handling/custom-errors');

module.exports = {
    hashValue: async (value, salt) => {
        return await bcrypt.hash(value, salt);
    },

    compareHashValue: async (value, hashedValue) => {
        return await bcrypt.compare(value, hashedValue);
    },

    getToken: async (userId) => {
        return await jwt.sign({id: userId}, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
    },

    validateToken: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.secret, (err, decoded) => {

                if (err) {
                    reject(new InvalidTokenError());
                }

                return resolve(decoded);
            });
        })
    }
};