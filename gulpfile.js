/// <vs />
// Include gulp
var gulp = require('gulp');

// Include gulp config
var paths = require('./gulp.config.json');

// Include all gulp plugins
var plug = require('gulp-load-plugins')();

var log = plug.util.log;
var noop = plug.util.noop;
var colors = plug.util.colors;

// Include non-gulp plugins (those that are not auto loaded by load-plugin)
var runSequence = require('run-sequence');
var minimist = require('minimist');

//Setup Command Line Arguments
var knownOptions = {
  string: 'env',
  default: {
    env: 'dev'
  }
};

var options = minimist(process.argv.slice(2), knownOptions);

var portNumber = 5000;
  
// ====================================== GULP TASKS ===============================

// Lint Task
gulp.task('lint', function () {
  return gulp.src(paths.js)
    .pipe(plug.jshint())
    .pipe(plug.jshint.reporter('jshint-stylish'));
});

// Copy Html Files
gulp.task('html', ['index'], function () {
  return gulp.src(paths.html)
    .pipe(gulp.dest(paths.build));
});

gulp.task('index', function () {
  return gulp.src(paths.index)
    .pipe(gulp.dest(paths.build));
});

// Concatenate & Minify CSS
gulp.task('css', function () {
  return gulp.src(paths.css)
    .pipe(plug.rename({
      dirname: ''
    }))
    .pipe(isProduction() ? plug.concat('all.min.css') : noop())
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    .pipe(isProduction() ? plug.minifyCss({}) : noop())
    .pipe(gulp.dest(paths.build + '/layout/css/'));
});

// Copy Images
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest(paths.build + '/layout/images'));
});

// Copy Fonts
gulp.task('fonts', function () {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.build + '/layout/fonts'));
});

// Concatenate & Minify JS
gulp.task('js', function () {
  return gulp.src(paths.js)
    .pipe(plug.angularFilesort())
    .pipe(isProduction() ? plug.concat('all.js') : noop())
    .pipe(isProduction() ? plug.rename('all.min.js') : noop())
    .pipe(isProduction() ? plug.uglify() : noop())
    .pipe(gulp.dest(paths.build));
});

// Concatenate & Minify Vendor CSS
gulp.task('vendorcss', function () {
  return gulp.src(paths.vendorcss)
    .pipe(plug.concat('all.vendor.min.css'))
    .pipe(plug.autoprefixer('last 2 version', '> 5%'))
    .pipe(plug.minifyCss({}))
    .pipe(gulp.dest(paths.build + '/layout/css'));
});

// Concatenate & Minify Vendor JS
gulp.task('vendorjs', function () {
  return gulp.src(paths.vendorjs)
    .pipe(plug.concat('all.vendor.js'))
    .pipe(gulp.dest(paths.build));
});

// Watch Files For Changes
gulp.task('watch', function () {
  startExpress();
  plug.livereload.listen();
  gulp.watch(paths.js, function () {
    runSequence('lint', 'js', 'index', 'inject');
  });
  gulp.watch(paths.css, function () {
    runSequence('css', 'index', 'inject');
  });
  gulp.watch(paths.html, function () {
    runSequence('html', 'index', 'inject');
  });
  gulp.watch(paths.index, function () {
    runSequence('index', 'inject');
  });
});

//Inject CSS and Scripts
gulp.task('inject', function () {
  var sources = gulp.src([paths.build + '/**/all.vendor.js',
    paths.build + '/**/*.js',
    paths.build + '/**/*.css'
  ], {
    read: false
  });

  return gulp.src(paths.build + "/index.html")
    .pipe(plug.inject(sources, {
      relative: true
    }))
    .pipe(gulp.dest(paths.build))
    .pipe(plug.livereload());
});

//Clean Build Directories
gulp.task('clean', function () {
  return gulp.src([paths.build, paths.build + "/index.html"], {
      read: false
    })
    .pipe(plug.clean());
});

//Run Bower Tasks
gulp.task('bower_prune', function () {
  return plug.bower({
    cmd: 'prune'
  });
});

gulp.task('bower_install', function () {
  return plug.bower();
});

gulp.task('bower', function (callback) {
  runSequence('bower_prune', 'bower_install', callback);
});

// ------------------ Build Task ------------------

gulp.task('build', function (callback) {
  log('Building', options.env);
  runSequence('clean', 'bower', ['html', 'css', 'images', 'fonts', 'js', 'vendorcss', 'vendorjs'], 'inject', callback);
});

// ------------------ Default Task ------------------

gulp.task('default', function (callback) {

  log('Starting default task');
  runSequence('build', 'lint', 'watch', callback);
});

// ====================================== HELPER FUNCTIONS ===============================

function isProduction() {
  return options.env.toUpperCase() === 'release'.toUpperCase();
}

// ====================================== EXPRESS ===============================

function startExpress() {  
  var express = require('express');
  var app = express();
  app.use(express.static(paths.build));
  app.listen(portNumber);
  
  log(colors.yellow('Express started on: http://localhost:' + portNumber));
}
