'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')({
    pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

gulp.task('partials', function () {
    return gulp.src([
        path.join(conf.paths.src, '/app/**/*.html'),
        path.join(conf.paths.tmp, '/serve/app/**/*.html')
    ])
        .pipe($.htmlmin({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe($.angularTemplatecache('templateCacheHtml.js', {
            module: 'myQuotes',
            root: 'app'
        }))
        .pipe(gulp.dest(conf.paths.tmp + '/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src(path.join(conf.paths.tmp, '/partials/templateCacheHtml.js'), { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: path.join(conf.paths.tmp, '/partials'),
        addRootSlash: false
    };

    var htmlFilter = $.filter('*.html');
    var jsFilter = $.filter('**/*.js');
    var cssFilter = $.filter('**/*.css');
    var assets;

    return gulp.src(path.join(conf.paths.tmp, '/serve/*.html'))

        //We're not using injectable partials. This line doesn't do anything
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))

        //Getting assets from index.html located between markers such as  <!-- build:js(src) scripts/vendor.js --> (adding js and css files to the stream)
        //.pipe(assets = $.useref.assets())
        .pipe($.useref())

        //Adding a version number to prevent from caching (e.g. vendor-012cbb9f48.css)
        .pipe($.rev())

        //Starting working with js files
        .pipe(jsFilter)

        //Automatic angular annotations for safe uglifying
        .pipe($.ngAnnotate())

        //JS minification
        .pipe($.uglify({ preserveComments: $.uglifySaveLicense, mangle: false })).on('error', conf.errorHandler('Uglify'))
        .pipe(jsFilter.restore())

        //Starting to work with css files
        .pipe(cssFilter)

        //CSS minification and optimization
        //.pipe($.csso())
        .pipe($.cssnano({
            reduceIdents: {
                keyframes: false
            },
            discardUnused: {
                keyframes: false
            }
        }))
        .pipe(cssFilter.restore())
        //.pipe(assets.restore())

        //Concatenate all files between markers
        .pipe($.useref())

        //Substitute filenames with the ones provided by $.rev()
        .pipe($.revReplace())

        //Minify html
        .pipe(htmlFilter)
        //.pipe($.minifyHtml({
        .pipe($.htmlmin({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(htmlFilter.restore())

        //Save all files involved in the stream to the 'dist' folder
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')))
        .pipe($.size({ title: path.join(conf.paths.dist, '/'), showFiles: true }));
});

// Only applies for fonts from bower dependencies
// Custom fonts are handled by the "other" task
gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
        .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
        .pipe($.flatten())
        .pipe(gulp.dest(path.join(conf.paths.dist, '/fonts/')));
});

gulp.task('other', function () {
    var fileFilter = $.filter(function (file) {
        return file.stat.isFile();
    });

    return gulp.src([
        path.join(conf.paths.src, '/**/*'),
        path.join('!' + conf.paths.src, '/**/*.{html,css,js,scss,json}')
    ])
        .pipe(fileFilter)
        .pipe(gulp.dest(path.join(conf.paths.dist, '/')));
});

gulp.task('clean', function (done) {
    $.del([path.join(conf.paths.dist, '/'), path.join(conf.paths.tmp, '/')], done);
});

gulp.task('build', ['html', 'fonts', 'other']);