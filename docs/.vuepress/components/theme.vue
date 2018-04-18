<template>
<div class="theme content">
    <a class="item" v-for="itm in items" :key="itm.path" :href="itm.path">{{itm.title}}</a>
</div>
</template>
<script>
import '../libs/canvas.min'
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
<style scoped>
.item {
  text-decoration: none;
  cursor: pointer;
  display: inline-block;
  color: #42b983;
  padding: 0.2em 0.5em;
  transition: all 0.3 ease-in-out;
}
.item:hover {
  color: #2e7756;
  text-decoration: none !important;
}
</style>