const { TokenExpiredError } = require('../../utils/error-handling/custom-errors');
const security = require('../../utils/security/app-security');

module.exports = {
    refreshAccessToken: async (refreshToken) => {
        const data = await security.validateRefreshToken(refreshToken);

        if (data.expiryTime >= new Date()) {
            throw new TokenExpiredError();
        }

        return await security.getAccessToken(data.id);
    }
};