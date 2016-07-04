function mockPublicFiles () {
  const glob = require('glob')
  const files = glob.sync('src/public/*.js').concat(glob.sync('src/public/*.html'))
  console.log('public files\n' + files.join('\n'))
  const read = require('fs').readFileSync
  const write = require('fs').writeFileSync
  const mockOptions = {}
  files.forEach((fullName) => {
    mockOptions[fullName] = read(fullName, 'utf8')
  })
  // console.log(mockOptions)
  const publicFiles = './public-bundle.json'
  write(publicFiles,
    JSON.stringify(mockOptions, null, 2) + '\n', 'utf8')
  console.log('saved public files contents to', publicFiles)
}
// mockPublicFiles()

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
