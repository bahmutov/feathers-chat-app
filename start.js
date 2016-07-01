require('./src/index')
const mockOptions = require('./public-bundle')
const mock = require('mock-' + 'fs')
mock(mockOptions)
