var gulp = require('gulp'), // Подключаем Gulp
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    htmlmin = require('gulp-html-minifier'), // Подключаем библиотеку для минификации html
    imageminJpegtran = require('imagemin-jpegtran'), // Подключаем библиотеку для минификации JPEG
    watch = require('gulp-watch'),
    fileinclude = require('gulp-file-include'),
    sass = require('gulp-sass');

gulp.task('fileinclude', function() {
  gulp.src(['index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('./'));
});

gulp.task('sass', function () {
  return gulp.src('src/scss/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('stream', function () {
    // Endless stream mode
    return watch('css/**/*.scss', { ignoreInitial: false })
        .pipe(gulp.dest('dist'));
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
gulp.task('build', ['clean', 'sass', 'img', 'htmlmin', 'css-libs', 'stream'], function() {});
