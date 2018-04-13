// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

// cookies配置
import cookie from 'cookies-js'
window.Cookies = cookie

// router进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: false })

// UI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 配置皮肤（打开编译比较慢）
// import '@/theme/default.scss'
// 国际化配置
import VueI18n from 'vue-i18n'
import lang from '@/lang'

Vue.use(VueI18n)
let i18n = null
window.I18N = i18n = new VueI18n({
  locale: store.state.app.lang || 'en',
  messages: lang
})
Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

// 工具配置
import apis from '@/api'
import bus from '@/utils/bus'
Object.defineProperties(Vue.prototype, {
  $api: {
    value: apis
  },
  $bus: {
    value: bus
  }
})

// 环境配置
const dev = process.env.NODE_ENV !== 'production'
Vue.config.debug = dev
Vue.config.devtools = dev
Vue.config.productionTip = dev

// 页面路由对象记录配置（选配）
const HISTORY_CACHE = Object.create(null)
let HISTORY_CACHE_KEY_COUNT = 0
HISTORY_CACHE['/'] = 0
router.beforeEach((to, from, next) => {
  // 设置title，开启加载条
  NProgress.start()
  to.meta && to.meta.t && store.dispatch('title', i18n.t(to.meta.t))
  /*页面级animated--begin*/
  let toName = to.name || to.path
  let fromName = from.name || from.path
  const toIndex = HISTORY_CACHE[toName]
  const fromIndex = HISTORY_CACHE[fromName]
  // 判断当前页面是否进入过
  // 是：如果当前权级>前一个权级，进入（forward），否则退出（reverse）
  // 否：记录当前路径-权级+1，并进入（forward）
  if (toIndex) {
    if (parseInt(toIndex, 10) > parseInt(fromIndex, 10)) {
      store.dispatch('direction', 'forward')
    } else {
      store.dispatch('direction', 'reverse')
    }
  } else {
    ++HISTORY_CACHE_KEY_COUNT
    toName !== '/' && (HISTORY_CACHE[toName] = HISTORY_CACHE_KEY_COUNT)
    store.dispatch('direction', 'forward')
  }
  /*页面级animated--end*/
  next()
})

router.afterEach((to, from) => {
  // 关闭加载条
  NProgress.done()
})

// import('@/libs/canvas.min.js')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: { App }
})
