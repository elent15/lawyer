const { src, dest, watch, parallel, series } = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();
const changed = require('gulp-changed');
const autoprefixer = require('gulp-autoprefixer');

const htmlclean = require('gulp-htmlclean');
const csso = require('gulp-csso');

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;

const gulpif = require('gulp-if');
const argv = require('yargs').argv;

function html() {
  return src('./src/**/*.html')
    .pipe(changed('./docs/', { hasChanged: changed.compareContents }))
    .pipe(gulpif(argv.build, htmlclean()))
    .pipe(dest('./docs/'))
    .pipe(browserSync.stream())
}

function styles() {
  return src('./src/css/*.css')
    .pipe(changed('./docs/css/*.css'))
    .pipe(gulpif(argv.build, autoprefixer({
      "overrideBrowserslist": [
        "last 5 version"
      ],
      cascade: false,
    })))
    .pipe(gulpif(argv.build, csso()))
    .pipe(dest('./docs/css/'))
    .pipe(browserSync.stream())
    .pipe(src('./src/css/vendor/*.css'))
    .pipe(changed('./docs/css/'))
    .pipe(dest('./docs/css/'))
    .pipe(browserSync.stream())
}

function scripts() {
  return src('./src/js/*.js')
    .pipe(changed('./docs/js/'))
    .pipe(gulpif(argv.build, babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpif(argv.build, uglify()))
    .pipe(dest('./docs/js/'))
    .pipe(src('./src/js/vendor/*.js'))
    .pipe(dest('./docs/js/'))
    .pipe(browserSync.stream())
}

function images() {
  return src('./src/images/*')
    .pipe(changed('./docs/images/'))
    .pipe(webp())
    .pipe(dest('./docs/images/'))
    .pipe(src('./src/images/**/*'))
    .pipe(changed('./docs/images/'))
    .pipe(imagemin({ verbose: true }))
    .pipe(dest('./docs/images/'))
    .pipe(browserSync.stream())
}

function fonts() {
  return src('./src/fonts/**/*')
    .pipe(changed('./dist/fonts/'))
    .pipe(dest('./docs/fonts/'))
    .pipe(browserSync.stream())
}

function cleanDocs() {
  return src('./docs/')
    .pipe(clean())
    .pipe(dest('./docs/'))
}

function watching() {
  browserSync.init({
    server: {
      baseDir: './docs/'
    },
    tunnel: true
  });
  watch('./src/*.html', html)
  watch('./src/css/*.css', styles)
  watch('./src/js/*.js', scripts)
  watch('./src/images/**/*', images)
  watch('./src/fonts/**/*', fonts)
}

exports.default = series(cleanDocs, parallel(html, styles, scripts, images, fonts), watching);
exports.build = series(cleanDocs, parallel(html, styles, scripts, images, fonts));
