# 手机适配方案gulp配置

```
let del = require('del')
let sass = require('gulp-sass')
let connect = require('connect')
let http = require('http')
let path = require('path')
let serveStatic = require('serve-static')
let autoprefixer = require('autoprefixer')


const OPTIONS = {
  build: path.join(__dirname, '../code/style'),
  srDir: ['./scss/*.scss'],
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
gulp.task('watch', function () {
  return gulp.watch(OPTIONS.srDir, gulp.parallel('compile'))
})


// 创建静态服务
gulp.task('static', () => {
  let app = connect()
  app.use(serveStatic(OPTIONS.server.base))
  http.createServer(app).listen(OPTIONS.server.port)
})

// // 默认任务
gulp.task('default', gulp.series('clean', 'compile', gulp.parallel('static', 'watch')))
```