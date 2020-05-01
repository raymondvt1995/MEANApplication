const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');

module.exports = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev--cq25qo9.auth0.com/.well-known/jwks.json'
    }),
  
    // Validate the audience and the issuer.
    audience: 'https://express-tutorial-api',
    issuer: 'https://dev--cq25qo9.auth0.com/',
    algorithms: ['RS256']
  });
  