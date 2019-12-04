<template>
  <div class="scroll">
    <div id="top"></div>
    <template v-for="(v,i) in renderList">
      <div :key="v">{{v}}</div>
    </template>
    <div id="bottom"></div>
  </div>
</template>
<script>
import IScroll from './iScroll'
export default {
  name: 'scroll',
  data() {
    return {
      list: [],
      renderList: [],
      pageIndex: 0,
      pageSize: 20
    }
  },
  created() {
    this._getData(this.pageIndex)
  },
  mounted() {
    let scroll = new IScroll({
      render: this._renderFunction,
      container: this.$el
    })
    scroll.start()
  },
  methods: {
    _getData(pageIndex) {
      let _begin = pageIndex * this.pageSize
      this.list = Array.from({ length: 2000 }).map((_, i) => i + _begin)
    },
    _renderFunction(index) {
      console.log(index)
      this.renderList = this.list.slice(index, this.pageSize+index)
    }
  }
}
</script>
<style lang="styl" scoped>
.scroll {
  border: 1px solid #eee;
  border-radius: 3px;
  max-height: 300px;
  overflow: hidden;
  overflow-y: auto;
  position: relative;
  #top,
  #bottom {
    height: 1px;
  }
  & > div {
    &:nth-of-type(2n) {
      background-color: red;
    }
    &:nth-of-type(2n + 1) {
      background-color: yellow;
    }
  }
}
</style>