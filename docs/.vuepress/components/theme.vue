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
<style lang="scss" scoped>
.theme {
  padding: 3rem;
}
.flex-box {
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  .flex-item {
    padding: 1em;
    border-radius: 0.2em;
    box-shadow: 0 0 .2em darken(#42b983, 8%);
    cursor: pointer;
    transition: all 0.3 ease-in-out;
    color: #42b983;
    &:not(:first-child){
      margin-left: 1em;
    }
    &:hover{
      box-shadow: 0 0 .5em darken(#42b983, 12%);
    }
  }
}
</style>