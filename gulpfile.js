var gulp = require('gulp');
// sass conversion
var sass = require('gulp-sass');
// Minify conversion
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
// error log
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');

//CSS file
gulp.task('css-dashboard', function () {
    return gulp.src('scss/dashboard.scss')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(gulp.dest('css/'))
        .pipe(minifyCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: 'scss/'
        }))
        .pipe(gulp.dest('css/'))
});

//Javascript file
gulp.task('js-app', function () {
    return gulp.src('js/app.js')
        .pipe(plumber({
            errorHandler: onError
        }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('js/'));
});

var onError = function (err) {
    gutil.beep();
    console.log(err);
};

//sass watcher
gulp.task('watch', function () {
    gulp.watch('scss/dashboard.scss', gulp.series('css-dashboard'));
    gulp.watch('js/app.js', gulp.series('js-app'));
})