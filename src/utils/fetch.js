// import Vue from 'vue'
import qs from 'qs'
import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Message } from 'element-ui'
import { log } from '@/utils'

// 加载最小时间
const MINI_TIME = 300
// 超时时间
let TIME_OUT_MAX = 5000
// 环境value
let _dev = process.env.NODE_ENV !== 'production'
// 请求接口host
let _apiHost = '/'
// 请求组（判断当前请求数）
let _requests = []

/**
 * 添加请求，显示loading
 * @param {请求配置} config
 */
function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  store.dispatch('loading')
}

/**
 * 移除请求，无请求时关闭loading
 * @param {请求配置} config
 */
function popRequest(config) {
  log(`${config.url}--end`)
  let _index = _requests.findIndex(r => {
    return r === config
  })
  if (_index > -1) {
    _requests.splice(_index, 1)
  }
  if (!_requests.length) {
    setTimeout(() => {
      store.dispatch('loading', false)
    }, 100)
  }
}

// 无Token请求
const noToken = []
// 全局设置axios
axios.defaults.headers.common['Content-Type'] =
  'application/x-www-form-urlencoded'
axios.defaults.baseURL = _apiHost
/**
 * 请求地址，请求数据，是否静默，请求方法
 */
export default (url, data = {}, method = 'GET', isSilence = false) => {
  let _opts = { method, url }
  let _data = Object.assign({}, data)
  const _query = {}
  for (let _key in _data) {
    if (_data.hasOwnProperty(_key)) {
      _query[_key] = _data[_key]
    }
  }
  let _timer = null
  if (method.toLocaleUpperCase() === 'POST') {
    _opts.data = qs.stringify(_query)
  } else {
    _opts.params = _query
  }
  return new Promise((resolve, reject) => {
    const _instance = axios.create({
      timeout: TIME_OUT_MAX
    })
    let _random = { stamp: Date.now(), url: `${_apiHost + url}` }
    if (!isSilence) {
      _timer = setTimeout(() => {
        pushRequest(_random)
      }, MINI_TIME)
    }
    _instance(_opts)
      .then(res => {
        let responseData = res.data || null
        clearTimeout(_timer)
        popRequest(_random)
        resolve(responseData)
      })
      .catch(res => {
        let _response = res.response
        let _message = null
        clearTimeout(_timer)
        popRequest(_random)
        switch (_response.status) {
          case 404:
            _message = '404,错误请求'
            break
          case 401:
            window.location.href = `/?redirect=${router.currentRoute.fullPath}`
            _message = '未授权'
            break
          case 403:
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
        if (!isSilence) {
          // 错误提示
          Message({
            type: 'error',
            message: _message || _response.message
          })
        }
        reject(res)
      })
  })
}
