var gulp = require('gulp');
// SASS conversion
var sass = require('gulp-sass');
// Minify conversion
var minifyCss = require('gulp-minify-css');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var strip = require('gulp-strip-comments');
// Error log
var plumber = require('gulp-plumber');
var gutil = require('gulp-util');
// Browser sync and live reload
var bs = require('browser-sync').create();
// CSS file 
gulp.task('css-style', function () {
  return gulp.src('common/scss/style.scss')
     .pipe(plumber({
	errorHandler: onError
     }))
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(gulp.dest('common/css'))
    .pipe(minifyCss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.', {
      includeContent: false,
      sourceRoot: 'common/scss/'
    }))
    .pipe(gulp.dest('common/css'))
});

// Javascript file
gulp.task('js-app', function () {
  gulp.src('common/js/app.js')
	.pipe(strip())
    .pipe(rename({
      basename: 'main'
    }))
    .pipe(gulp.dest('common/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('common/js/'));
});
var onError = function (err) {
  gutil.beep();
  console.log(err);
};
gulp.task('browser-sync', ['sass_flex'], function() {
  bs.init({
      port: 8005,
      proxy: "localhost:8005" 
  });
});
// Gulp watch
gulp.task('watch',['browser-sync'], function () {
  gulp.watch('common/scss/style.scss', ['css-style']).on('change', bs.reload);
  gulp.watch('common/js/app.js', ['js-app']);
})
