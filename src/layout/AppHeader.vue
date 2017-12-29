<template>
<div class="app-header" @click="setLang">{{$t('app.header')}}</div>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {}
  },
  methods: {
    setLang() {
      if (this.$store.getters.lang === 'zh') {
        this.$bus.$emit('lang', 'en')
      } else {
        this.$bus.$emit('lang', 'zh')
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>