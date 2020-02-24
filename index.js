var fs = require("fs");
var path = require('path')
var Handlebars = require("handlebars");
var sass = require('sass')

var helpers = require('./lib/helpers');

Handlebars.registerHelper(helpers);

module.exports = {
  render: function(resume) {
		var css = sass.renderSync({file: './assets/styles/styles.scss'}).css
    var template = fs.readFileSync(__dirname + '/views/resume.hbs', 'utf-8')
    var scramble = fs.readFileSync(__dirname + '/node_modules/email-scramble/index.js')
		var js = fs.readFileSync(__dirname + '/assets/js/main.js')
		var partialsDir = path.join(__dirname, 'views/partials')
		var filenames = fs.readdirSync(partialsDir)

		filenames.forEach(function (filename) {
			var matches = /^([^.]+).hbs$/.exec(filename)
			if (!matches) {
				return
			}
			var name = matches[1]
			var filepath = path.join(partialsDir, filename)
			var template = fs.readFileSync(filepath, 'utf8')

			Handlebars.registerPartial(name, template);
		});

    return Handlebars.compile(template)({
      css: css,
      scramble: scramble,
			js: js,
      resume: resume
    });
  }
};