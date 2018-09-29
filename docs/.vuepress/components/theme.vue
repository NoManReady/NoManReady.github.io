<template>
  <div class="theme">
    <p class="mt20" v-for="(itm,index) in items" :key="itm.path">
      <span class="c-theme">{{index+1}}、</span>
      <a href="javascript:;" @click="goPath(itm.path)">{{itm.title}}</a>
    </p>
  </div>
</template>
<script>
export default {
  name: 'Theme',
  data() {
    return {}
  },
  created() {},
  computed: {
    path() {
      return this.$page.path
    },
    items() {
      return this.$site.pages.filter(p => {
        return p.path.indexOf(this.path) === 0 && p.path.indexOf('.html') > -1
      })
    }
  },
  methods: {
    goPath(path) {
      window.location.href = path
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>