(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{50:function(e,n,t){"use strict";t.r(n);var a=t(0),s=Object(a.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"axios"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#axios","aria-hidden":"true"}},[e._v("#")]),e._v(" Axios")]),t("h2",{attrs:{id:"1、背景"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#1、背景","aria-hidden":"true"}},[e._v("#")]),e._v(" 1、背景")]),t("ul",[t("li",[e._v("在项目开发中 ajax 请求是必不可缺少")]),t("li",[e._v("一部分 ajax 请求不需要 loading 或则请求时间少于多少是不显示 loading")]),t("li",[e._v("项目中对请求的同一化处理（错误处理，返回数据格式化处理，loading 处理，token 处理）")]),t("li",[e._v("配置基于个人 vue 项目进行配置，已加载 vux 相关组件，会进行一些依赖的 import（可以按需配置）")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import Vue from 'vue'\nimport axios from 'axios'\n//项目的一些环境配置参数，读取host\nimport config from '@/config'\n//vuex状态管理，这里主要进行对全局loading的控制\nimport store from '@/store'\n//vue-router对相应状态码的页面操作（router实例）\nimport router from '@/router'\n//console对应封装\nimport { log } from '@/utils'\n")])]),t("h2",{attrs:{id:"2、解决方案"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#2、解决方案","aria-hidden":"true"}},[e._v("#")]),e._v(" 2、解决方案")]),t("p",[e._v("对于 axios 的封装中我们定义几个参数进行申明")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("// 加载最小时间\nconst MINI_TIME = 300\n// 超时时间（超时时间）\nlet TIME_OUT_MAX = 5000\n// 环境value\nlet _env = process.env.NODE_ENV\n// 请求接口host\nlet _apiHost = config.api\n// 请求组（判断当前请求数）\nlet _requests = []\n")])]),t("p",[e._v("一般一个项目中的根 host 和 Content-Type 都是统一的，这里对 axios 进行统一的配置（如果这个后端需要 formData 格式的表单即 content-type='application/x-www-form-urlencoded;charset=utf-8’数据，需要对请求数据进行表单序列化，比较快的方式就是引入 qs 库 qs.stringify 进行处理后传输）")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("axios.defaults.headers.common['Content-Type'] = 'application/json'\naxios.defaults.baseURL = _apiHost\n")])]),t("p",[e._v("一般情况下项目中同一时刻都会有不止一个请求在进行（还没有返回），要判断当前是否还存在进行中的 ajax，就需要对requests 这个数组进行维护；")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/**\n * 添加请求，显示loading\n * @param {请求配置} config\n */\nfunction pushRequest(config) {\n  log(`${config.url}--begin`)\n  _requests.push(config)\n  Vue.$vux.loading.show({\n    text: 'Loading'\n  })\n  store.dispatch('loading')\n}\n\n/**\n * 移除请求，无请求时关闭loading\n * @param {请求配置} config\n */\nfunction popRequest(config) {\n  log(`${config.url}--end`)\n  let _index = _requests.findIndex(r => {\n    return r === config\n  })\n  if (_index > -1) {\n    _requests.splice(_index, 1)\n  }\n  if (!_requests.length) {\n    Vue.$vux.loading.hide(0)\n    store.dispatch('loading', false)\n  }\n}\n")])]),t("h2",{attrs:{id:"3、接下来对-axios-基于上面的准备进行处理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#3、接下来对-axios-基于上面的准备进行处理","aria-hidden":"true"}},[e._v("#")]),e._v(" 3、接下来对 axios 基于上面的准备进行处理")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("/**\n * 请求地址，请求数据，是否静默，请求方法\n */\nexport default (url, data = {}, isSilence = false, method = 'POST') => {\n  let _opts = { method, url }\n  //通用数据的合并（token）\n  let _data = Object.assign({}, data, { token: store.getters.token })\n  const _query = {}\n  for (let _key in _data) {\n    if (_data.hasOwnProperty(_key) && _data[_key] !== '') {\n      _query[_key] = _data[_key]\n    }\n  }\n  //axios实例请求定时器ID\n  let _timer = null\n  //判断请求类型\n  if (method.toLocaleUpperCase() === 'POST') {\n    _opts.data = _query\n  } else {\n    _opts.params = _query\n  }\n  //返回一个promise\n  return new Promise((resolve, reject) => {\n    //实例化axios\n    const _instance = axios.create({\n      timeout: TIME_OUT_MAX\n    })\n    //定义请求的唯一标识\n    let _random = { stamp: Date.now(), url: `${_apiHost + url}` }\n    //判断是否静默（静默的话就不加入请求标识队列，不是则申明此请求实例的定时器）\n    if (!isSilence) {\n      _timer = setTimeout(() => {\n        pushRequest(_random)\n      }, MINI_TIME)\n    }\n    //axios实例发送当前请求\n    //请求完成：1、取消当前请求的定时器；2、在当前请求标识队列中移除当前标识；\n    //成功的话返回统一处理后的数据，失败则对状态码进行判断\n    _instance(_opts)\n      .then(res => {\n        let responseData = res.data\n        clearTimeout(_timer)\n        popRequest(_random)\n        resolve(res.data)\n      })\n      .catch(res => {\n        let _response = res.response\n        let _message = null\n        clearTimeout(_timer)\n        popRequest(_random)\n        switch (_response.status) {\n          case 404:\n            _message = '404,错误请求'\n            break\n          case 401:\n            router.push({ path: '/login', query: { redirect: router.currentRoute.fullPath } })\n            _message = '未授权'\n            break\n          case 403:\n            _message = '禁止访问'\n            break\n          case 408:\n            _message = '请求超时'\n            break\n          case 500:\n            _message = '服务器内部错误'\n            break\n          case 501:\n            _message = '功能未实现'\n            break\n          case 503:\n            _message = '服务不可用'\n            break\n          case 504:\n            _message = '网关错误'\n            break\n          default:\n            _message = '未知错误'\n        }\n        if (!isSilence) {\n          Vue.$vux.toast.show({\n            text: _response.data && _response.data.error ? _response.data.error : _message,\n            type: 'warn',\n            width: '10em'\n          })\n        }\n        reject(res)\n      })\n  })\n}\n")])]),t("p",[t("a",{attrs:{href:"https://github.com/NoManReady/Tide/blob/master/src/utils/fetch.js",target:"_blank",rel:"noopener noreferrer"}},[e._v("源文件路径")])])])}],!1,null,null,null);n.default=s.exports}}]);