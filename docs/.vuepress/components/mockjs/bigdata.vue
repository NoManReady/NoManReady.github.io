<template>
  <section class="mockjs-bigdata box">
    <div class="mb10">
      <strong>{{dataStatusText}}</strong>
      <span v-show="!btnDisabled&&dataStatus!==0">：{{`${this.beginTime}-${this.endTime}`}}={{this.endTime-this.beginTime}}</span>
    </div>
    <div class="mb10">
      <span class="mr10 w100">数据size:</span>
      <input class="mr10" type="number" v-model="dataSize" />
      <button class="btn" @click="_onGeneratorBegin" :disabled="btnDisabled">开始生成数据</button>
    </div>
    <div class="mb10">
      <span class="mr10">分片size:</span>
      <input class="mr10 w50" type="number" v-model="pageSize">
      <span class="mr10">filter:</span>
      <input class="mr10 w50" type="text" v-model="filterKey">
      <button class="btn" @click="_onDataFilterBegin" :disabled="btnDisabled||dataStatus<2">开始过滤</button>
    </div>
    <div class=" mt10">
      <h4>搜索到的数据：</h4>
      <ul class="mt20 box" v-show="list.length" style="max-height:20rem;overflow:auto;list-style:none;">
        <li v-for="(lis,index) in list" :key="lis.name">{{index+1}}:{{lis.name}}</li>
      </ul>
      <p class="tc" v-show="!list.length"><small>暂无匹配数据！</small></p>
    </div>
  </section>
</template>
<script>
import fetch from '../../utils/fetch'
const MAP = {
  0: '点击生成数据',
  1: '数据生成中...',
  2: '数据生成完毕',
  3: '开始过滤数据',
  4: '数据过滤完成'
}
export default {
  name: 'mockjs-bigdata',
  data() {
    return {
      dataSize: 10000,
      filterKey: '123',
      list: [],
      worker: null,
      dataStatus: 0,
      beginTime: 0,
      endTime: 0,
      pageSize: 1000
    }
  },
  mounted() {
    if (typeof Worker !== 'undefined') {
      this.worker = new Worker('/worker.js')
      this.worker.onmessage = this._onMessage
    } else {
      alert("Your browser don't support Worker.")
    }
  },
  computed: {
    dataStatusText() {
      return MAP[this.dataStatus]
    },
    btnDisabled() {
      return this.dataStatus === 1 || this.dataStatus === 3
    }
  },
  methods: {
    _onGeneratorBegin() {
      if (this.worker) {
        this.dataStatus = 1
        this.beginTime = Date.now()
        this.worker.postMessage({ type: 'data-begin', size: +this.dataSize })
      }
    },
    _onGeneratorEnd(e) {
      this.dataStatus = 2
      this.endTime = Date.now()
    },
    _onDataFilterBegin() {
      if (!this.pageSize) {
        return
      }
      this.list = []
      this.dataStatus = 3
      this.beginTime = Date.now()
      this.worker.postMessage({ type: 'data-filter', size: this.pageSize })
    },
    _onDataFilterEnd(e) {
      if (e.data.end) {
        this.dataStatus = 4
        this.endTime = Date.now()
      }
      let _data = e.data.data.filter(d => d.name.includes(this.filterKey))
      if (_data && _data.length) {
        this.list.push(..._data)
      }
    },
    _onMessage(e) {
      switch (e.data.type) {
        case 'data-begin':
          this._onGeneratorBegin(e)
          break
        case 'data-end':
          this._onGeneratorEnd(e)
          break
        case 'data-filter':
          this._onDataFilterEnd(e)
        default:
          break
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
</style>