# Axios
## 背景

* 在项目开发中 ajax 请求是必不可缺少
* 一部分 ajax 请求不需要 loading 或则请求时间少于多少是不显示 loading
* 项目中对请求的同一化处理（错误处理，返回数据格式化处理，loading 处理，token 处理）
* 配置基于个人 vue 项目进行配置，已加载 vux 相关组件，会进行一些依赖的 import（可以按需配置）

```
import Vue from 'vue'
import axios from 'axios'
//项目的一些环境配置参数，读取host
import config from '@/config'
//vuex状态管理，这里主要进行对全局loading的控制
import store from '@/store'
//vue-router对相应状态码的页面操作（router实例）
import router from '@/router'
//console对应封装
import { log } from '@/utils'
```

## 解决方案

对于 axios 的封装中我们定义几个参数进行申明

```
// 加载最小时间
const MINI_TIME = 300
// 超时时间（超时时间）
let TIME_OUT_MAX = 5000
// 环境value
let _env = process.env.NODE_ENV
// 请求接口host
let _apiHost = config.api
// 请求组（判断当前请求数）
let _requests = []
```

一般一个项目中的根 host 和 Content-Type 都是统一的，这里对 axios 进行统一的配置（如果这个后端需要 formData 格式的表单即 content-type='application/x-www-form-urlencoded;charset=utf-8'数据，需要对请求数据进行表单序列化，比较快的方式就是引入 qs 库 qs.stringify 进行处理后传输）

```
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.baseURL = _apiHost
```

一般情况下项目中同一时刻都会有不止一个请求在进行（还没有返回），要判断当前是否还存在进行中的 ajax，就需要对requests 这个数组进行维护；

```
/**
 * 添加请求，显示loading
 * @param {请求配置} config
 */
function pushRequest(config) {
  log(`${config.url}--begin`)
  _requests.push(config)
  Vue.$vux.loading.show({
    text: 'Loading'
  })
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
    Vue.$vux.loading.hide(0)
    store.dispatch('loading', false)
  }
}
```

## 接下来对 axios 基于上面的准备进行处理

```
/**
 * 请求地址，请求数据，是否静默，请求方法
 */
export default (url, data = {}, isSilence = false, method = 'POST') => {
  let _opts = { method, url }
  //通用数据的合并（token）
  let _data = Object.assign({}, data, { token: store.getters.token })
  const _query = {}
  for (let _key in _data) {
    if (_data.hasOwnProperty(_key) && _data[_key] !== '') {
      _query[_key] = _data[_key]
    }
  }
  //axios实例请求定时器ID
  let _timer = null
  //判断请求类型
  if (method.toLocaleUpperCase() === 'POST') {
    _opts.data = _query
  } else {
    _opts.params = _query
  }
  //返回一个promise
  return new Promise((resolve, reject) => {
    //实例化axios
    const _instance = axios.create({
      timeout: TIME_OUT_MAX
    })
    //定义请求的唯一标识
    let _random = { stamp: Date.now(), url: `${_apiHost + url}` }
    //判断是否静默（静默的话就不加入请求标识队列，不是则申明此请求实例的定时器）
    if (!isSilence) {
      _timer = setTimeout(() => {
        pushRequest(_random)
      }, MINI_TIME)
    }
    //axios实例发送当前请求
    //请求完成：1、取消当前请求的定时器；2、在当前请求标识队列中移除当前标识；
    //成功的话返回统一处理后的数据，失败则对状态码进行判断
    _instance(_opts)
      .then(res => {
        let responseData = res.data
        clearTimeout(_timer)
        popRequest(_random)
        resolve(res.data)
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
            router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })
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
          Vue.$vux.toast.show({
            text: _response.data && _response.data.error ? _response.data.error : _message,
            type: 'warn',
            width: '10em'
          })
        }
        reject(res)
      })
  })
}
```

