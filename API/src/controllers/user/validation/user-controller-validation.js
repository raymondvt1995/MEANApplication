const { body } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
     return [ 
        body('name', 'Name not provided').exists(),
        body('surname', 'Surname not provided').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'Password must be 8 characters').exists().isLength({min: 8})
       ]   
    }
  }
}