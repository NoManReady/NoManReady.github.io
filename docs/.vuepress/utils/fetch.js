import axios from 'axios'

// 加载最小时间
const MINI_TIME = 300
// 超时时间
let TIME_OUT_MAX = 30000
// 请求接口host
let _apiHosts = {
  github: 'https://api.github.com'
}
// 请求组（判断当前请求数）
let _requests = []

let LOADING = null

let TOKEN = '70d96dc2034624f1b1c43263baa73569fe1f9ca7'

/**
 * 添加请求
 * @param {请求配置} config
 */
function pushRequest(config) {
  _requests.push(config)
}

/**
 * 移除请求
 * @param {请求配置} config
 */
function popRequest(config) {
  let _index = _requests.findIndex(r => {
    return r === config
  })
  if (_index > -1) {
    _requests.splice(_index, 1)
  }
}

// 无Token请求
const noToken = []
// 全局设置axios
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.Authorization = TOKEN
axios.defaults.baseURL = _apiHosts['github']
/**
 * 请求地址，请求数据，是否静默，请求方法
 */
export default (url, data = {}, setting = {}) => {
  if (setting.timeout === 0) {
    setting.timeout = Infinity
  }
  setting = Object.assign({ timeout: TIME_OUT_MAX, method: 'GET' }, setting)
  let _opts = { url }
  let _data = Object.assign({}, data)
  let _timer = null
  if (setting.method.toLocaleUpperCase() === 'POST') {
    _opts.data = _data
  } else {
    _opts.params = _data
  }
  return new Promise((resolve, reject) => {
    const _instance = axios.create({
      timeout: setting.timeout
    })
    let _random = {
      stamp: Date.now(),
      url: `${_apiHosts['github'] + url}`
    }
    _timer = setTimeout(() => {
      pushRequest(_random)
    }, MINI_TIME)
    _instance(_opts)
      .then(res => {
        let responseData = res.data || {}
        clearTimeout(_timer)
        popRequest(_random)
        if (!responseData.error) {
          resolve(responseData)
        } else {
          reject(responseData)
        }
      })
      .catch(res => {
        let _response = res.response
        let _message = null
        clearTimeout(_timer)
        if (!setting.isSilence) {
          popRequest(_random)
        }
        switch (_response && _response.status) {
          case 404:
            _message = '404,错误请求'
            break
          case 403:
          case 401:
            _message = '禁止访问'
            break
          case 408:
            _message = '请求超时'
            break
          case 500:
            _message = '服务器内部错误'
            break
          case 501:
            _message = '功能未实现'
            break
          case 503:
            _message = '服务不可用'
            break
          case 504:
            _message = '网关错误'
            break
          default:
            _message = '未知错误'
        }
        alert(_message)
        reject(res)
      })
  })
}
