// initialize modules
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const { series, parallel } = require('gulp');

//File path variables

//optimize images
gulp.task('imageMin',() =>
            gulp.src('src/images/*')
            .pipe(imagemin())
            .pipe(gulp.dest('distro/images'))
            );

// exports.default = () => (
//                 gulp.src('src/images/*')
//                     .pipe(imagemin())
//                     .pipe(gulp.dest('distro/imagesbasic'))
//             );

// gulp.task('message', function(){
//     return console.log('gulp is running.....')
// })


//Copy all HTML files
gulp.task('copyHtml',function(){
    gulp.src('src/*.html')
    .pipe(gulp.dest('distro'));
});


// minify js
gulp.task('minify',function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('distro/js'));
})

//compile sass
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('distro/css'))
});

//scripts 
gulp.task('scripts', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('distro/js'));

})

// //sass task
// function scssTask(){
//     return src(files.scssPath)
//         .pipe(sourcemaps.init())
//         .pipe(sass())
//         .pipe(postcss([ autoprefixer(), cssnano() ]))
//         .pipe(sourcemaps.write('.'))
//         .pipe(dest('dist'));        
// }

// //js task
// function jsTask(){
//     return src(files.jsPath)
//     .pipe(concat('all.js'))
//     .pipe(uglify())
//     .pipe(dest('dist'))
// }


// //cachebusting task
// const cbString = new Date().getTime();
// function cacheBustTask(){
//     return src(['index.html'])
//         .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
//         .pipe(dest('.'));
// }


// //watch task
// function watchTask(){
//     watch([files.scssPath, files.jsPath], parallel(scssTask, jsTask));
// }

//default task
// exports.default = parallel(    
//     'copyHtml', 'imageMin', 'sass', 'scripts'
// )

gulp.task('default', gulp.parallel('copyHtml', 'imageMin', 'sass', 'scripts'));

 gulp.task('watch', function(){
    gulp.watch('src/js/*.js', gulp.parallel('scripts'));
    gulp.watch('src/images/*', gulp.parallel('imageMin'));
    gulp.watch('src/sass/*.scss', gulp.parallel('sass'));
    gulp.watch('src/*.html', gulp.parallel('copyHtml'));
  });


