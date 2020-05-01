const UserModel = require('../database/models/user');
const { EntityNotFoundError, EntityAlreadyExists } = require('../../utils/error-handling/custom-errors');

module.exports = {
    create: async (userDTO) => {
        const existingUser = await UserModel.findOne({ email: userDTO.email });

        if (existingUser) {
            throw new EntityAlreadyExists('User', `Email "${userDTO.email}" already registered to another user!`);
        }

        const user = new UserModel({
            name: userDTO.name,
            surname: userDTO.surname,
            email: userDTO.email,
            password: userDTO.password
        });

        return await user.save();
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
        const user = await UserModel.find({email: email});

        if (!user) {
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
    }
}