[源文件路径](https://github.com/NoManReady/Tide/blob/master/src/utils/fetch.js)

## ts封装
```
import axios, { AxiosResponse, AxiosRequestConfig, CancelTokenStatic } from 'axios'
import { Message, MessageBox } from 'element-ui'
import qs from 'qs'

const SYS_CANCEL = 'System cancel'
class Request {
  protected baseURL: any = process.env.VUE_APP_BASE_URL
  protected service: any
  protected pending: Array<{
    url: string,
    cancel: Function
  }> = []
  protected CancelToken: CancelTokenStatic = axios.CancelToken
  protected axiosRequestConfig: AxiosRequestConfig = {}
  protected successCode: Array<number> = [200, 204]

  private static _instance: Request

  private static _token: string

  private constructor() {
    this.requestConfig()
    this.service = axios.create(this.axiosRequestConfig)
    this.interceptorsRequest()
    this.interceptorsResponse()
  }

  public static getInstance(): Request {
    this._instance || (this._instance = new Request())
    return this._instance
  }
  public setToken(token: string): void {
    Request._token = token
  }
  public getToken(): string {
    return Request._token
  }
  public static async resetToken() {

  }
  protected requestConfig(): void {
    this.axiosRequestConfig = {
      // baseURL`将自动加在 `url` 前面，除非 `url` 是一个绝对 URL
      baseURL: this.baseURL,
      // `headers` 是即将被发送的自定义请求头
      headers: {
        timestamp: new Date().getTime(),
        'Content-Type': 'application/json'
      },
      // transformRequest` 允许在向服务器发送前，修改请求数据
      transformRequest: [function (data: any) {
        //对data进行任意转换处理
        return data;
      }],
      // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
      transformResponse: [function (data: AxiosResponse) {
        return data
      }],
      // `paramsSerializer` 是一个负责 `params` 序列化的函数
      paramsSerializer: function (params: any) {
        return qs.stringify(params, { arrayFormat: 'brackets' })
      },
      // `timeout` 指定请求超时的毫秒数(0 表示无超时时间)
      // 如果请求话费了超过 `timeout` 的时间，请求将被中断
      timeout: 30000,
      // `withCredentials` 表示跨域请求时是否需要使用凭证
      withCredentials: false,
      // `responseType` 表示服务器响应的数据类型，可以是 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream'
      responseType: 'json',
      // `xsrfCookieName` 是用作 xsrf token 的值的cookie的名称
      xsrfCookieName: 'XSRF-TOKEN',
      // `xsrfHeaderName` 是承载 xsrf token 的值的 HTTP 头的名称
      xsrfHeaderName: 'X-XSRF-TOKEN',
      // `maxRedirects` 定义在 node.js 中 follow 的最大重定向数目
      maxRedirects: 5,
      // `maxContentLength` 定义允许的响应内容的最大尺寸
      maxContentLength: 2000,
      // `validateStatus` 定义对于给定的HTTP 响应状态码是 resolve 或 reject  promise 。如果 `validateStatus` 返回 `true` (或者设置为 `null` 或 `undefined`)，promise 将被 resolve; 否则，promise 将被 rejecte
      validateStatus: function (status: number) {
        return status >= 200 && status < 300
      },
      // // `httpAgent` 和 `httpsAgent` 分别在 node.js 中用于定义在执行 http 和 https 时使用的自定义代理。允许像这样配置选项：
      // // `keepAlive` 默认没有启用
      // httpAgent: new http.Agent({ keepAlive: true }),
      // httpsAgent: new https.Agent({ keepAlive: true })
    }
  }
  protected interceptorsRequest(): void {
    this.service.interceptors.request.use((config: any) => {
      if (Request._token) {
        config.headers['authorization'] = Request._token
        if (config.url.indexOf('?') > -1) {
          config.url += `&auth=${Request._token}`
        } else {
          config.url += `?auth=${Request._token}`
        }
      }
      this.removePending(config)
      let { cancel, token } = this.CancelToken.source()
      config.cancelToken = token
      this.pending.push({ url: `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`, cancel })
      this.requestLog(config)
      config.$$b_stamp = new Date().getTime()
      return config
    }, (error: any) => {
      return Promise.reject(error)
    })
  }
  protected interceptorsResponse(): void {
    this.service.interceptors.response.use(
      (response: any) => {
        response.config.$$e_stamp = new Date().getTime()
        this.responseLog(response)
        this.removePending(response.config)
        if (this.successCode.indexOf(response.status) === -1) {
          Message({
            message: response.data.message || 'Unknow Error',
            type: 'error',
            duration: 5 * 1000
          })
          if (response.data.code === 401) {
            MessageBox.confirm(
              '你已被登出，可以取消继续留在该页面，或者重新登录',
              '确定登出',
              {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
              }
            ).then(() => {
              Request.resetToken()
              location.reload()
            })
          }
          return Promise.reject(new Error(response.message || 'Error'))
        } else {
          return response.data
        }
      },
      (error: any) => {
        if (error.isAxiosError) {
          Message({
            message: error.message || 'Unknow Error',
            type: 'error',
            duration: 5 * 1000
          })
        }
        return Promise.reject(error)
      }
    )
  }
  protected removePending(config: any): void {
    for (let index = 0; index < this.pending.length; index++) {
      let p = this.pending[index]
      if (p.url === `${config.url}/${JSON.stringify(config.data)}&request_type=${config.method}`) {
        p.cancel(SYS_CANCEL)
        this.pending.splice(index, 1)
      }
    }
  }
  public async post(url: string, data: any = {}, config: object = {}): Promise<any> {
    try {
      const result = await this.service.post(url, JSON.stringify(data), config)
      return result.data
    } catch (error) {
      console.error(error)
    }
  }
  public async get(url: string, params: any = {}, config: object = {}): Promise<any> {
    try {
      await this.service.get(url, params, config)
    } catch (error) {
      console.error(error)
    }
  }
  public async put(url: string, data: any = {}, config: object = {}): Promise<any> {
    try {
      await this.service.put(url, qs.stringify(data), config)
    } catch (error) {
      console.error(error)
    }
  }
  public async delete(url: string, config: object = {}): Promise<any> {
    try {
      await this.service.delete(url, config)
    } catch (error) {
      console.error(error)
    }
  }
  protected requestLog(request: any): void { }
  protected responseLog(response: any): void {
    if (process.env.NODE_ENV === 'development') {
      const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(
        Math.random() * 255
      )},${Math.round(Math.random() * 255)})`
      console.log(
        '%c┍------------------------------------------------------------------┑',
        `color:${randomColor};`
      )
      let time = response.config.$$e_stamp - response.config.$$b_stamp
      let color = 'currentColor'
      if (time < 500) {
        color = 'blue'
      } else if (time < 1000) {
        color = 'pink'
      } else if (time < 1500) {
        color = 'green'
      } else {
        color = 'red'
      }
      console.log(`%c| 请求耗时：${time}ms`, `color:${color}`)
      console.log('| 请求地址：', response.config.url)
      console.log('| 请求参数：', qs.parse(response.config.data))
      console.log('| 返回数据：', response.data)
      console.log(
        '%c┕------------------------------------------------------------------┙',
        `color:${randomColor};`
      )
    }
  }
}

export default Request.getInstance()
```

## 使用方法

```
import Request from './utils/request'
Request.post('auth', {
  method: 'login',
  params: {
    password: 'U2FsdGVkX19QT/rrXNIAKXXg7dp2AZv6VVRCPUde8UE=',
    username: 'admin',
    time: '1575429820',
    encry: true
  }
}).then(d => {
  Request.setToken(d.sid)
})
```
