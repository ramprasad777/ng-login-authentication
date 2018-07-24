/* file: gulpfile.js */

var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sass   = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    pkg = require('./package.json');

// Default task
gulp.task('default', ['minify-css', 'minify-js', 'copy']);

/* jshint task would be here */
gulp.task('build-css', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Minify CSS
gulp.task('minify-css', function() {
    return gulp.src('app/assets/css/main-style.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('app/javascript/**/*.js')
    .pipe(jshint())
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('app/assets/js/custom.js')
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/assets/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

//Start browser Sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  })
})

//Start JS Concatenation
gulp.task('useref', function(){
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulp.dest('app/assets/js'))
});

/* updated watch task to include sass */

gulp.task('watch', ['browserSync', 'build-css', 'minify-css', 'minify-js',  'jshint'], function() {
  gulp.watch('app/javascript/**/*.js', ['jshint']);
  gulp.watch('app/scss/**/*.scss', ['build-css']);
  gulp.watch('app/assets/css/*.css', ['minify-css']);
  gulp.watch('app/assets/js/*.js', ['minify-js']);
  gulp.watch('app/**/*.html', browserSync.reload);
});