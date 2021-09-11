const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const sass = require('gulp-sass')(require('sass'));
const {series, parallel} = require('gulp');

function build() {
  return gulp.src('./src/*.html')
    .pipe(nunjucksRender({
      path: ['./src'],
    }))
    .pipe(gulp.dest('./public'));
}

function copy_images() {
  return gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./public/images'));
}

function style() {
  return gulp.src('./src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
    .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './public'
    }
  });
  gulp.watch('./src/**/*.html', build);
  gulp.watch('./src/scss/**/*.scss', style);
  gulp.watch('./src/**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/scss/**/*.js').on('change', browserSync.reload);
}

exports.build = build;
exports.copy_images = copy_images;
exports.style = style;
exports.watch = watch;

exports.default = series(
  build,
  copy_images,
  style,
  watch 
)
