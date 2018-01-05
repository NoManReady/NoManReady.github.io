import * as types from './constant'
import router from '@/router'
import { loadFromLocal, saveToLocal } from '@/utils/localStorage'

/**
 * 全局布局状态相关
 */
export default {
  state: {
    // 路由title
    title: '',
    // 动画效果
    direction: 'forward',
    // 全局loading
    loading: false,
    // 初始化标识
    init: loadFromLocal(types.APP_INIT) || 0,
    // 语言
    lang: loadFromLocal(types.APP_LANG) || 'zh',
    // 侧边栏是否打开
    collapse: Boolean(loadFromLocal(types.APP_ASIDE_OPEN))
  },
  actions: {
    title({ commit }, title) {
      document.title = title
      commit(types.APP_TITLE, title)
    },
    direction({ commit }, direction) {
      commit(types.APP_DIRECTION, direction)
    },
    loading({ commit }, loading = true) {
      commit(types.APP_LOADING, loading)
    },
    setInit({ commit }, init = 1) {
      saveToLocal(types.APP_INIT, init)
      commit(types.APP_INIT, init)
    },
    setLang({ commit }, lang = 'zh') {
      window.I18N.locale = lang
      saveToLocal(types.APP_LANG, lang)
      commit(types.APP_LANG, lang)
    },
    setCollapse({ commit }, collpse = true) {
      saveToLocal(types.APP_ASIDE_OPEN, collpse)
      commit(types.APP_ASIDE_OPEN, collpse)
    }
  },
  mutations: {
    [types.APP_TITLE](state, payload) {
      state.title = payload
    },
    [types.APP_DIRECTION](state, payload) {
      state.direction = payload
    },
    [types.APP_LOADING](state, payload) {
      state.loading = payload
    },
    [types.APP_INIT](state, payload) {
      state.init = payload
    },
    [types.APP_LANG](state, payload) {
      state.lang = payload
    },
    [types.APP_ASIDE_OPEN](state, payload) {
      state.collapse = payload
    }
  },
  getters: {
    loading(state) {
      return state.loading
    },
    direction(state) {
      return state.direction
    },
    init(state) {
      return state.init
    },
    lang(state) {
      return state.lang
    },
    collapse(state) {
      return state.collapse
    }
  }
}
