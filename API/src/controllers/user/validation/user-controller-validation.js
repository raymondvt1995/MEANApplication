const { body } = require('express-validator');

exports.validate = (method) => {
  switch (method) {
    case 'createUser': {
      return [
        body('name', 'Name not provided').exists(),
        body('surname', 'Surname not provided').exists(),
        body('email', 'Invalid email').exists().isEmail(),
        body('password', 'Password should be combination of one uppercase, one lower case, one special char, one digit and min 8 lenght').matches(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/)
      ]
    }

    case 'loginUser': {
      return [
        body('email', 'Email not provided').exists(),
        body('password', 'Password not provided').exists()
      ]
    }
  }
}