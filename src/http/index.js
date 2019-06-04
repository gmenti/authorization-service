const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const compression = require('compression');
const i18n = require('../i18n');
const { NotFoundError } = require('../errors');

/**
 * @typedef HttpAuthInfo
 * @type {Object}
 * @property {String} clientId
 * @property {String} accessToken
 */

/**
 * @typedef HttpRequest
 * @type {import('express').Request & HttpAuthInfo}
 */

/* Routes */
const clientRoute = require('./routes/clientRoute');
const permissionRoute = require('./routes/permissionRoute');
const roleRoute = require('./routes/roleRoute');

/* Middlewares */
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');

/* Express initialization */
const app = express();

/* Express utilites */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: process.env.BODY_LIMIT,
}));

/* Status endpoint */
app.get('/status', async (req, res, next) => {
  try {
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

app.use(auth);

/* Instatiate routes */
app.use('/auth', authRoute);
app.use('/clients', clientRoute);
app.use('/clients/:clientId/permissions', permissionRoute);
app.use('/clients/:clientId/roles', roleRoute);

app.all('*', (req, res, next) => {
  next(new NotFoundError(res.__('error.notFound')));
});

app.use(errorHandler);

module.exports = app;
