var gulp = require('gulp');

gulp.task('basscss', function() {
    return gulp.src('node_modules/basscss/css/basscss.css')
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['basscss']);
