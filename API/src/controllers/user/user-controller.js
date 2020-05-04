const express = require('express');
const router = express.Router();
const userService = require('../../services/users/user-service');
const { handle } = require('../../utils/error-handling/error-handler');
const { tokenValidation } = require('../../utils/security/app-security-middleware');
const validation = require('./validation/user-controller-validation');
const { validationResult } = require('express-validator');
const { ExpressValidationError } = require('../../utils/error-handling/custom-errors');

router.route('/user').post(validation.validate('createUser'), async (req, res, next) => {
    await handle(async () => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.log(errors);
            throw new ExpressValidationError(errors.errors);
        }

        const token = await userService.create(req.body);
        res.send(token);
    }, next);
});

router.route('/user/login').post(async (req, res, next) => {
    await handle(async () => {
        const token = await userService.login(req.body);
        res.send(token);
    }, next)
});

//all endpoints below this line would require a token
router.use(tokenValidation);

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