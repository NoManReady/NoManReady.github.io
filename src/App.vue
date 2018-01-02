<template>
  <router-view class="app" v-loading.lock="loading" :element-loading-text="loadingText"></router-view>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'App',
  data() {
    return {
      // loadingText: this.$t('common.loading')
    }
  },
  created() {
    this.$bus.$on('lang', this._setLang)
  },
  computed: {
    ...mapGetters(['loading']),
    loadingText(){
      return this.$t('common.loading')
    }
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