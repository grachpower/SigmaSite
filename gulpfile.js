// подключение пакетов
var gulp = require('gulp'),
 cssmin = require('gulp-cssmin'),
 spritesmith = require('gulp.spritesmith');

// объявление задачи
gulp.task('sprite', function () {
  return gulp.src('icons/*.png')
  	.pipe(spritesmith({
	    imgName: 'sprite.png',
	    cssName: 'sprite.css'
  	}))
  	.pipe(cssmin())
  	.pipe(gulp.dest('dist/'));
});