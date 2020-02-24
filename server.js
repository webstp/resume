var fs = require('fs');
var path = require('path');
var browserSync = require('browser-sync');
var schema = require('resume-schema');
var theme = require('./index.js');

// resume is either read from a local file, or an example.
var getResume = function() {
    try {
        var localResume = fs.readFileSync(path.join(__dirname, '/resume.json'), 'utf-8');
        return JSON.parse(localResume);
    } catch (e) {
        var exampleResume = fs.readFileSync(path.join(__dirname, '/node_modules/resume-cli/lib/init-resume.json'));
        return JSON.parse(exampleResume)
    }
};

// BrowserSync watches those two files, nodemon takes care of the others.
browserSync.init({
    files: ['resume.hbs', 'resume.json'],
    server: {
        baseDir: 'public',
        middleware: function(req, res, next) {
            res.end(theme.render(getResume()));
        }
    },
    injectChanges: false,
    notify: false
});