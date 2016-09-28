const autoprefixer = require( 'gulp-autoprefixer' );
const babel = require( 'gulp-babel' );
const browserify = require( 'browserify' );
const browserSync = require( 'browser-sync' ).create();
const buffer = require( 'vinyl-buffer' );
const filterCounties = require( './filter-counties' );
const filterItems = require( './filter-items' );
const gulp = require( 'gulp' );
const jsonTransform = require( 'gulp-json-transform' );
const sass = require( 'gulp-sass' );
const source = require( 'vinyl-source-stream' );

gulp.task( 'build', [ 'build:data', 'build:templates', 'build:css', 'build:js' ]);

gulp.task( 'build:data', [ 'build:data:counties', 'build:data:items' ]);

gulp.task( 'build:data:counties', () => {
  gulp.src( 'src/data/counties.geojson' )
    .pipe( jsonTransform( filterCounties ))
    .pipe( gulp.dest( 'dist/assets' ));
});

gulp.task( 'build:data:items', () => {
  gulp.src( 'src/data/items.json' )
    .pipe( jsonTransform( filterItems ))
    .pipe( gulp.dest( 'dist/assets' ));
});

gulp.task( 'build:templates', () => {
  gulp.src( 'src/layout.html' )
    .pipe( gulp.dest( 'dist' ));
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
  .pipe( gulp.dest( 'dist/assets/css' ))
  .pipe( browserSync.stream())
);

gulp.task( 'build:js', [ 'build:client', 'build:server' ]);

gulp.task( 'build:client', () => browserify( 'src/client.js' )
  .bundle()
  .on( 'error', err => console.error( err ))
  .pipe( source( 'client.js' ))
  .pipe( buffer())
  .pipe( gulp.dest( 'dist/assets/js' ))
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
