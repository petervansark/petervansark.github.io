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
                width: 500,
                format: 'jpeg',
                height: 330,
                rename: { suffix: '-500px' }
            }, 
                {
                width: 980,
                height: 660,
                format: 'jpeg',
                rename: { suffix: '-1000px' }
            },
            {
                width: 1400,
                height: 990,
                format: 'jpeg',
                rename: { suffix: '-1500px' }
            },
            {
                width: 500,
                height: 330,
                format: 'webp',
                rename: { suffix: '-500px' }
            },
            {
                width: 980,
                format: 'webp',
                height: 660,
                rename: { suffix: '-1000px' }
            },
            {
                width: 1400,
                height: 990,
                format: 'webp',
                rename: { suffix: '-1500px' }
            }
        ]
      }, {
        quality: 80,
        progressive: true,
        withMetadata: false,
      }))
      .pipe(gulp.dest('./assets/optimized/'));
  });

  gulp.task('image-webp', () => {
    return gulp.src('./assets/*.png')
    .pipe(responsive({
        '*.png': [
            {
                width: '25%',
                format: 'png',
                rename: { suffix: '-25per' }
            },
            {
                width: '50%',
                format: 'png',
                rename: { suffix: '-50per' }
            },
            {
                width: '100%',
                format: 'png',
                rename: { suffix: '-100per' }
            },
            {
                width: '25%',
                format: 'webp',
                rename: { suffix: '-25per' }
            },
            {
                width: '50%',
                format: 'webp',
                rename: { suffix: '-50per' }
            },
            {
                width: '100%',
                format: 'webp',
                rename: { suffix: '-100per' }
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

gulp.task('images', gulp.series('images-scale','image-webp'));
