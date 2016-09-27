const autoprefixer = require( 'gulp-autoprefixer' );
const babel = require( 'gulp-babel' );
const browserify = require( 'browserify' );
const browserSync = require( 'browser-sync' ).create();
const buffer = require( 'vinyl-buffer' );
const gulp = require( 'gulp' );
const sass = require( 'gulp-sass' );
const source = require( 'vinyl-source-stream' );

gulp.task( 'build', [ 'build:assets', 'build:css', 'build:js' ]);

gulp.task( 'build:assets', [ 'build:assets:templates', 'build:assets:vendor' ]);

gulp.task( 'build:assets:templates', () => {
  gulp.src( 'src/layout.html' )
    .pipe( gulp.dest( 'dist' ));
});

gulp.task( 'build:assets:vendor', () => {
  gulp.src( 'node_modules/leaflet/dist/images/**/*' )
    .pipe( gulp.dest( 'dist/assets/vendor/leaflet' ));
});

gulp.task( 'build:css', () => gulp.src( 'src/sass/styles.scss' )
  .pipe( sass({
    includePaths: [
      'node_modules/normalize-scss/sass',
    ],
    outputStyle: 'compressed',
  })
  .on( 'error', sass.logError ))
  .pipe( autoprefixer({
    browsers: [ 'last 2 versions', 'ie >= 10' ],
  }))
  .pipe( gulp.dest( 'dist' ))
  .pipe( browserSync.stream())
);

gulp.task( 'build:js', [ 'build:client', 'build:server' ]);

gulp.task( 'build:client', () => browserify( 'src/client.js' )
  .bundle()
  .on( 'error', err => console.error( err ))
  .pipe( source( 'client.js' ))
  .pipe( buffer())
  .pipe( gulp.dest( 'dist' ))
  .pipe( browserSync.reload({ stream: true }))
);

gulp.task( 'build:server', () => {
  gulp.src( 'src/server.js' )
    .pipe( babel())
    .pipe( gulp.dest( 'dist' ))
    .pipe( browserSync.reload({ stream: true }));
});

gulp.task( 'watch', [ 'build' ], () => {
  browserSync.init({
    proxy: 'localhost:3000',
    port: 4000,
  });

  gulp.watch( 'src/sass/**/*.scss', [ 'build:css' ]);
  gulp.watch( 'src/**/*.js', [ 'build:js' ]);
  gulp.watch( '**/*.html', () => browserSync.reload());
});

gulp.task( 'default', [ 'watch' ]);
