const {
    src,
    dest,
    parallel,
    series,
    watch
} = require('gulp');

const uglify = require('gulp-uglify');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const concat = require('gulp-concat');
//const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const browsersync = require('browser-sync').create();
const clean = require('clean')

function js() {
    const source = '/static_files/script.js';

    return src(source)
        .pipe(changed(source))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(dest('/static_files/script.js'))
        .pipe(browsersync.stream());
}


function clear(){
	clean()
}


function css() {
    const source = '/static_files/style.css';

    return src(source)
        .pipe(changed(source))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(dest('/static_files/style.css'))
        .pipe(browsersync.stream());
}


function img() {
    return src('/assets/img')
        //.pipe(imagemin())
        .pipe(dest('/assets/img'));
}


function watchFiles() {
    watch('/static_files/style.css', css);
    watch('/script.js', js);
   // watch('/assets/img', img);
	watch('/Volumes/Workspace/html-tutorial/static_files/index.html')
}


function browserSync() {
    browsersync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });
}



exports.watch = parallel(watchFiles, browserSync);
exports.default = series(clear, parallel(js, css, img));
    