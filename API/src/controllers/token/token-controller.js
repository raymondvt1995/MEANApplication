const tokenService = require('../../services/tokens/token-service');
const express = require('express');
const router = express.Router();
const { handle, handleAndValidate } = require('../../utils/error-handling/request-handler');

router.route('/token/refresh/:refreshToken').get(async (req, res, next) => {
    await handle(async () => {
        const accessToken = await tokenService.refreshAccessToken(req.params.refreshToken);

        res.send(accessToken);
    }, next);
});

module.exports = router;