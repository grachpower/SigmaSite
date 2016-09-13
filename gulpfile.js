// подключение пакетов
var gulp = require('gulp'),
 cssmin = require('gulp-cssmin'),
 htmlmin = require('gulp-htmlmin'),
 spritesmith = require('gulp.spritesmith');

// объявление задачи
gulp.task('minifyhtml', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('default', function () {
    gulp.src('src/**/*.css')
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});
