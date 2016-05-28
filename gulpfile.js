var gulp = require('gulp');
var postcss = require('gulp-postcss');
var prefix = require('postcss-selector-prefix');
var rename = require('gulp-rename');

gulp.task('default', function() {
    return gulp.src('css/prefix.css')
    .pipe(postcss([prefix('#prefix')]))
    .pipe(rename({basename: 'prefixed'}))
    .pipe(gulp.dest('css'));
});
