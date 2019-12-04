# 手机适配方案gulp配置

## 样式配置文件
```
let gulp = require('gulp')
let sass = require('gulp-sass')
let autoprefixer = require('autoprefixer')
let postcss = require('gulp-postcss')
let minifyCss = require('gulp-minify-css')
let minifyJs = require('gulp-minify')
let babel = require('gulp-babel')
let del = require('del')
let Reproxy = require("gulp-connect-reproxy")

let connect = require('gulp-connect')


const OPTIONS = {
  build: 'dist',
  cssDir: ['./src/scss/*.scss'],
  jsDir: ['./src/js/*.js'],
  server: {
    port: 8099,
    base: path.join(__dirname, '../code')
  }
}

var gulp = require('gulp')
var postcss = require('gulp-postcss')
var px2rem = require('postcss-px2rem')
let px2viewport = require('postcss-px-to-viewport')

//gulp[series,parallel]=['串行','并行']（都是返回一个函数，并且都是接受任务串）

gulp.task('compile', function () {
  var processors = [
    px2viewport({
      // 设计稿尺寸
      viewportWidth: 750,
      // viewportHeight: 667,
      unitPrecision: 5,
      viewportUnit: 'vw',
      selectorBlackList: [],
      minPixelValue: 1,
      mediaQuery: false
    }),
    // px2rem({
    //   // 1rem=74px
    //   remUnit: 75
    // }),
    autoprefixer({
      browsers: ["Android 4.1", "iOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"]
    })]
  return gulp.src(OPTIONS.srDir)
    .pipe(sass())
    .pipe(postcss(processors))
    .pipe(gulp.dest(OPTIONS.build))
})

// 清楚编译文件夹
gulp.task('clean', cb => {
  return del(OPTIONS.build, { force: true }, cb)
})

// // 监听编译目录
// 监听编译目录
gulp.task('watch', function () {
  return gulp.watch(OPTIONS.cssDir, gulp.parallel('compileCss'))
})

gulp.task('watchjs', function () {
  return gulp.watch(OPTIONS.jsDir, gulp.parallel('compileJs'))
})


// 创建静态服务(代理服务)
gulp.task('static', (done) => {
  connect.server({
    root: OPTIONS.server.base,
    port: OPTIONS.server.port,
    host: '127.0.0.1',
    livereload: true,
    middleware: function (connect, options) {
      options.rule = [/\.[png|jpg|cgi]/]
      options.server = "192.168.1.1"
      return [new Reproxy(options)]
    }
  })
  // let app = connect()
  // app.use(serveStatic(OPTIONS.server.base))
  // http.createServer(app).listen(OPTIONS.server.port)
  done()
})

// 默认任务
gulp.task('default',
  gulp.series('clean', 'compileCss', 'compileJs',
    gulp.parallel('watch', 'watchjs', 'static')))


{
  "name": "typescript",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.2.2",
    "@babel/preset-env": "^7.2.3",
    "babel-core": "^6.26.3",
    "babel-preset-env": "^1.7.0",
    "gulp-autoprefixer": "^6.0.0",
    "gulp-babel": "^8.0.0",
    "gulp-concat": "^2.6.1",
    "gulp-connect": "^5.7.0",
    "gulp-connect-reproxy": "0.0.98",
    "gulp-minify": "^3.1.0",
    "gulp-minify-css": "^1.2.4",
    "gulp-notify": "^3.2.0",
    "gulp-postcss": "^8.0.0",
    "gulp-rename": "^1.4.0",
    "gulp-sass": "^4.0.2",
    "gulp-uglify": "^3.0.1"
  },
  "dependencies": {
    "connect": "^3.6.6",
    "del": "^3.0.0",
    "gulp": "^4.0.0",
    "gulp-load-plugins": "^1.5.0",
    "serve-static": "^1.13.2"
  }
}

```

## 无线滚动测试

<js-scroll/>