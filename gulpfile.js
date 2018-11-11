'use strict';

const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const gulp = require('gulp');

let files = ['index.js', 'test/*.js', 'gulpfile.js'];

function lintTask(cb) {
    gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
    cb();
}

function testTask(cb) {
    gulp.src('test/*.js', { read: false })
        .pipe(mocha());
    cb();
}

const defaultTask = gulp.series(lintTask, testTask);

function watchTask(cb) {
    gulp.watch(files, defaultTask);
    cb();
}

const devTask = gulp.series(defaultTask, watchTask);

exports.default = defaultTask;
exports.dev = devTask;
