const mockOptions = require('./public-bundle')
const mock = require('mock-' + 'fs')
// mock(mockOptions)
global.startMockFS = function startMockFS () {
  mock(mockOptions)
}
global.stopMockFS = function stopMockFS () {
  mock.restore()
}
require('./src/index')
