const babel = require( 'gulp-babel' );
const gulp = require( 'gulp' );

gulp.task( 'build', [ 'build:server' ]);

gulp.task( 'build:server', () => {
  gulp.src( 'src/server.js' )
    .pipe( babel())
    .pipe( gulp.dest( 'dist' ));
});
