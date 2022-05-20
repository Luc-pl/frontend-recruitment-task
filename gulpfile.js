const { src, dest, watch, series, parallel } = require('gulp');

const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
var replace = require('gulp-replace');
const browserSync = require('browser-sync').create();

// File paths
const files = {
    scssPath: 'src/scss/**/*.scss',
    jsPath: 'src/js/**/*.js',
    htmlPath: './*.html'
};

function scssTask(){    
    return src(files.scssPath)
        .pipe(sourcemaps.init()) // initialize sourcemaps first
        .pipe(sass([])) // compile SCSS to CSS
        .pipe(postcss([ autoprefixer(), cssnano() ])) // PostCSS plugins
        .pipe(sourcemaps.write('.')) // write sourcemaps file in current directory
        .pipe(dest('dist')
    ); // put final CSS in dist folder
}

function htmlTask() {
    return src([
        files.htmlPath
        ])
        .pipe(browserSync.stream())
}

function jsTask(){
    return src([
        files.jsPath
        ])
        .pipe(concat('all.js'))
        .pipe(uglify())
        .pipe(dest('dist')
    );
}

var cbString = new Date().getTime();
function cacheBustTask(){
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}

function watchTask(){
    watch([files.scssPath, files.jsPath, files.htmlPath], 
        parallel(scssTask, jsTask, htmlTask),
        browserSync.init({
            server: {
                baseDir: "./"
            },
            notify: false, 
            //host: "192.168.0.24",
            //port: 3000,
            open: true,
            //browser: "google chrome" //https://stackoverflow.com/questions/24686585/gulp-browser-sync-open-chrome-only
        }));
}


exports.default = series(
    parallel(scssTask, jsTask, htmlTask), 
    cacheBustTask,
    watchTask
);