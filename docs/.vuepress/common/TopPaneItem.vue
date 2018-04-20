<template>
<div class="top-pane-item">
    <a :href="item.html_url" class="top-pane-item--tit" target="_blank">{{item.name}}</a>
</div>
</template>
<script>
export default {
  props:['item'],
  name: "TopPaneItem",
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus">
</style>