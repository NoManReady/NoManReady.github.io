<template>
<div class="theme flex-box">
    <div class="flex-item tc" v-for="itm in items" :key="itm.path" @click="goPath(itm.path)">
      <a href="javascript:;">{{itm.title}}</a>
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
  },
  methods:{
    goPath(path){
      window.location.href=path
    }
  }
}
</script>
<style lang="stylus" scoped>

</style>