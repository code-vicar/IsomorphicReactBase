var del = require('del')
var gulp = require('gulp')
var babel = require('gulp-babel')
var gulpFilter = require('gulp-filter')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('default', ['build'])

gulp.task('build', ['clean'], function() {
    var jsFilter = gulpFilter(['**/*.js', '**/*.jsx'], {restore: true})
    return gulp.src(['src/server/**/*', 'src/shared/**/*'], { base: './src' })
    .pipe(jsFilter)
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['react', 'node5']
    }))
    .pipe(sourcemaps.write())
    .pipe(jsFilter.restore)
    .pipe(gulp.dest('dist'))
})

gulp.task('clean', function() {
    return del('dist');
})