<template>
  <section class="mockjs-bigdata box">
    <div class="mb10">
      <strong>{{dataStatusText}}</strong>
      <span v-show="!btnDisabled&&dataStatus!==0&&dataStatus!==5">：{{`${this.beginTime}-${this.endTime}`}}={{this.endTime-this.beginTime}}</span>
    </div>
    <div class="mb10">
      <span class="mr10 w100">数据size:</span>
      <label class="mr10">
        <input type="checkbox" v-model="fetchFromOrigin">
        <span>是否远程获取数据</span>
      </label>
      <input class="mr10" type="number" v-model="dataSize" :disabled="btnDisabled||fetchFromOrigin" />
      <button class="btn" @click="_onGeneratorBegin" :disabled="btnDisabled">开始生成数据</button>
    </div>
    <div class="mb10">
      <span class="mr10">分片size:</span>
      <input class="mr10 w50" type="number" v-model="pageSize" :disabled="btnDisabled||dataStatus<2">
      <span class="mr10">filter:</span>
      <input class="mr10 w50" type="text" v-model="filterKey" :disabled="btnDisabled||dataStatus<2">
      <button class="btn mr10" @click="_onDataFilterBegin" :disabled="btnDisabled||dataStatus<2">开始过滤</button>
      <button class="btn" @click="_onAddFilterData" :disabled="temp.length&&dataStatus!==4">加入数据({{temp.length}})</button>
    </div>
    <div class=" mt10">
      <h4>搜索到的数据({{list.length}})：</h4>
      <ul class="mt20 box" id="filterRef" ref="filterRef" style="height:20rem;overflow:auto;list-style:none;">
        <li v-show="list.length>0" v-for="(lis,index) in list" :key="lis.name+lis.id">{{index+1}}:{{lis.name}}</li>
        <li class="tc" v-show="list.length===0">
          <small>暂无匹配数据！</small>
        </li>
      </ul>
    </div>
  </section>
</template>
<script>
const MAP = {
  0: '点击生成数据',
  1: '数据生成中...',
  2: '数据生成完毕',
  3: '开始过滤数据',
  4: '数据过滤完成',
  5: '数据植入完成'
}
let _scrollTimer = null
export default {
  name: 'mockjs-bigdata',
  data() {
    return {
      dataSize: 10000,
      filterKey: '123',
      list: [],
      temp: [],
      worker: null,
      dataStatus: 0,
      beginTime: 0,
      endTime: 0,
      pageSize: 1000,
      fetchFromOrigin: true
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
  beforeDestroy() {
    this.worker.terminate()
  },
  computed: {
    dataStatusText() {
      return MAP[this.dataStatus]
    },
    btnDisabled() {
      return this.dataStatus === 1 || this.dataStatus === 3
    }
  },
  watch: {
    list() {
      clearTimeout(_scrollTimer)
      _scrollTimer = setTimeout(() => {
        let _target = document.querySelector('#filterRef')
        _target.scrollTop = _target.scrollHeight
        _scrollTimer = null
      }, 100)
    }
  },
  methods: {
    _onAddFilterData() {
      this.list = Object.freeze([...this.list, ...this.temp])
      this.temp = []
      this.dataStatus = 5
    },
    _onGeneratorBegin() {
      if (this.worker) {
        this.dataStatus = 1
        this.beginTime = Date.now()
        this.worker.postMessage({
          type: 'data-begin',
          size: +this.dataSize,
          from: this.fetchFromOrigin ? 'origin' : 'local'
        })
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
      this.temp = []
      this.dataStatus = 3
      this.beginTime = Date.now()
      this.worker.postMessage({
        type: 'data-filter',
        size: this.pageSize,
        key: this.filterKey
      })
    },
    _onDataFilterEnd(e) {
      if (e.data.end) {
        this.dataStatus = 4
        this.endTime = Date.now()
      }
      let _data = e.data.data
      if (this.list.length > 1000) {
        this.temp = Object.freeze([...this.temp, ..._data])
        return
      }
      // let _data = e.data.data.filter(d => d.name.includes(this.filterKey))
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