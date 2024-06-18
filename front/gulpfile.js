var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

gulp.task('copyright', function () {
    gulp.src(['./assets/**/*.js'])
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify({
            mangle: false,
            compress: false,
            output: {
                beautify: true
            }
        }))
        .pipe(concat('copyright.js'))
        .pipe(gulp.dest('./build/'));
});