'use strict'

var minimist =  require('minimist')
var couch =  require('./src/couch')
var parser = require('./src/parser')


couch.getDesignDocs({host: '127.0.0.1:5984', db: 'facilities'}, function (e, r) {
  if (e) {
    return console.error(e)
  }

  parser.parse(r ,function (e2, r2) {
    console.log(e2);
    console.log(r2);
  })

})


