var gulp = require('gulp');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var nextcss = require('postcss-cssnext');
var nested = require('postcss-nested');
var importer = require('postcss-import');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var browserSync = require('browser-sync').create();

gulp.task('css', function () {
  return gulp.src('./src/assets/style.css')
    .pipe( plumber() )
    .pipe( sourcemaps.init() )
    .pipe( postcss([importer, nested, nextcss]) )
    .pipe( sourcemaps.write('.') )
    .pipe( gulp.dest('./app/assets/') );
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./src/"
        }
    });
});

gulp.task('js', () => gulp
	.src('./app/assets/js/custom.js')
	.pipe( plumber() )
	.pipe( sourcemaps.init() )
	.pipe( uglify() )
	.pipe( rename({ suffix: '.min' }) )
	.pipe( sourcemaps.write('.') )
	.pipe( gulp.dest('./app/assets/js/') )
);

gulp.task('sync', ['browser-sync'], function(){
  gulp.watch("src/assets/**/*.css", ['css']);
  gulp.watch("src/assets/**/*.js", ['js']);
  gulp.watch("src/*.html", ['bs-reload']);
});

gulp.task('build', ['css', 'js', 'sync']);
gulp.task('default', ['build'], () => console.log('I am watching you!'));
