function initFileSystemMock () {
  const mockOptions = require('./public-bundle')
  const mock = require('mock-' + 'fs')
  // mock(mockOptions)
  global.startMockFS = function startMockFS () {
    mock(mockOptions)
  }
  global.stopMockFS = function stopMockFS () {
    mock.restore()
  }
}
// initFileSystemMock()

function writePublicFiles () {
  const mockOptions = require('./public-bundle')
  const fs = require('fs')
  const outputFolder = '/tmp'
  const dirname = require('path').dirname
  const inTemp = require('path').join.bind(null, outputFolder)
  const mkdirp = require('mkdirp')
  const write = require('fs').writeFileSync
  Object.keys(mockOptions).forEach((name) => {
    const full = inTemp(name)
    console.log('writing file', full)
    const folder = dirname(full)
    mkdirp.sync(folder)
    write(full, mockOptions[name], 'utf8')
  })
}
writePublicFiles()
require('./src/index')
