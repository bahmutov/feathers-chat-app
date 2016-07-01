'use strict';

const path = require('path');
const serveStatic = require('feathers').static;
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const feathers = require('feathers');
// const configuration = require('feathers-configuration');
const hooks = require('feathers-hooks');
const rest = require('feathers-rest');
const bodyParser = require('body-parser');
// const socketio = require('feathers-socketio');
const middleware = require('./middleware');
const services = require('./services');

const privateFoo = require('@bahmutov/private-foo');
console.log('I include', privateFoo);

const app = feathers();

// app.configure(configuration(__dirname));
const defaults = require('./config/default')
Object.keys(defaults).forEach((key) => {
  // TODO adjust the paths, merge environment settings, etc
  var value = defaults[key]
  function isPath(s) {
    return /^\./.test(s)
  }
  if (isPath(value)) {
    console.log('resolving', value)
    value = path.resolve(__dirname, value)
    console.log('resolved', value)
  }
  app.set(key, value);
});

app.use(compress())
  .options('*', cors())
  .use(cors())
  // .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .configure(hooks())
  .configure(rest())
  // .configure(socketio())
  .configure(services)
  .configure(middleware);

module.exports = app;
