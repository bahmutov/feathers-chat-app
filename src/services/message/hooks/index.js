'use strict';

const auth = require('feathers-authentication').hooks;
const hooks = require('feathers-hooks');

const process = require('./process');
const globalHooks = require('../../../hooks');
const populateSender = hooks.populate('sentBy', {
  service: 'users',
  field: 'userId'
});

exports.before = {
  all: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  find: [],
  get: [],
  create: [process()],
  update: [hooks.remove('sentBy')],
  patch: [hooks.remove('sentBy')],
  remove: []
};

exports.after = {
  all: [],
  find: [populateSender],
  get: [populateSender],
  create: [populateSender],
  update: [],
  patch: [],
  remove: []
};
