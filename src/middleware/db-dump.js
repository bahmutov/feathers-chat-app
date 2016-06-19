'use strict';

const join = require('path').join
const exists = require('fs').existsSync

module.exports = function(app) {
  return function dumpDB(req, res, next) {
    const serviceName = req.params.service
    if (!serviceName) {
      return next(new Error('Missing service name'))
    }

    const nedb = app.get('nedb')
    if (!nedb) {
      return next(new Error('Missing NeDB setting'))
    }

    const dbPath = join(nedb, `${serviceName}.db`)
    if (!exists(dbPath)) {
      return next(new Error('Missing db file ' + dbPath))
    }

    console.log('dumping DB', dbPath)
    return res.download(dbPath)
  };
};
