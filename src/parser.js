'use strict'

module.exports.parse = function (designDocs, callback) {

  var folders = [];
  var files = [];

 designDocs.forEach(function (doc) {
   var baseFolder = doc._id.replace('_design' ,'')
    folders.push(baseFolder)
    files.push({
      path: baseFolder + '/_id',
      content: doc._id
    })
   files.push({
     path: baseFolder + '/language',
     content: doc.language
   })
   var viewIds =  Object.keys(doc.views)
   viewIds.forEach(function (id) {
     folders.push(baseFolder + '/' + id)
     var view = doc.views[id]
     if (view.map) {
       files.push({
         path: baseFolder + '/' + id + '/map.js',
         content: view.map
       })
     }
     if (view.reduce) {
       files.push({
         path: baseFolder + '/' + id + '/reduce.js',
         content: view.reduce
       })
     }
   })
  })

  callback(null, {folders: folders, files: files})
}