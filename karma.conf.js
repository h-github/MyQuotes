/**
 * Created by hamid on 2016-09-13.
 */
'use strict';

var path = require('path');
var conf = require('./gulp/conf');

var _ = require('lodash');
var wiredep = require('wiredep');

function listFiles() {
    var wiredepOptions = _.extend({}, conf.wiredep, {
        dependencies: true,
        devDependencies: true
    });

    return wiredep(wiredepOptions).js
        .concat([
            path.join(conf.paths.src, '/app/**/*.module.js'),
            path.join(conf.paths.src, '/app/**/*.js'),
            path.join(conf.paths.src, '/**/*.html'),
            path.join(conf.paths.src, '../tests/unit/*.js'),
        ]);
}

module.exports = function (config) {

    var configuration = {
        files: listFiles(),

        singleRun: true,

        autoWatch: false,

        frameworks: ['jasmine', 'angular-filesort'],

        angularFilesort: {
            whitelist: [path.join(conf.paths.src, '/**/!(*.html|*.spec|*.mock).js')]
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'src/'
        },

        //browsers: ['PhantomJS',
        browsers: ['Chrome'],

        //reporters: ["spec"],
        reporters: ["kjhtml"],

        specReporter: {
            maxLogLines: 5,         // limit number of lines logged per test
            suppressErrorSummary: true,  // do not print error summary
            suppressFailed: false,  // do not print information about failed tests
            suppressPassed: true,  // do not print information about passed tests
            suppressSkipped: true  // do not print information about skipped tests
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine-html-reporter',
            'karma-angular-filesort',
            'karma-jasmine',
            'karma-spec-reporter',
            'karma-ng-html2js-preprocessor'
        ],

        preprocessors: {
            './src/**/*.html': ['ng-html2js']
        },

        // level of logging, possible values:
        // config.LOG_DISABLE
        // config.LOG_ERROR
        // config.LOG_WARN
        // config.LOG_INFO
        //logLevel: config.LOG_DEBUG,
        logLevel: config.LOG_INFO,

        colors: true

        proxies:{
            '/home': 'http://localhost:3000'
        }
    };

    // This block is needed to execute Chrome on Travis
    // If you ever plan to use Chrome and Travis, you can keep it
    // If not, you can safely remove it
    // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
    // if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    //   configuration.customLaunchers = {
    //     'chrome-travis-ci': {
    //       base: 'Chrome',
    //       flags: ['--no-sandbox']
    //     }
    //   };
    //   configuration.browsers = ['chrome-travis-ci'];
    // }

    config.set(configuration);
};