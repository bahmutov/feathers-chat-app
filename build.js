'use strict'

const write = require('fs').writeFileSync
// collects .js .html .css and .json files
function collectPublicFiles (...folders) {
  const glob = require('glob')
  const join = require('path').join
  function allFilesIn (folder) {
    const extensions = ['*.js', '*.css', '*.html', '*.json']
    return extensions.reduce((all, ext) => {
      const mask = join(folder, ext)
      const foundFiles = glob.sync(mask)
      return all.concat(foundFiles)
    }, [])
  }
  const files = folders.reduce((all, folder) => {
    return all.concat(allFilesIn(folder))
  }, [])
  console.log('%d public files\n' + files.join('\n'), files.length)
  const read = require('fs').readFileSync
  const mockOptions = {}
  files.forEach((fullName) => {
    mockOptions[fullName] = read(fullName, 'utf8')
  })
  return mockOptions
}

function mockPublicFiles () {
  const mockOptions = collectPublicFiles('public', 'config')
  // console.log(mockOptions)
  const publicFiles = './public-bundle.json'
  write(publicFiles,
    JSON.stringify(mockOptions, null, 2) + '\n', 'utf8')
  console.log('saved public files contents to', publicFiles)
}
mockPublicFiles()

var fs = require('fs')
var browserify = require('browserify')
var insertGlobals = require('insert-module-globals')
browserify('./start.js', {
  builtins: false,
  // commondir: false,
  insertGlobalVars: {
    __filename: insertGlobals.vars.__filename,
    __dirname: insertGlobals.vars.__dirname,
    process: function() {
      return;
    },
  },
  browserField: false
}).bundle()
  .pipe(fs.createWriteStream('./src/out.js'))
