const babel = require( 'gulp-babel' );
const browserify = require( 'browserify' );
const buffer = require( 'vinyl-buffer' );
const gulp = require( 'gulp' );
const source = require( 'vinyl-source-stream' );

gulp.task( 'build', [ 'build:assets', 'build:client', 'build:server' ]);

gulp.task( 'build:assets', () => {
  gulp.src( 'src/layout.html' )
    .pipe( gulp.dest( 'dist' ));
});

gulp.task( 'build:client', () => browserify( 'src/client.js' )
  .bundle()
  .on( 'error', err => console.error( err ))
  .pipe( source( 'client.js' ))
  .pipe( buffer())
  .pipe( gulp.dest( 'dist' ))
);

gulp.task( 'build:server', () => {
  gulp.src( 'src/server.js' )
    .pipe( babel())
    .pipe( gulp.dest( 'dist' ));
});
