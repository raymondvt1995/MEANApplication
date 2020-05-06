const { TokenExpiredError } = require('../../utils/error-handling/custom-errors');
const security = require('../../utils/security/app-security');

module.exports = {

    refreshToken: async (refreshToken) => {
        const data = security.validateRefreshToken(refreshToken);

        if (data.expiryTime >= new Date()) {
            throw new TokenExpiredError();
        }

        return security.getAccessToken(data.id);
    }

};