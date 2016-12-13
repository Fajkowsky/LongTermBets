var gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    server = require("gulp-server-livereload"),
    debug = require("gulp-debug"),
    cleanCSS = require("gulp-clean-css"),
    eslint = require("gulp-eslint"),
    pump = require("pump");

var config = {
    dist: "./dist/",
    libs: {
        js: {
            dirs: [
                "bower_components/angular/angular.js",
                "bower_components/angular-animate/angular-animate.js",
                "bower_components/angular-aria/angular-aria.js",
                "bower_components/angular-material/angular-material.js"
            ],
            name: "libs.min.js"
        },
        css: {
            dirs: [
                "bower_components/angular-material/angular-material.css"
            ],
            name: "libs.min.css"
        }
    },
    app: {
        js: {
            dirs: "app/**/*.js",
            name: "app.min.js"
        }
    }
};

var js = [
    {src: config.libs.js.dirs, name: config.libs.js.name, dest: config.dist},
    {src: config.app.js.dirs, name: config.app.js.name, dest: config.dist}
];

var css = [
    {src: config.libs.css.dirs, name: config.libs.css.name, dest: config.dist}
];

gulp.task("lint", function () {
    return pump([
        gulp.src(config.app.js.dirs),
        eslint(),
        eslint.format(),
        eslint.failAfterError()
    ]);
});

gulp.task("js", ["lint"], function () {
    var options = {
        preserveComments: 'license'
    };

    js.forEach(function (item) {
        pump([
            gulp.src(item.src),
            uglify(options),
            concat(item.name),
            gulp.dest(item.dest)
        ]);
    });
});

gulp.task("css", function () {
    css.forEach(function (item) {
        pump([
            gulp.src(item.src),
            cleanCSS({compatibility: "ie8"}),
            concat(item.name),
            gulp.dest(item.dest)
        ]);
    });
});

gulp.task("html", function () {
    var options = {
        collapseWhitespace: true
    };

    pump([
        gulp.src("app/index.html"),
        htmlmin(options),
        gulp.dest(config.dist)
    ]);
});

gulp.task("webserver", ["prod"], function () {
    pump([
        gulp.src(config.dist),
        server({
            livereload: true
        })
    ]);
});

gulp.task("watch", function () {
    gulp.watch("app/**/*.html", ["html"]);
    gulp.watch("app/**/*.js", ["js"]);
    gulp.watch("app/**/*.css", ["css"]);
});

gulp.task("default", ["prod"]);
gulp.task("prod", ["js", "css", "html"]);
gulp.task("dev", ["webserver", "watch"]);
