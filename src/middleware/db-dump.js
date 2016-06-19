'use strict';

const join = require('path').join;
const exists = require('fs').existsSync;
const errors = require('feathers-errors');

module.exports = function(app) {
  return function dbDump(req, res, next) {
    const serviceName = req.params.service;
    if (!serviceName) {
      return next(new Error('Missing service name'));
    }

    const secret = app.get('dumb-db-secret');
    if (req.headers['dumb-db-secret'] !== secret) {
      return next(new errors.NotAuthenticated('Missing token'));
    }

    const nedb = app.get('nedb');
    if (!nedb) {
      return next(new Error('Missing NeDB setting'));
    }

    const dbPath = join(nedb, `${serviceName}.db`);
    if (!exists(dbPath)) {
      return next(new Error('Missing db file ' + dbPath));
    }

    console.log('dumping DB', dbPath);
    return res.download(dbPath);
  };
};
