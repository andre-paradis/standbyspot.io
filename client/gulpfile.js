var gulp = require('gulp');
var gutil = require("gulp-util");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

// load webpack config file
var webpackConfig = require("./webpack.config.js");

// The development server (the recommended option for development)
gulp.task("default", ["static", "webpack-dev-server"]);

gulp.task('static', function () {
  gutil.log("copying html files to dist");
  gulp
    .src('app/**/*.html')
    .pipe(gulp.dest('dist'));

  gulp
    .src('app/**/*.css')
    .pipe(gulp.dest('dist'));

})

// Production build
gulp.task("build", ["static", "webpack:build"]);
gulp.task("build-dev", ["static", "webpack:build-dev"]);


gulp.task("webpack:build", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.plugins = myConfig.plugins.concat(
		new webpack.DefinePlugin({
			"process.env": {
				// This has effect on the react lib size
				"NODE_ENV": JSON.stringify("production")
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	// run webpack
	webpack(myConfig, function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build", err);
		gutil.log("[webpack:build]", stats.toString({
			colors: true
		}));
		callback();
	});
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function(callback) {
	// run webpack
	devCompiler.run(function(err, stats) {
		if(err) throw new gutil.PluginError("webpack:build-dev", err);
		gutil.log("[webpack:build-dev]", stats.toString({
			colors: true
		}));
		callback();
	});
});

gulp.task("webpack-dev-server", function(callback) {
	// modify some webpack config options
	var myConfig = Object.create(webpackConfig);
	myConfig.devtool = "eval";
	myConfig.debug = true;
  myConfig.entry.unshift("webpack-dev-server/client?http://localhost:8080", "webpack/hot/dev-server");

  // Start a webpack-dev-server
	new WebpackDevServer(webpack(myConfig), {
    contentBase: "dist",
    hot: true,
		stats: {
			colors: true
		}
	}).listen(8080, "localhost", function(err) {
		if(err) throw new gutil.PluginError("webpack-dev-server", err);
		gutil.log("[webpack-dev-server]", "http://localhost:8080/webpack-dev-server/index.html");
	});
});

gulp.task('webpack', function() {
  // place code for your default task here
});
