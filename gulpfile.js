var babelify   = require('babelify'),
    browserify = require('browserify')  ,
    del        = require('del'),
    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    less       = require('gulp-less'),
    prefix     = require('gulp-autoprefixer'),
    serve      = require('gulp-serve'),
    source     = require('vinyl-source-stream'),
    uglify     = require('gulp-uglify'),
    watchify   = require('watchify'),
    bundler;

// Scripts
bundler = watchify(browserify('./src/js/main.js', watchify.args));
bundler.transform(babelify);

function jsBundle() {
  return bundler.bundle()
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source('main.js'))
  .pipe(gulp.dest('./build/js'));
}

gulp.task('scripts', jsBundle);

// Cleanup
gulp.task('clean', function(cb) {
  del(['build/**'], cb);
});

// Stylesheets
gulp.task('less', function(){
  gulp.src('src/css/style.less')
  .pipe(less({
    paths: ['src/less']
  }))
  .on('error', gutil.log)
  .pipe(prefix())
  .pipe(gulp.dest('./build/css'));
});

// Index, images, fonts
gulp.task('assets', function(){
  gulp.src('src/index.html')
  .pipe(gulp.dest('./build/'));

  gulp.src('src/img/**/*')
  .pipe(gulp.dest('./build/img'));

  gulp.src('src/fonts/**/*')
  .pipe(gulp.dest('./build/fonts'));
});

gulp.task('watch', function() {
  gulp.watch('./src/js/**/*', ['scripts']);
  gulp.watch('./src/css/**/*', ['less']);
  gulp.watch(['./src/img/**/*', './src/fonts/**/*', './src/index.html'], ['assets']);
});

gulp.task('serve', serve('./build'));

gulp.task('default', ['scripts', 'less', 'assets', 'watch', 'serve']);
