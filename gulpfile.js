"use strict";

var gulp = require('gulp');
var browserify = require('browserify'); //Bundles JS
var replace = require('gulp-replace');//replace strings
var gutil = require('gulp-util'); // Utilities for gulp plugins
var concat = require('gulp-concat'); // Concatenates files
var cssnano = require('gulp-cssnano'); // Minify CSS with cssnano
var source = require('vinyl-source-stream'); //Use Conventional text streams

var AppConfig = require("./appConfig");

function logError(error) {
    return gutil.log(gutil.colors.red('Error (' + error.plugin + '): ' + error.message));
}

var config = {
    paths: {
        // source
        html: './src/html/**/*.+(html|nunjucks)',
        js: './src/**/*.js',
        mainJs: './src/js/main.js',
        css: './src/css/*.css',
        images: './src/images/**/*',
        styles: './src/styles/*',

        // build
        dist: gutil.env.prod ? './dist/prod/' : './dist/dev/',
    }
};

//gulp.task('js', function () {
//    browserify(config.paths.mainJs, {
//        standalone: '$2NLib'
//    })
//    .bundle()
//    .pipe(source('bundle.js'))
//    .pipe(gutil.env.prod ? streamify(uglify()) : gutil.noop())
//    .on('error', logError)
//    .pipe(gulp.dest(config.paths.dist + '/scripts'));
//});


gulp.task('js', function () {
    browserify(config.paths.mainJs, {
        standalone: '$MyLib'
    })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(replace("@MapboxApiKey@", AppConfig.mapboxApiKey))
    .pipe(gutil.env.prod ? streamify(uglify()) : gutil.noop())
    .on('error', logError)
    .pipe(gulp.dest(config.paths.dist + '/scripts'));
});

gulp.task('css', function () {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(gutil.env.prod ? cssnano() : gutil.noop())
        .pipe(gulp.dest(config.paths.dist + '/css'));
});

gulp.task('styles', function () {
    gulp.src(config.paths.styles)
        .pipe(replace("@OpenMapTilesApiKey@", AppConfig.openMapTilesApiKey))
        .pipe(gulp.dest(config.paths.dist + '/styles'));
});

gulp.task('html', function () {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist));
});

gulp.task('images', function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + '/images'));
});

gulp.task('watch', function () {
//    gulp.watch(config.paths.html, ['nunjucks.render']);
//    gulp.watch(config.paths.precompiled, ['nunjucks.precompile']);
    gulp.watch(config.paths.styles, ['styles']);
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.php, ['php']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('nunjucks.render', function() {
    return gulp.src([
            config.paths.pages
        ])
        .pipe(nunjucksRender({
            path: [config.paths.templates]
        }))
        .on('error', logError)
        // set version in package.json
        .pipe(versionAppend(['js', 'css']))
        .pipe(gulp.dest(config.paths.dist));
});

// Using nunjucks templates in the browser
gulp.task('nunjucks.precompile', function () {
    return gulp.src(config.paths.precompiled)
        .pipe(nunjucks.precompile())
        .pipe(concat('templates.js'))
        .pipe(gulp.dest(config.paths.dist+'/scripts'));
});

gulp.task('nunjucks', ['nunjucks.render', 'nunjucks.precompile']);

gulp.task('default', ['html', 'js', 'css', 'watch', 'styles', 'images']);

// to minify:
//      gulp build --prod
gulp.task('build', ['js', 'css']);