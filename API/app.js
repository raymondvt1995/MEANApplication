const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const helmet = require('helmet');
const morgan = require('morgan');

const { connectDatabase } = require('./src/services/database/mongo');

const testRoutes = require('./src/controllers/test/test-controller');
const userRoutes = require('./src/controllers/user/user-controller');
const tokenRoutes = require('./src/controllers/token/token-controller');
const { errorHandlingMiddleware } = require('./src/utils/error-handling/error-handling-middleware');

const app = express();

app.use(morgan('combined'));
app.use(helmet());
app.use(bodyParser.json());
app.use(cors());

app.use('/', tokenRoutes);
app.use('/', testRoutes);
app.use('/', userRoutes);

app.use(errorHandlingMiddleware);

connectDatabase().then(async () => {
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
