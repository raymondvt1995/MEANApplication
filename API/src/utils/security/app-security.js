const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../../app-config');
const { TokenNotPresentError, TokenExpiredError, InvalidTokenError } = require('../error-handling/custom-errors');

module.exports = {
    hashValue: async (value, salt) => {
        return await bcrypt.hash(value, salt);
    },

    compareHashValue: async (value, hashedValue) => {
        return await bcrypt.compare(value, hashedValue);
    },

    getAccessToken: async (userId) => {
        const accessTokenExpiryTime = new Date();
        accessTokenExpiryTime.setSeconds(accessTokenExpiryTime.getSeconds() + config.accessTokenExpiryTime);

        return jwt.sign({
            id: userId,
            expiryTime: accessTokenExpiryTime
        }, config.accessTokenSecret, {
            expiresIn: config.accessTokenSecretExpiryTime // expires in 24 hours
        });
    },

    getAcessAndRefreshTokens: async (userId) => {
        const accessTokenExpiryTime = new Date();
        accessTokenExpiryTime.setSeconds(accessTokenExpiryTime.getSeconds() + config.accessTokenExpiryTime);

        const accessToken = jwt.sign({
            id: userId,
            expiryTime: accessTokenExpiryTime
        }, config.accessTokenSecret, { expiresIn: config.accessTokenExpiryTime });

        const refreshTokenExpiryTime = new Date();
        refreshTokenExpiryTime.setSeconds(refreshTokenExpiryTime.getSeconds() + config.refreshTokenExpiryTime);

        const refreshToken = jwt.sign({
            id: userId,
            expiryTime: refreshTokenExpiryTime
        }, config.refreshTokenSecret, { expiresIn: config.refreshTokenExpiryTime });

        return {
            accessToken: accessToken,
            accessTokenExpiryTime: accessTokenExpiryTime,
            refreshToken: refreshToken,
            refreshTokenExpiryTime: refreshTokenExpiryTime
        };
    },

    validateAccessToken: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.accessTokenSecret, (err, decoded) => {

                if (err) {
                    reject(new InvalidTokenError());
                }

                return resolve(decoded);
            });
        })
    },

    validateRefreshToken: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.refreshTokenSecret, (err, decoded) => {

                if (err) {
                    reject(new InvalidTokenError());
                }

                return resolve(decoded);
            });
        })
    }
};