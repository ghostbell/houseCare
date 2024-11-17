'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const watch = require('gulp-watch');

gulp.task('less', function () {
    return gulp.src('./src/css/main-styles.less')
        .pipe(less())
        .pipe(gulp.dest('./dist/css'))
        .pipe(cleanCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist/css'));
});

gulp.task('watch', function () {
    gulp.watch('./src/css/*.less', gulp.series('less'));
});

gulp.task('default', gulp.series('watch', 'less'));