var eslint = require('gulp-eslint')
var gulp = require('gulp')
var jest = require('gulp-jest').default

var files = ['index.js', 'test/*.js', 'gulpfile.js']

function lintTask (cb) {
    gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
    cb()
}

function lintWatchTask (cb) {
    gulp.src(files)
        .pipe(eslint())
        .pipe(eslint.format())
    cb()
}

function testTask (cb) {
    gulp.src('test/*.js', { read: false })
        .pipe(jest())
    cb()
}

var defaultTask = gulp.series(lintTask, testTask)

function watchTask (cb) {
    gulp.watch(files, gulp.series(lintWatchTask, testTask))
    cb()
}

exports.default = defaultTask
exports.watch = gulp.series(lintWatchTask, testTask, watchTask)
