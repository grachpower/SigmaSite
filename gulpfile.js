var gulp = require('gulp'), // Подключаем Gulp
    cssnano = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
    del = require('del'), // Подключаем библиотеку для удаления файлов и папок
    imagemin = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
    pngquant = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
    htmlmin = require('gulp-htmlmin'), // Подключаем библиотеку для минификации html
    imageminJpegtran = require('imagemin-jpegtran'), // Подключаем библиотеку для минификации JPEG
    tinypng = require('gulp-tinypng'); // подключаем библиотеку для минификации изображений

// собираем css - gulp css-libs
gulp.task('css-libs', function() {
    return gulp.src('src/css/style.css') // Выбираем файл для минификации
        .pipe(cssnano()) // Сжимаем
        .pipe(gulp.dest('dist/css')); // Выгружаем в папку dist/css
});

// минифицируем html
gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(gulp.dest('dist/minHtml'))
})

//сжимаем изображения
gulp.task('img', function() {
    return gulp.src('src/img/**/*') // Берем все изображения из src
        .pipe(imagemin({ // Сжимаем их с наилучшими настройками
            interlaced: true,
            progressive: true,
            svgoPlugins: [{
                removeViewBox: false
            }],
            use: [pngquant(), imageminJpegtran()]
        }))
        .pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('tinypng', ['img'], function() {
    return gulp.src('src/img/**/*')
        .pipe(tinypng('API_KEY'))
        .pipe(gulp.dest('dist/img'));
});

// очищаем папку dist преред сборкой - gulp clean
gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

// собираем проект
gulp.task('build', ['clean', 'img', 'htmlmin', 'css-libs', 'scripts'], function() {});
