const g = require( 'gulp' );
const $ = require( 'gulp-load-plugins' )();
let i_destination = './bundle/responsive-assets/';

const i_optimize = function () {
  return g.src( [ './assets/**/*.{png,jpg,jpeg,giff,webp}' ] )
    .pipe( $.plumber() )
    .pipe( $.assetCache.filter( './assets/asset-cache' ) )
    .pipe( $.responsive( {
      '**/*': [
        {
          width: 480,
          format: "jpeg",
          rename: {
            suffix: '-small'
          }
      },
        {
          width: 640,
          format: "jpeg",
          rename: {
            suffix: '-medium'
          }
      },
        {
          width: 960,
          format: "jpeg",
          rename: {
            suffix: '-large'
          }
      },
        {
          width: 1280,
          format: "jpeg",
          rename: {
            suffix: '-x-large'
          }
      },
        {
          width: 1600,
          format: "jpeg",
          rename: {
            suffix: '-xx-large'
          }
      } ]
    }, {
      withMetadata: false,
      errorOnEnlargement: false,
      progressive: true,
      withoutEnlargement: false,
      crop: 'entropy',
      quality: 40,
      compressionLevel: 9,
      min: true,
      flatten: true,
      force: false
    } ) )
    .pipe( $.imagemin( [
      $.imagemin.jpegtran( {
        progressive: true
      } ),
      $.imagemin.optipng( {
        optimizationLevel: 9
      } )
    ], {
      verbose: true
    } ) )
    .pipe( $.plumber.stop() )
    .pipe( g.dest( i_destination ) )
    .pipe( $.assetCache.cache() );
};

const css_optimize = function () {
  return g.src( './styles/**/*.css' )
    .pipe( $.concatCss( 'app.css' ) )
    .pipe( $.autoprefixer( {
      browsers: [ 'last 2 versions' ]
    } ) )
    .pipe( g.dest( './bundle/style/' ) )
    .pipe( $.cleanCss() )
    .pipe( $.rename( 'main.min.css' ) )
    .pipe( g.dest( './bundle/style/minified/' ) );
};

g.task( 'default', function () {
  return i_optimize();
} );
g.task( 'csso', function () {
  return css_optimize();
} );