import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import sass from 'gulp-sass';
import runSequence from 'run-sequence';
import webpackStream from 'webpack-stream';
import webpack from 'webpack';
import glob from 'glob';;
import hash from 'hash-files';
import jsesc from 'jsesc';
import rename from 'gulp-rename';
import replace from 'gulp-replace';

import {
  stream as wiredep
} from 'wiredep';

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/fonts/**/*.*',
    'app/scripts/**/*.js',
    'app/scripts/**/*.min.css',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/manifest.json',
    '!app/*.html'
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest('docs'));
});


function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}


gulp.task('sass', () => {
  return gulp.src([
      'app/styles/sass/fonts/*.sass',
      'app/styles/sass/app.sass'
    ])
    .pipe($.sass().on('error', sass.logError))
    .pipe(gulp.dest('docs/styles/'));
});


gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  env: {
    es6: true
  },
  rules: {
    "quotes": 0
  },
  parserOptions: {
    sourceType: 'module'
  }
}));

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // Don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{
          cleanupIDs: false
        }]
      }))
      .on('error', function (err) {
        console.log(err);
        this.end();
      })))
    .pipe(gulp.dest('docs/images'));
});

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({
      searchPath: ['.tmp', 'app', '.']
    }))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({
      removeComments: true,
      collapseWhitespace: true
    })))
    .pipe(gulp.dest('docs'));
});




gulp.task('babel', () => {
  return gulp.src('app/scripts.babel')
    .pipe(webpackStream(require('./webpack.config.js'), webpack)
      .on('error', function (err) {
        console.log(err);
        this.emit('end');
      }))
    .pipe(gulp.dest('app/scripts/'));
});




gulp.task('clean', del.bind(null, ['.tmp', 'docs']));

gulp.task('watch', ['lint', 'babel'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/scripts/**/*.vue',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json'
  ]).on('change', $.livereload.reload);

  gulp.watch(['app/scripts.babel/**/*.js', 'app/scripts.babel/**/*.vue'], ['lint', 'babel']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => {
  return gulp.src('docs/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});

gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});




const stringify = value => {
  return jsesc(value, {
    wrap: true,
    compact: false,
    indentLevel: 3
  })
};

const shortHash = files => {
  return hash
    .sync({
      files
    })
    .slice(0, 8)
};

const assets = ['dist/**/*.*'];

gulp.task('cache', () => {
  const assets = [
    ...glob.sync('dist/assets/css/**/*.*'),
    ...glob.sync('dist/*.html'),
    ...glob.sync('dist/*.js'),
    ...glob.sync('dist/assets/img/**/me.png'),
    ...glob.sync('dist/assets/img/**/*.svg'),
    ...glob.sync('dist/assets/js/**/*.*')
  ];
  const assetsHash = shortHash(assets);
  const assetCacheList = [
    '/',
    ...assets
    // Remove all `images/icon-*` files except for the one used in
    // the HTML.
    .filter(
      path =>
      !path.includes('images/icon-') || path.includes('icon-228x228.png')
    )
    .map(path => path.replace(/^dist\//, '/'))
  ];

  gulp
    .src('./__core/sw.js')
    .pipe(replace('%HASH%', stringify(assetsHash)))
    .pipe(replace('%CACHE_LIST%', stringify(assetCacheList)))
    .pipe(
      rename(path => {
        path.basename = assetsHash
      })
    )
    .pipe(gulp.dest('dist/'))

  gulp
    .src('dist/**/*.html')
    .pipe(
      replace(
        /(<\/body>)/g,
        `<script>
				  if ('serviceWorker' in navigator) {
					  navigator.serviceWorker.register('/${assetsHash}.js');
				  }
			  </script>$1`
      )
    )
    .pipe(gulp.dest('dist/'))

  return del(['dist/service-worker.js'])
})


gulp.task('build', cb => {
  runSequence(
    'lint', 'clean', ['sass', 'html', 'images', 'extras'], 'babel',
    'size', cb);
});

gulp.task('default', cb => {
  runSequence('build', cb);
});