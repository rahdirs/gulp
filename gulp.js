// CSS file 
gulp.task('css-style', function () {
  return gulp.src('common/scss/style.scss')
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
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('common/js/'));
});

// Gulp watch
gulp.task('watch', function () {
  gulp.watch('common/scss/style.scss', ['css-style']);
  gulp.watch('common/js/app.js', ['js-app']);
})

