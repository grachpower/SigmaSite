var gulp = require('gulp'), // Подключаем Gulp
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    htmlmin = require('gulp-html-minifier'), // Подключаем библиотеку для минификации html
    imageminJpegtran = require('imagemin-jpegtran'), // Подключаем библиотеку для минификации JPEG
    watch = require('gulp-watch'),
    sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('.src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('.src/css'));
});

// собираем css - gulp css-libs
gulp.task('css-libs', function() {
    return gulp.src('src/css/style.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

// минифицируем html
gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/'));
});

//сжимаем изображения
gulp.task('img', function() {
    return gulp.src('src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img/'));
});

// очищаем папку dist преред сборкой - gulp clean
gulp.task('clean', function() {
    return del.sync('dist');
});

// собираем проект
gulp.task('build', ['clean', 'img', 'htmlmin', 'css-libs'], function() {});
