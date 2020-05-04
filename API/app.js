//api
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//security
const helmet = require('helmet'); //to-do investigate
//logging
const morgan = require('morgan');
//database
const { connectDatabase } = require('./src/services/database/mongo');
//routes
const testRoutes = require('./src/controllers/test-controller');
const userRoutes = require('./src/controllers/user-controller');

const { errorHandlingMiddleware } = require('./src/utils/error-handling/error-handling-middleware');

const app = express();

app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use('/', testRoutes);
app.use('/', userRoutes);

app.use(errorHandlingMiddleware);

connectDatabase().then(async () => {
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
