var gulp = require('gulp');
var server = require('gulp-webserver');
var buy = require('./mock/data.json');
var uglify = require('gulp-uglify');
var mincss = require('gulp-clean-css');
var sass = require('gulp-sass');
gulp.task('mincss', function() {
    gulp.src('src/css/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('./src/css'))
})
gulp.task('uglify', function() {
    gulp.src('src/js/app/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./src/js/app/min'))
})
gulp.task('min', ['mincss', 'uglify']);
gulp.task('server', ['min'], function() {
    gulp.src('src')
        .pipe(server({
            port: 8099,
            open: true,
            middleware: function(req, res, next) {
                if (req.uel === '/favicon.ico') {
                    return;
                }
                if (req.url === '/api/buy') {
                    res.end(JSON.stringify(buy))
                }
                next()
            }
        }))
})
gulp.task('default', ['server']);