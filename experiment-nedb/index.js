// test replacing loaded NeDB at runtime
const NeDB = require('nedb')
const db = new NeDB({
  filename: './test.db',
  autoload: true
})

db.insert([{a: 1}, {a: 2}, {a: 3}], function (err) {
  if (err) {
    return console.error(err)
  }
  console.log('inserted 3 records')
})

// copy mock.db to test.db

setTimeout(function () {
  // reload DB
  db.loadDatabase(function (err) {
    if (err) {
      return console.error(err)
    }
    console.log('all records')
    db.find({}, function (err, docs) {
      if (err) {
        return console.error(err)
      }
      console.log(docs)
    })
  })

}, 10000)
