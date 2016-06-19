'use strict';

const join = require('path').join;
const exists = require('fs').existsSync;
const write = require('fs').writeFileSync;
const errors = require('feathers-errors');

module.exports = function(app) {
  return function dbSet(req, res, next) {
    // TODO factor out common features with db-dump
    // console.log(req.body)

    const serviceName = req.body.service;
    if (!serviceName) {
      return next(new Error('Missing service name'));
    }
    const newDB = req.body.db;
    if (!newDB) {
      return next(new Error('Missing new db'));
    }

    const service = app.service(serviceName);
    if (!service) {
      return next(new Error('Cannot find service ' + serviceName));
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

    console.log('setting db for service', serviceName);
    if (typeof service.Model.loadDatabase !== 'function') {
      return next(new Error('Cannot find loadDatabase'));
    }

    write(dbPath, req.body.db, 'utf8');
    service.Model.loadDatabase(function (err) {
      if (err) {
        return next(err);
      }
      console.log('replaced %s with new contents', dbPath);
      res.status(200).end();
    });
  };
};
