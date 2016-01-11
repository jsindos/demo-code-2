const babel = require('gulp-babel');
const batch = require('gulp-batch');
const clean = require('gulp-rimraf');
const debug = require('gulp-debug');
const eslint = require('gulp-eslint');
const gulp = require('gulp');
const runSequence = require('run-sequence');
const tape = require('gulp-tape');
const tapColorize = require('tap-colorize');
const watch = require('gulp-watch');

gulp.task('default', ['build']);

gulp.task('build', function build(f) {
  runSequence('clean-build',
              'build-src',
              f);
});

gulp.task('test', function test(f) {
  runSequence('lint',
              'build',
              'build-test',
              'run-test',
              f);
});

gulp.task('test-watch', function test() {
  // simple rebuild all watcher
  watch(['src/**', 'test/**'], batch(function f(events, done) {
    gulp.start('test', done);
  }));
});

gulp.task('lint', function test() {
  return gulp.src(['src/js/**/*.js', 'test/js/**/*.js'])
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failOnError());
});

gulp.task('build-src', function buildSrc() {
  return gulp.src('src/js/**/*.js')
             .pipe(babel())
             .pipe(gulp.dest('build'));
});

gulp.task('build-test', function buildTest() {
  return gulp.src('test/js/**/*.js')
             .pipe(babel())
             .pipe(gulp.dest('build'));
});

gulp.task('clean-build', function cleanBuild() {
  return gulp.src('build')
             .pipe(clean());
});

gulp.task('run-test', function test() {
  return gulp.src('build/**/*-test.js')
             .pipe(debug())
             .pipe(tape({
               reporter: tapColorize(),
             }));
});
