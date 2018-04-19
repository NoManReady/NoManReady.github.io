<template>
<div class="theme flex-box">
    <div class="flex-item" v-for="itm in items" :key="itm.path">
      <a class="tit" :href="itm.path">{{itm.title}}</a>
    </div>
</div>
</template>
<script>
export default {
  name: 'Theme',
  data() {
    return {}
  },
  created() {
    console.log(this)
  },
  computed: {
    path() {
      return this.$page.path
    },
    items() {
      return this.$site.pages.filter(p => {
        return p.path.indexOf(this.path) === 0 && p.path.indexOf('.html') > -1
      })
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>