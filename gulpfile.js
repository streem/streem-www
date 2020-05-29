const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync');
const del = require('del');

const srcRoot = './src/';
const distPath = './dist/';

const styleWatchPaths = [srcRoot + 'scss/**/*.scss', srcRoot + 'css/**/*.css'];
const styleBuildPaths = [srcRoot + 'css/core/reset.css', srcRoot + 'css/plugins/**/*.css', srcRoot + 'css/custom/**/*.css', srcRoot + 'scss/build.scss'];
const styleOutputPath = distPath;

const htmlWatchPaths = [srcRoot + 'html/**/*.html'];
const htmlBuildPaths = [srcRoot + 'html/**/*.html'];

const dataWatchPaths = [srcRoot + 'data/**/*.json'];
const dataBuildPaths = [srcRoot + 'data/**/*.json'];

const scriptWatchPaths = [srcRoot + 'js/**/*.js'];
const scriptBuildPaths = [srcRoot + 'js/plugins/**/*.js', srcRoot + 'js/custom/**/*.js'];
const scriptCopyPaths  = [srcRoot + 'js/individual/**/*.js'];
const scriptOutputPath = distPath + 'js/'

const imgWatchPaths = [ srcRoot + 'assets/img/**/*.*' ];
const imgCopyPaths = [ srcRoot + 'assets/img/**/*.*' ];
const imgOutputPath = distPath + 'img/';

const videoWatchPaths = [ srcRoot + 'assets/video/**/*.*' ];
const videoCopyPaths = [ srcRoot + 'assets/video/**/*.*' ];
const videoOutputPath = distPath + 'video/';

const fontWatchPaths = [ srcRoot + 'assets/fonts/**/*.*' ];
const fontCopyPaths = [ srcRoot + 'assets/fonts/**/*.*' ];
const fontOutputPath = distPath + 'fonts/';

const rootAssetWatchPaths = [ srcRoot + 'assets/root/**/*.*' ];
const rootAssetCopyPaths = [ srcRoot + 'assets/root/**/*.*' ];
const rootAssetOutputPath = distPath;

const redirectsCopyPaths = [ './_redirects' ];
const redirectsOutputPath = distPath;

// Working variables
var devServer = browserSync.create();

function buildStyles(fastBuild) {
    var g = gulp.src(styleBuildPaths)
        .pipe(concat('styles.css'))
        .pipe(sass());

    // Perform optimizations for release here
    if (fastBuild !== true) {
        g.pipe(autoprefixer())
            .pipe(cleanCSS());
    }

    return g.pipe(gulp.dest(styleOutputPath));
}

function buildScripts(fastBuild) {
    var g =
        gulp.src(scriptBuildPaths)
            .pipe(concat('scripts.js'));

    // Perform optimizations for release here
    if (fastBuild !== true) {
        g.pipe(uglify());
    }

    return g.pipe(gulp.dest(scriptOutputPath));
}

function copyScripts(fastBuild) {
    var g =
        gulp.src(scriptCopyPaths);

    // Perform optimizations for release here
    if (fastBuild !== true) {
        g.pipe(uglify());
    }

    return g.pipe(gulp.dest(scriptOutputPath));
}

gulp.task('build-styles', function() { return buildStyles(); });
gulp.task('build-styles-fast', function() { return buildStyles(true); });

gulp.task('build-scripts', gulp.parallel(function copyIndividualScripts() { return copyScripts(); }, function mergeScripts() { return buildScripts(); }));
gulp.task('build-scripts-fast', gulp.parallel(function copyIndividualScripts() { return copyScripts(true); }, function mergeScripts() { return buildScripts(true); }));

gulp.task('build-html', function() {
    return gulp.src(htmlBuildPaths)
        .pipe(gulp.dest(distPath));
});

gulp.task('build-data', function() {
    return gulp.src(dataBuildPaths)
        .pipe(gulp.dest(distPath));
});

gulp.task('build-images', function() {
    return gulp.src(imgCopyPaths)
        .pipe(gulp.dest(imgOutputPath));
});

gulp.task('build-videos', function() {
    return gulp.src(videoCopyPaths)
        .pipe(gulp.dest(videoOutputPath));
});

gulp.task('build-fonts', function() {
    return gulp.src(fontCopyPaths)
        .pipe(gulp.dest(fontOutputPath));
});

gulp.task('build-root', function() {
    return gulp.src(rootAssetCopyPaths)
        .pipe(gulp.dest(rootAssetOutputPath));
});

gulp.task('build-redirects', function() {
    return gulp.src(redirectsCopyPaths)
        .pipe(gulp.dest(redirectsOutputPath));
});

gulp.task('clean-dist', function() {
    return del([
        distPath + '**'
    ]);
});

gulp.task('dev', gulp.series(
    'build-styles-fast', 'build-scripts-fast', 'build-html', 'build-data', 'build-images', 'build-videos', 'build-fonts', 'build-root',
    function dev () {
        gulp.watch(styleWatchPaths, gulp.series('build-styles-fast'));
        gulp.watch(scriptWatchPaths, gulp.series('build-scripts'));
        gulp.watch(htmlWatchPaths, gulp.series('build-html'));
        gulp.watch(dataBuildPaths, gulp.series('build-data'));
        gulp.watch(imgWatchPaths, gulp.parallel('build-images'));
        gulp.watch(videoWatchPaths, gulp.parallel('build-videos'));
        gulp.watch(fontWatchPaths, gulp.parallel('build-fonts'));
        gulp.watch(rootAssetWatchPaths, gulp.parallel('build-root'));

        devServer.init({
            server: distPath,
            watch: true
        });
    })
);

gulp.task('build', gulp.series('clean-dist', 'build-styles', 'build-scripts', 'build-html', 'build-data', 'build-images', 'build-videos', 'build-fonts', 'build-root', 'build-redirects'));
