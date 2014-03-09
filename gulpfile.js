var gulp = require('gulp'),
	gutil = require('gulp-util'),
	browserify = require('gulp-browserify'),
	less = require('gulp-less'),
	clean = require('gulp-clean'),
	uglify = require('gulp-uglify'),
	serve = require('gulp-serve'),
	jshint = require('gulp-jshint');

gulp.task('lint', function() {
  gulp.src('./src/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Cleanup
gulp.task('clean', function() {
	gulp.src('build/*', { read: false})
		.pipe(clean());
});

// Scripts
gulp.task('scripts', function() {
	gulp.src('src/js/main.js')
		.pipe(browserify({
			debug: true
		}))
		.on('error', gutil.log)
		// .pipe(uglify({outSourceMap: true}))
		.pipe(gulp.dest('./build/js'));
});

// Stylesheets
gulp.task('less', function(){
	gulp.src('src/css/style.less')
		.pipe(less({
			paths: ['src/less']
		}))
		.on('error', gutil.log)
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
	gulp.watch('./src/css/**/*', ['less']);
	gulp.watch(['./src/js/**/*.js'], ['scripts', 'lint']);
	gulp.watch(['./src/img/**/*', './src/fonts/**/*', './src/index.html'], ['assets']);
});

gulp.task('serve', serve('./build'));

gulp.task('default', ['scripts', 'less', 'assets', 'watch', 'serve']);