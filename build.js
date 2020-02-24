#!/usr/bin/env node
var fs = require('fs');
var path = require('path');

var resumeFile = path.join(__dirname, 'resume.json')

fs.readFile(resumeFile, function(err, resumeJson) {
  if (err) {
    console.log('resume.json does not exist')
    return;
  }

  var json = JSON.parse(resumeJson)
  var render = require('./index.js').render
  fs.writeFileSync(__dirname + '/public/index.html', render(json))
})