const express = require('express');
const router = express.Router();
const checkJwt = require('../utils/jwt-validator');
const userService = require('../services/users/user-service');
const { handle } = require('../utils/error-handling/error-handler');

router.use(checkJwt); // all endpoints after this one would require tokens

router.route('/user').post(async (req, res, next) => {
    await handle(async () => {
        const user = await userService.create(req.body);
        res.send(user);
    }, next);
});

router.route('/user/:id').delete(async (req, res, next) => {
    await handle(async () => {
        const user = await userService.delete(req.params.id);
        res.end();
    }, next);
});

router.route('/user/:id').put(async (req, res, next) => {
    await handle(async () => {
        await userService.update(req.params.id, req.body);
        res.status(204).end();
    }, next);
});

router.route('/user/:id').get(async (req, res, next) => {
    await handle(async () => {
        const user = await userService.getById(req.params.id);
        res.send(user);
    }, next);
});

router.route('/user/by-email/:email').get(async (req, res, next) => {
    await handle(async () => {
        const user = await userService.getByEmail(req.params.email);
        res.send(user);
    }, next);
});

module.exports = router;