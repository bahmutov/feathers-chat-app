var fs = require('fs')
var browserify = require('browserify')
var insertGlobals = require('insert-module-globals')
browserify('./src/index.js', {
    builtins: false,
    commondir: false,
    insertGlobalVars: {
        __filename: insertGlobals.vars.__filename,
        __dirname: insertGlobals.vars.__dirname,
        process: function() {
            return;
        },
    },
    browserField: false,
})
.bundle()
.pipe(fs.createWriteStream('./src/out.js'))
