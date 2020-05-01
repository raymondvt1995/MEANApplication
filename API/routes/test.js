const express = require('express');
const router = express.Router();
const checkJwt = require('../utils/jwt-validator');

router.route('/test').get(async (req, res) => {
    res.send(`Un-secure endpoint. API is Alive!`);
});

router.use(checkJwt); // all endpoints after this one would require tokens

router.route('/test-secure').get(async (req, res) => {
    res.send(`Security Passed API is Alive!`);
});

module.exports = router;