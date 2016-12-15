const gulp = require("gulp"),
    concat = require("gulp-concat"),
    uglify = require("gulp-uglify"),
    htmlmin = require("gulp-htmlmin"),
    server = require("gulp-server-livereload"),
    cleanCSS = require("gulp-clean-css"),
    jsonminify = require("gulp-jsonminify"),
    sass = require("gulp-sass"),
    eslint = require("gulp-eslint"),
    debug = require("gulp-debug"),
    pump = require("pump");

const config = {
    dist: "./dist/",
    libs: {
        js: {
            dirs: [
                "bower_components/angular/angular.js",
                "bower_components/angular-animate/angular-animate.js",
                "bower_components/angular-aria/angular-aria.js",
                "bower_components/angular-material/angular-material.js",
                "bower_components/lodash/lodash.js"
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
            dirs: ["app/**/*.js", "!app/assets/i18n/*.js"],
            name: "app.min.js"
        },
        scss: {
            dirs: "app/**/*.scss",
            name: "app.min.css"
        },
        translation: {
            source: "app/assets/translations/*.json",
            destination: "translations/",
        },
        i18n: {
            source: "app/assets/i18n/*.js",
            destination: "i18n/",
        }
    }
};

const js = [
    {src: config.libs.js.dirs, name: config.libs.js.name, dest: config.dist},
    {src: config.app.js.dirs, name: config.app.js.name, dest: config.dist}
];

const i18n = [
    {src: config.app.i18n.source, dest: config.dist + config.app.i18n.destination}
];

const css = [
    {src: config.libs.css.dirs, name: config.libs.css.name, dest: config.dist}
];

const scss = [
    {src: config.app.scss.dirs, name: config.app.scss.name, dest: config.dist}
];

const json = [
    {src: config.app.translation.source, dest: config.dist + config.app.translation.destination}
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
    const options = {
        preserveComments: "license"
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

gulp.task("i18n", function () {
    i18n.forEach(function (item) {
        pump([
            gulp.src(item.src),
            debug(),
            uglify(),
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

gulp.task("scss", function () {
    scss.forEach(function (item) {
        pump([
            gulp.src(item.src),
            sass().on("error", sass.logError),
            concat(item.name),
            gulp.dest(item.dest)
        ]);
    });
});

gulp.task("html", function () {
    const options = {
        collapseWhitespace: true
    };

    pump([
        gulp.src("app/index.html"),
        htmlmin(options),
        gulp.dest(config.dist)
    ]);
});

gulp.task("json", function () {
    json.forEach(function (item) {
        pump([
            gulp.src(item.src),
            jsonminify(),
            gulp.dest(item.dest)
        ]);
    });
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
    gulp.watch("app/**/*.sass", ["scss"]);
    gulp.watch("app/**/*.json", ["json"]);
});

gulp.task("default", ["prod"]);
gulp.task("prod", ["scss", "js", "css", "html", "json", "i18n"]);
gulp.task("dev", ["webserver", "watch"]);
