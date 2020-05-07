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
        return signJwtToken(userId, config.accessTokenSecret, config.accessTokenExpiryTime);
    },

    getAccessAndRefreshTokens: async (userId) => {
        const accessTokenDetails = signJwtToken(userId, config.accessTokenSecret, config.accessTokenExpiryTime);
        const refreshTokenDetails = signJwtToken(userId, config.refreshTokenSecret, config.refreshTokenExpiryTime);

        return {
            accessToken: accessTokenDetails.token,
            accessTokenExpiryTime: accessTokenDetails.expiryTime,
            refreshToken: refreshTokenDetails.token,
            refreshTokenExpiryTime: refreshTokenDetails.expiryTime
        };
    },

    validateAccessToken: async (token) => {
        return new Promise((resolve, reject) => {
            jwt.verify(token, config.accessTokenSecret, (err, decoded) => {

                if (err) {
                    if (err instanceof jwt.TokenExpiredError) {
                        reject(new TokenExpiredError());
                    }

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
                    if (err instanceof jwt.TokenExpiredError) {
                        reject(new TokenExpiredError());
                    }

                    reject(new InvalidTokenError());
                }

                return resolve(decoded);
            });
        })
    }
};

function signJwtToken(userId, secret, expiryTime) {
    const tokenExpiryTime = new Date();
    tokenExpiryTime.setSeconds(tokenExpiryTime.getSeconds() + expiryTime);

    const token = jwt.sign({ id: userId, expiryTime: tokenExpiryTime }, secret, { expiresIn: expiryTime });

    return {
        token: token,
        expiryTime: tokenExpiryTime
    }
}