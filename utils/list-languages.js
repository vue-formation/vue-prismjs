var path = require('path')
var fs = require('fs')

fs.readdir(path.resolve(__dirname, '../node_modules/prismjs/components'), function (err, files) {
  if (err) throw err
  var list = []

  files.forEach(function (file) {
    var l = file.replace(/^(prism-)(.*)\.js$/, '$2')
    if (!l.match(/\.min$/)) list.push(l)
  })
  console.log(JSON.stringify(list).replace(/"/g, "'").replace(/,/g, ", "))
})