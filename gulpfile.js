const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
const shell = require('gulp-shell');

sass.compiler = require('node-sass');

// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./_site"
//         }
//     });
// });

gulp.task('jekyll-build', shell.task(['jekyll build --watch --incremental']));

gulp.task('default', () => {
return gulp.src('./_sass/**/*.scss')
.pipe(sourcemaps.init())
.pipe(sass().on('error', sass.logError))
.pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
}))
.pipe(cleanCSS())
.pipe(sourcemaps.write())
.pipe(gulp.dest('./css/'))
});

// gulp.task('default', gulp.series(sass));

gulp.task('default:watch', function () {
    
    browserSync.init({
        server: {
            baseDir: "./_site"
        }
    });

    gulp.watch('./_sass/**/*.scss', gulp.series('default'));
    gulp.watch("./**/*.*", gulp.series('jekyll-build'));
    gulp.watch("_site/**/*.*").on('change', browserSync.reload);

    gulp.series('jekyll-build');

});
