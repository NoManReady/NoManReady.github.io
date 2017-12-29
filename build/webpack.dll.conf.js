var path = require('path')
var webpack = require('webpack')
const config = require('../config')
var context = path.join(__dirname, '..')
const libs = ['babel-polyfill', 'axios', 'cookies-js', 'qs', 'nprogress']
const vues = ['vue', 'vuex', 'vue-router', 'element-ui','vue-i18n']
const webpackConfig = {
  entry: {
    vendor: libs,
    vueBundle: vues
  },
  output: {
    path: path.join(context, 'static/js'),
    filename: '[name].dll.js',
    library: '[name]'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(context, '[name].manifest.json'),
      name: '[name]',
      context: context
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
}
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

module.exports = webpackConfig
