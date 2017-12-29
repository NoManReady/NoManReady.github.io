<template>
  <router-view class="app" v-loading.fullscreen.lock="loading" :element-loading-text="loadingText"></router-view>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      loadingText:'努力加载中...'
    }
  },
  created() {
    this.$bus.$on('lang', this._setLang)
  },
  computed: {
    ...mapGetters(['loading'])
  },
  methods: {
    ...mapActions(['setLang']),
    _setLang(lang = 'zh') {
      this.setLang(lang)
    }
  }
}
</script>
<style lang="scss">
@import './style/common.scss';
@import './style/layout.scss';
</style>