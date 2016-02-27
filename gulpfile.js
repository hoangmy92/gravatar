var gulp  = require('gulp');
var mocha = require('gulp-mocha');

gulp.task('default', ['test']);

gulp.task('test', function() {
  return gulp.src('test/*.test.js')
    .pipe(mocha({ reporter: 'spec' }))
    .once('error', function(error) {
      console.error(error);
      process.exit(1);
    })
    .once('end', function() {
      process.exit();
    });
});
