var path = require('path')
var webpack = require('webpack')

var context = path.join(__dirname, '..')
const libs = [
    'babel-polyfill',
    'vue',
    'vuex',
    'vue-router',
    'axios',
    'cookies-js',
    'qs'
]
module.exports = {
    entry: {
        vendor: libs
    },
    output: {
        path: path.join(context, 'static/js'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
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