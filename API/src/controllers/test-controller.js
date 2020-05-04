const express = require('express');
const router = express.Router();

router.route('/test').get(async (req, res) => {
    res.send(`Un-secure endpoint. API is Alive!`);
});

router.route('/test-secure').get(async (req, res) => {
    res.send(`Security Passed API is Alive!`);
});

module.exports = router;