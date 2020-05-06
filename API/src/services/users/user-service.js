const UserModel = require('../database/models/user');
const { EntityNotFoundError, EntityAlreadyExists, InvalidPasswordError, ValidationFailedError } = require('../../utils/error-handling/custom-errors');
const security = require('../../utils/security/app-security');

module.exports = {
    create: async (userDTO) => {
        const existingUser = await UserModel.findOne({ email: userDTO.email });

        if (existingUser) {
            throw new EntityAlreadyExists('User', `Email "${userDTO.email}" already registered to another user!`);
        }

        const hashedPassword = await security.hashValue(userDTO.password, 9);

        const user = new UserModel({
            name: userDTO.name,
            surname: userDTO.surname,
            email: userDTO.email,
            password: hashedPassword
        });

        const createdUser = await user.save();

        return await security.getAcessAndRefreshTokens(createdUser._id);
    },

    delete: async (id) => {
        const user = await UserModel.findById(id);

        if (user) {
            await user.delete();
        } else {
            throw new EntityNotFoundError('User', `User ${id} does not exist!`)
        }
    },

    getByEmail: async (email) => {
        const user = await UserModel.findOne({ email: email });

        if (!user) {
            console.log(`User not found`);
            throw new EntityNotFoundError('User', `User ${email} does not exist!`)
        }

        return user;
    },

    getById: async (id) => {
        const user = await UserModel.findById(id);

        if (!user) {
            throw new EntityNotFoundError('User', `User ${id} does not exist!`)
        }

        return user;
    },

    update: async (id, userDTO) => {
        const user = await UserModel.findById(id);

        if (!user) {
            throw new EntityNotFoundError('User', `User ${id} does not exist!`)
        }

        user.name = userDTO.name;
        user.surname = userDTO.surname;

        user.save();
    },

    login: async (loginDTO) => {
        if (!loginDTO.email || !loginDTO.password) {
            throw new ValidationFailedError('Login detils provided!');
        }

        const user = await UserModel.findOne({ email: loginDTO.email });

        if (!user) {
            throw new EntityNotFoundError('User', `User ${loginDTO.email} does not exist!`);
        }

        const matched = await security.compareHashValue(loginDTO.password, user.password);

        if (!matched) {
            throw new InvalidPasswordError();
        }

        return await security.getAcessAndRefreshTokens(user._id);
    }
}