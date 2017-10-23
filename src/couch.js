'use strict'

var request = require('request')

module.exports.getDesignDocs = function (options, callback) {


  if (! options.db) { console.log('No db'); return callback(null, null); }


  options.host = options.host.toLowerCase();
  var url = '';
  var protocol = options.host.indexOf('https://') === 0 ? 'https' : 'http';
  var plainHost = options.host.replace('https://', '').replace('http://', '');

  if (options.user && options.password) {
    url =  protocol + '://' + options.user  + ':' + options.password + '@' + plainHost ;
  } else {
    url = protocol + '://' + plainHost ;
  }

  url = url + '/' + options.db + '/_all_docs?startkey="_design/"&endkey="_design0"&include_docs=true';

  console.log(url);

  request(url, function (error, response, body) {

    if (error) {
      return callback(error, null);
    } else {

      var designDocs =  JSON.parse(body).rows.map(function (row) {
        return row.doc;
      })

      callback(null, designDocs)
    }

  });

}
