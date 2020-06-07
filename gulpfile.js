const
    gulp         = require('gulp'),
    path         = require('path'),
    cleanCSS     = require('gulp-clean-css'),
    concat       = require('gulp-concat'),
    autoprefixer = require('gulp-autoprefixer'),
    minify       = require('gulp-minify'),
    rename       = require("gulp-rename"),
    browserSync  = require('browser-sync'),
    rigger       = require('gulp-rigger'),
    del          = require('del');



function js() {
    return gulp.src('src/js/*.js')
        .pipe(concat('common.js'))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({stream: true}))
};


function libs() {
    return gulp.src('src/js/libs/*.js')
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({stream: true}))
};


function jsBuild() {
    return gulp.src('src/js/*.js')
        .pipe(concat('common.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
}


function html() {
    return gulp.src('src/html/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('src'))
        .pipe(browserSync.reload({stream: true}))
};


function libsBuild() {
    return gulp.src('src/js/libs/*.js')
        .pipe(concat('libs.js'))
        .pipe(minify())
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({stream: true}))
}


function browser() {
    browserSync({
        server: {
            baseDir: 'src'
        },
        notify: false
    });
};


function watch() {
    // gulp.watch('src/less/**/*.less', lessBuild)
    gulp.watch('src/js/*.js', js)
    gulp.watch('src/js/libs/*.js', libs)
    gulp.watch('src/html/**/*.html', html)
};

function moveHtml() {
    return gulp.src('src/*.html')
        .pipe(gulp.dest('dist'))
};

function moveCss() {
    return gulp.src('src/*.css')
        .pipe(gulp.dest('dist'))
};

function moveFonts() {
    return gulp.src('src/fonts/**.*')
        .pipe(gulp.dest('dist/fonts'))
};

function moveAssets() {
    return gulp.src('src/assets/**/*.*')
        .pipe(gulp.dest('dist/assets'))
};

function moveFavs() {
    return gulp.src('src/*.ico')
        .pipe(gulp.dest('dist'))
};

function movePng() {
    return gulp.src('src/*.png')
        .pipe(gulp.dest('dist'))
};

gulp.task('browser', browser);
gulp.task('js', js);
gulp.task('jsBuild', jsBuild)
gulp.task('libs', libs);
gulp.task('html', html);
gulp.task('libsBuild', libsBuild)
gulp.task('watch', watch);

gulp.task('moveHtml', moveHtml);
gulp.task('moveCss', moveCss);
gulp.task('moveFonts', moveFonts);
gulp.task('moveAssets', moveAssets);
gulp.task('moveFavs', moveFavs);
gulp.task('movePng', movePng);

gulp.task('start', gulp.parallel('js','libs','html','browser','watch'));
gulp.task('build', gulp.series('jsBuild','libsBuild','moveHtml','moveCss','moveFonts','moveAssets','moveFavs','movePng'));
