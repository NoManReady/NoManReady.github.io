<template>
<div class="top-pane">
    <div class="top-pane--bar">
        <SearchBox class="vm" v-model="language" :data-source="dataSource" input-class="aquare" placeholder="语言名称"/>
    </div>
    <p class="top-pane--result">本页面展示搜索语言<span class="c-theme">{{loading?'查找中...':language}}</span>的前30名开源库<span v-show="!loading">（搜索到<b class="c-theme">{{total}}</b>个结果）</span></p>
    <div class="top-pane-list">
        <TopPaneItem v-for="item in list" :key="item.id" :item="item"/>
    </div>
</div>
</template>
<script>
import fetch from '../utils/fetch'
import SearchBox from '../theme/SearchBox'
import TopPaneItem from '../common/TopPaneItem'
export default {
  name: 'component_name',
  data() {
    return {
      language: 'vue',
      sort: 'stars',
      list: [],
      total: 0,
      loading: false,
      dataSource: [
        {
          value: 'vue',
          title: 'vue'
        },
        {
          value: 'javascript',
          title: 'javascript'
        },
        {
          value: 'java',
          title: 'java'
        },
        {
          value: 'node',
          title: 'node'
        }
      ]
    }
  },
  created() {
    this._loadList()
  },
  components: {
    SearchBox,
    TopPaneItem
  },
  watch:{
      language(){
          this._onSearch()
      }
  },
  methods: {
    _loadList() {
      return fetch('/search/repositories', {
        q: `language:${this.language}`,
        sort: this.sort
      }).then(d => {
        this.list = Object.freeze(d.items)
        this.total = d.total_count
      })
    },
    _onSearch() {
      this.loading = true
      this._loadList().then(
        () => {
          this.loading = false
        },
        () => {
          this.loading = false
        }
      )
    }
  }
}
</script>
<style lang="stylus">
@import '../style/toppane.styl';
</style>