'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');

let files = ['index.js', 'test/*.js', 'gulpfile.js'];

gulp.task('lint', (done) => {
    return gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError()).on('error', done);
});

gulp.task('test', (done) => {
    return gulp.src('test/*.js', { read: false })
        .pipe(mocha()).on('error', done);
});

gulp.task('default', ['lint', 'test']);

gulp.task('dev', ['default', 'watch']);

gulp.task('watch', () => {
    gulp.watch(files, ['lint', 'test']);
});
