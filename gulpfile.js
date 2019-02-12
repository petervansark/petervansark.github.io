const gulp = require("gulp");
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();
const shell = require('gulp-shell');
const responsive = require('gulp-responsive');

sass.compiler = require('node-sass');

gulp.task('browser-sync', () => {
    browserSync.init({
        server: {
            baseDir: "./_site"
        }
    });
});

gulp.task('images-scale', () => {
    return gulp.src('./assets/src/*-hero.jpg')
    .pipe(responsive({
        '*.jpg': [
            {
                width: 400,
                format: 'jpeg',
                rename: { suffix: '-400px' },
            }, 
                {
                width: 800,
                format: 'jpeg',
                rename: { suffix: '-800px' },
            }, {
                width: 1200,
                height: 600,
                format: 'jpeg',
                rename: { suffix: '-1200px' },
            },
            {
                width: 400,
                format: 'webp',
                rename: { suffix: '-400px' },
            },
            {
                width: 800,
                format: 'webp',
                rename: { suffix: '-800px' },
            },
            {
                width: 1200,
                height: 600,
                format: 'webp',
                rename: { suffix: '-1200px' },
            }
        ]
      }, {
        quality: 80,
        progressive: true,
        withMetadata: false,
      }))
      .pipe(gulp.dest('./assets/optimized/'));
  });

gulp.task('jekyll-build', shell.task(['jekyll build --watch --incremental']));

gulp.task('css', () => {
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

gulp.task('watch', () => {
    
    gulp.watch('./_sass/**/*.scss', gulp.series('css'));
    gulp.watch("_site/**/*.*").on('change', browserSync.reload);

});

gulp.task('serve', gulp.parallel('watch','browser-sync','jekyll-build'));

gulp.task('images', gulp.series('images-scale'));
