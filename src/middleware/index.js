'use strict';

const dbSet = require('./db-set');

const dbDump = require('./db-dump');

const signup = require('./signup');

const handler = require('feathers-errors/handler');
const notFound = require('./not-found-handler');
const logger = require('./logger');

module.exports = function() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.post('/signup', signup(app));
  app.get('/db-dump/:service', dbDump(app));
  app.post('/db-set', dbSet(app));

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
};
