const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');

sass.compiler = require('node-sass');

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
.pipe(gulp.dest('./css/'));
});

// gulp.task('default', gulp.series(sass));

gulp.task('default:watch', function () {
gulp.watch('./_sass/**/*.scss', gulp.series('default'));
});
