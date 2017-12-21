const gulp = require('gulp');
const less = require('gulp-less');
const watch = require('gulp-watch');
const cssmin = require('gulp-minify-css');
const prefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const combiner = require('stream-combiner2');
const sourcemaps = require('gulp-sourcemaps');
const fileinclude = require('gulp-file-include');
const browserSync = require("browser-sync");
const reload = browserSync.reload;
const rimraf = require('rimraf');


var path = {
	dev: {
		html: 'dev/*.html',

		css: 'dev/css/style.less',
		all_css: 'dev/css/**/*.*',

		js_vendor: 'dev/js/vendor/*.*',
		js_libs: 'dev/js/libs.js',
		js_plugin: 'dev/js/plugins.js',
		js_script: 'dev/js/script.js',

		img: 'dev/img/**/*.*',
		pictures: 'dev/pictures/**/*.*',
		includes: 'dev/includes/**/*.*',
		fonts: 'dev/fonts/**/*.*'
	},

	build: {
		html: 'public/',
		css: 'public/css/',
		js: 'public/js/',
		img: 'public/img/',
		pictures: 'public/pictures/',
		fonts: 'public/fonts/'
	},

	clean: './public'
}


/*
 *
 * HTML
 *
 */
gulp.task('html:build', () => {
	var combined = combiner.obj([
		gulp.src(path.dev.html),
		fileinclude('@@'),
		gulp.dest(path.build.html),
		browserSync.reload({ stream: true })
	]);
	
	combined.on('error', console.error.bind(console));
	return combined;
});


/*
 *
 * Style
 *
 */
gulp.task('style:build', () => {
	var combined = combiner.obj([
		gulp.src(path.dev.css),
		
		sourcemaps.init(),
		fileinclude('@@'),
		less(),
		prefixer(),
		cssmin(),
		sourcemaps.write(),
		
		gulp.dest(path.build.css),
		browserSync.reload({ stream: true })
	]);
	
	combined.on('error', console.error.bind(console));
	return combined;
});


/*
 *
 * JavaScript
 *
 */
function js(section) {
	return () => {
		if(section == 'js_libs') {
			var combined = combiner.obj([
				gulp.src(path.dev[section]),
				fileinclude('@@'),
				uglify(),
				gulp.dest(path.build.js),
				browserSync.reload({ stream: true })
			]);
		} else {
			var combined = combiner.obj([
				gulp.src(path.dev[section]),
				fileinclude('@@'),
				// sourcemaps.init(),
				// uglify(),
				// sourcemaps.write(),
				gulp.dest(path.build.js),
				browserSync.reload({ stream: true })
			]);
		}

		combined.on('error', console.error.bind(console));
		return combined;
	};
}

gulp.task('js_libs', js('js_libs'));
gulp.task('js_plugin', js('js_plugin'));
gulp.task('js_script', js('js_script'));
gulp.task('js:build', ['js_libs', 'js_plugin', 'js_script']);


/*
 *
 * Images
 *
 */
function img(section) {
    return () => {
        return gulp.src(path.dev[section]).pipe(imagemin()).pipe(gulp.dest(path.build[section]));
    };
}

gulp.task('images', img('img'));
gulp.task('pictures', img('pictures'));
gulp.task('image:build', ['images', 'pictures']);


/*
 *
 * Fonts
 *
 */
gulp.task('fonts:build', () => {
	return gulp.src(path.dev.fonts).pipe(gulp.dest(path.build.fonts));
});


/*
 *
 * All tasks
 *
 */
gulp.task('build', [
	'html:build',
	'style:build',
	'js:build',
	'image:build',
	'fonts:build'
]);


/*
 *
 * Watch files
 *
 */
gulp.task('watch', function(){
	watch([path.dev.html], function() {
		gulp.start('html:build');
	});

	watch([path.dev.all_css], function() {
		gulp.start('style:build');
	});

	watch([path.dev.js_libs], function() {
		gulp.start('js_libs');
	});

	watch([path.dev.js_vendor], function() {
		gulp.start('js_libs');
	});

	watch([path.dev.js_plugin], function() {
		gulp.start('js_plugin');
	});

	watch([path.dev.js_script], function() {
		gulp.start('js_script');
	});

	watch([path.dev.img], function() {
		gulp.start('images');
	});

	watch([path.dev.pictures], function() {
		gulp.start('pictures');
	});

	watch([path.dev.includes], function() {
		gulp.start('html:build');
	});

	watch([path.dev.fonts], function() {
		gulp.start('fonts:build');
	});
});


/*
 *
 * Server
 *
 */
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "./public",
        },

        host: 'localhost',
		port: 9000,
		tunnel: false,
		logPrefix: "Server answer: "
    });
});


/*
 *
 * Clean 'public'
 *
 */
gulp.task('clean', (cb) => {
	rimraf(path.clean, cb);
});


/*
 *
 * Default
 *
 */
gulp.task('default', ['build', 'server', 'watch']);