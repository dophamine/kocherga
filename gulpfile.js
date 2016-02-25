var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	rename = require('gulp-rename'),
	autoprefixer = require('gulp-autoprefixer'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	imagemin = require('gulp-imagemin'),
	cache = require('gulp-cache'),
	minifycss = require('gulp-minify-css'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	zip = require('gulp-zip')
	del = require('del');

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: "./"
		}
	});
});

gulp.task('bs-reload', function() {
	browserSync.reload();
});

gulp.task('images', function() {
	gulp.src(['src/images/**/*'])
		.pipe(imagemin({
			optimizationLevel: 3,
			progressive: true,
			interlaced: true
		}))
		.pipe(gulp.dest('dist/images/'));
});

gulp.task('sass', function() {
	return gulp.src(['src/styles/main.sass'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(sass())
		.pipe(gulp.dest('dist/styles/'))
});

gulp.task('css',function () {
	return gulp.src('src/styles/*.css')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('dist/styles'))
});

gulp.task('clear_styles', function () {
	return del('dist/styles/**/*');
});

gulp.task('styles', ['clear_styles','css','sass'], function() {
	gulp.src(['dist/styles/**/*'])
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(concat('bundle.css'))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('dist/styles/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(minifycss())
		.pipe(gulp.dest('dist/styles/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('scripts', function() {
	return gulp.src('src/scripts/**/*.js')
		.pipe(plumber({
			errorHandler: function(error) {
				console.log(error.message);
				this.emit('end');
			}
		}))
		.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/scripts/'))
		.pipe(browserSync.reload({
			stream: true
		}))
});

gulp.task('fonts', function() {
	return gulp.src('src/fonts/**/*')
		.pipe(gulp.dest('dist/fonts/'))
});

gulp.task('libs', function() {
	return gulp.src('src/libs/**/*')
		// .pipe(uglify())
		.pipe(gulp.dest('dist/libs/'))
});

gulp.task('zip', ['buildcommon'], function () {
	return gulp.src(['index.html','gulpfile.js','package.json','dist/**/*'])
		.pipe(zip('kocherga_build.zip'))
		.pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
	return del('dist');
});

gulp.task('buildcommon', ['fonts','styles','images','libs','scripts'], function () {
	console.log('BUILD COMPLETE!')
});

gulp.task('default', ['browser-sync'], function() {
	gulp.watch("src/styles/**/*.*", ['styles']);
	gulp.watch("src/scripts/**/*.js", ['scripts']);
	gulp.watch("*.html", ['bs-reload']);
});