<template>
  <div class="article">
    <div class="article-lis">
      <a href="javascript:;" :class="{active:activeItem===item}" class="article-item" v-for="(item,index) in acticles" :key="item" @click="onClick(item,index+1)">{{item}}</a>
    </div>
    <transition name="fade">
      <div class="article-content" v-html="content"></div>
    </transition>
  </div>
</template>
<script>
import ARTICLES from '@/post'
import hljs from '@/utils/hljs'
import { loadFromLocal, saveToLocal } from '@/utils/localStorage'
const ART_INDEX = 'ART_INDEX'
export default {
  name: 'Article',
  data() {
    return {
      acticles: ARTICLES,
      content: '',
      activeItem: ''
    }
  },
  created() {
    if (!ARTICLES || !ARTICLES.length) {
      this.content = 'The article list is empty -_-'
      return
    }
    let _art = loadFromLocal(ART_INDEX)
    let _index = ARTICLES.indexOf(_art) > -1 ? ARTICLES.indexOf(_art) : 0
    this.activeItem = ARTICLES[_index]
    this.load(_index + 1)
  },
  methods: {
    load(index) {
      let _artName = `${index}@${this.activeItem}`
      this.$api.getArticle(_artName).then(d => {
        hljs(d).then(content => {
          this.content = content
        })
      })
    },
    onClick(item, index) {
      saveToLocal(ART_INDEX, item)
      this.activeItem = item
      this.load(index)
    }
  }
}
</script>
<style lang="scss" scoped>
.article {
  &-lis {
    padding: 20px 5px;
    box-shadow: 0 2px 0 0 #68e3cc;
    white-space: pre-wrap;
  }
  &-item {
    border-radius: 5px;
    border: 1px solid #ccc;
    padding: 2px 6px;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    & + & {
      margin-left: 10px;
    }
    &.active {
      color: #fff;
      background-color: #68e3cc;
      border-color: darken(#68e3cc, 10%);
    }
    &:hover:not(.active) {
      color: #68e3cc;
      border-color: darken(#68e3cc, 10%);
    }
  }
}
</style>
