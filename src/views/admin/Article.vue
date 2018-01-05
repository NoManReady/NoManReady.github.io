<template>
  <div class="article">
    <transition name="fade" mode="out-in">
      <div class="article-lis" v-show="acticles.length">
        <a href="javascript:;" :class="{active:activeItem.path===item.path}" class="article-item" v-for="item in acticles" :key="item.path" @click="onClick(item)">{{item.name}}</a>
      </div>
    </transition>
    <transition name="el-fade-in" mode="out-in">
      <div class="article-content" v-html="content" :key="content"></div>
    </transition>
  </div>
</template>
<script>
import ARTICLES from '@/post'
import hljs from '@/utils/hljs'
import { loadFromLocal, saveToLocal } from '@/utils/localStorage'
const ART_ITEM = 'ART_ITEM'
export default {
  name: 'Article',
  data() {
    return {
      acticles: [],
      content: '',
      activeItem: ''
    }
  },
  created() {
    this.initPage()
  },
  watch: {
    $route() {
      this.initPage()
    }
  },
  methods: {
    initPage() {
      let _type = this.$route.params.type
      this.acticles = ARTICLES.filter(art => {
        return art.type === _type
      })
      if (!this.acticles.length) {
        this.content = `<p class="no-data">${this.$t('common.nodata')}</p>`
        return
      } else {
        this.content = `<p class="no-data">${this.$t('common.loading')}</p>`
      }
      let _art = loadFromLocal(ART_ITEM)
      let _item = this.acticles[0]
      if (_art) {
        _item =
          this.acticles.find(art => {
            return art.path === _art.path
          }) || _item
      }
      this.activeItem = _item
      this.load()
    },
    load() {
      this.$api.getArticle(this.activeItem.path).then(d => {
        if (!d) {
          this.content = `<p class="no-data">${this.$t('common.nodata')}</p>`
          return
        }
        hljs(d).then(content => {
          this.content = content
        })
      })
    },
    onClick(item) {
      saveToLocal(ART_ITEM, item)
      this.activeItem = item
      this.load()
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
    margin-top: 8px;
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
