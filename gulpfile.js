const gulp = require("gulp")
    , del = require('del')
    , sass = require('gulp-sass')
    , sourcemaps = require('gulp-sourcemaps')
    , uglify = require('gulp-uglify')
    , concat = require('gulp-concat')
    , print = require('gulp-print')
    , babel = require('gulp-babel')
    , CacheBuster = require('gulp-cachebust')
    , cachebust = new CacheBuster();
    // babel-preset-es2015

gulp.task('build-css', function(){
  return gulp.src('./styles/*')
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(cachebust.resources())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./maps'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build-js', function(){
    return gulp.src('js/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(print())
        .pipe(babel({presets: ['es2015']}))
        .pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(sourcemaps.write('./')
        .pipe(gulp.dest('./dist/js')));
})

gulp.task('build', ['build-css', 'build-js'], function() {
    return gulp.src('index.html')
        .pipe(cachebust.references())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function() {
    return gulp.watch(['./index.html','./partials/*.html', './styles/*.*css', './js/**/*.js'], ['build']);
});

gulp.task('default', ['watch']);