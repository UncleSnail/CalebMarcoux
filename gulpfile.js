var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
//var cssUseref = require('gulp-css-useref');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var changed = require('gulp-changed');

gulp.task('default', function() {
  // place code for your default task here
  console.log('Default task run in gulp.');
});

gulp.task('watch', ['browser-sync', 'sass', 'html'], function() {
  //Run browser-sync and sass when task starts,
  //then when a sass file changes, run sass again.
  gulp.watch('app/scss/**/*.+(scss|sass)', ['sass']);
  gulp.watch('app/html/*.html', ['html']).on('change', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  //**/* means check subdirectories.
});

gulp.task('html', function() {
  //Will be the task to compile pug. For now it just copies the html.
  return gulp.src('app/html/*.html')
    .pipe(changed('dist'))
    .pipe(gulp.dest('dist'));
});

gulp.task('sass', function() {
  return gulp.src('app/scss/*.+(scss|sass)')
    .pipe(plumber())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer({
      browsers: ['last 3 versions']
    }))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});

gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|gif|svg)')
    .pipe(changed('dist/images'))
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', function() {
  //broken!
  /*
  return gulp.src('app/*.css')
    .pipe(cssUseref({
      match: '*.+(otf|eot|ttf|woff|woff2)'
    }))
    .pipe(gulp.dest('dist/fonts'));
    */

  //Temporary copy all files.
  return gulp.src('app/fonts/**/*.+(otf|eot|ttf|woff|woff2)')
    .pipe(changed('dist/fonts'))
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
      browser: 'firefox-dev',
      server: {
          baseDir: 'dist'
      }
    });
});
