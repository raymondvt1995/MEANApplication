const mongoose = require('mongoose');

module.exports = {
    connectDatabase: async () => {
        const connection = await mongoose .connect('mongodb://localhost:27017/MEANData', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Mongo DB Connection established')
    }
};