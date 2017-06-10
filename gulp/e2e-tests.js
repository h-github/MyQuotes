'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var protractor = require("gulp-protractor").protractor;

var browserSync = require('browser-sync');
var protractor = require("gulp-protractor").protractor;

function runProtractor (done) {
  gulp.src(path.join(conf.paths.e2e, '/**/*.js'))
    .pipe(protractor({
      configFile: 'tests/e2e/e2e.conf.js',
      args: ['--baseUrl', 'http://127.0.0.1:8000']
    }))
    .on('error', function (e) { throw e })
    .on('end', function () {
      // Close browser sync server
      browserSync.exit();
      done();
    });
}

gulp.task('protractor',  runProtractor);
