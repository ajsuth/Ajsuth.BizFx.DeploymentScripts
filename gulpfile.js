let gulp = require('gulp');
let del = require('del');
let exec = require('child_process').exec;

var config = require("./gulp-config.js")();
module.exports.config = config;

gulp.task('Copy-Built-BizFx-Files', function () {
    return gulp.src("./dist/sdk/**/*")
        .pipe(gulp.dest(config.bizFxRoot));
});

gulp.task('Delete-Existing-BizFx-Files', function () {
    return del(config.bizFxRoot + "\\**\**", { force: true });
});

gulp.task("01-Build-BizFx", function (callback) {
	exec('ng build -prod', function (err, stdout, stderr) {
		console.log(stdout);
		console.log(stderr);
		callback(err);
	});
});

gulp.task('02-Deploy-BizFx',
    gulp.series(
        "Delete-Existing-BizFx-Files",
        "Copy-Built-BizFx-Files",
		function (done) {
            done();
        }));

gulp.task("default",
    gulp.series(
        "01-Build-BizFx",
        "02-Deploy-BizFx",
        function (done) {
            done();
        }));