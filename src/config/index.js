const config = {
    development: {
        api: 'http://localhost:8088/api'
    },
    production: {
        // 线上api地址
        api: 'http://192.168.23.118:8888'
    }
}
export default config[process.env['NODE_ENV']]