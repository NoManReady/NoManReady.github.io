<template>
  <div class="time-selection">
    <div class="time-selection--header" v-if="showHeader">
    </div>
    <div ref="timeSelectionWrap" class="time-selection-wrap">
      <div class="time-selection--yaxis" ref="timeSelectionYaxis">
        <div v-for="(row,index) in rows" :key="row.value" :class="['yaxis-picker',`time-selection--yaxis_item_${index}`]" :style="yaxisItemStyl">{{row.label}}</div>
      </div>
      <div class="time-selection--main">
        <table class="time-selection-picker">
          <thead ref="timeSelectionPickerHeader">
            <tr v-if="columns.length">
              <th v-for="(col,index) in columns" :key="col.value" :class="['header-picker',`time-selection-picker--header_item_${index}`]">
                {{col.label}}
              </th>
            </tr>
          </thead>
          <tbody ref="timeSelectionArea">
            <tr v-for="(row,i) in rows" :key="`${row.value}-${rows[i+1].value}`" v-if="i<rows.length-1">
              <td class="time-selection-picker--bordered" :class="{begin:enable}" v-for="(col,j) in columns" :key="col.value" :data-col="j" :data-row="i" @click="_onTimePickerClick({row:i,col:j,value:[`${row.value}-${rows[i+1].value}`,col.value]})">
                <div :class="['time-picker',`time-selection-picker--body_item_${j}`,{'is-active':_hasActive(i,j)}]" :style="timeItemStyl"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="time-selection--range" ref="timeSelectionRange"></div>
    </div>
    <div class="time-selection--footer" v-if="showFooter">
      <button class="mr10 btn active" style="padding:10px;margin-left:10px;" @click="_clearData">Clear Data</button>
      <button class="mr10 btn active" style="padding:10px;margin-left:10px;" @click="_testData">Test Data</button>
      <button class="mr10 btn active" style="padding:10px;margin-left:10px;" @click="_getData">Get Data</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mockjs-timeselected',
  props: {
    rows: {
      type: Array,
      default: () =>
        Array.from({ length: 25 }).map((_, i) => ({
          value: `${i}:00`,
          label: `${i.toString().padStart(2, '0')}:00`
        }))
    },
    columns: {
      type: Array,
      default: () => [
        { value: 'Mon', label: '星期一' },
        { value: 'Tue', label: '星期二' },
        { value: 'Wed', label: '星期三' },
        { value: 'Thu', label: '星期四' },
        { value: 'Fri', label: '星期五' },
        { value: 'Sat', label: '星期六' },
        { value: 'Sun', label: '星期日' }
      ]
    },
    selections: {
      type: [Array, Object],
      default: () => []
    },
    title: {
      type: String,
      default: 'PickerComponentTitle'
    },
    legend: {
      type: String,
      default: 'PickerComponentLegend'
    },
    itemHeight: {
      type: Number,
      default: 20
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    enable: {
      type: Boolean,
      default: true
    },
    sortDirective: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      begin: {
        x: 0,
        y: 0
      },
      end: {
        x: 0,
        y: 0
      },
      isRangeActive: false,
      datas: [],
      isMobile: false
    }
  },
  computed: {
    timeItemStyl() {
      return {
        height: `${this.itemHeight - 1}px`,
        'line-height': `${this.itemHeight - 1}px`
      }
    },
    yaxisItemStyl() {
      return {
        height: `${this.itemHeight}px`,
        'line-height': `${this.itemHeight}px`
      }
    }
  },
  watch: {
    selections: {
      handler() {
        this._setIndexSelected()
      },
      deep: true,
      immediate: true
    }
  },
  created() {
    if (!this.$isServer)
      this.isMobile = navigator.userAgent.match(/AppleWebKit.*Mobile.*/)
  },
  mounted() {
    if (this.enable) {
      if (this.isMobile) {
        document.addEventListener('touchstart', this._onMousedown, false)
        document.addEventListener('touchmove', this._onMousemove, false)
        document.addEventListener('touchend', this._onMouseup, false)
      } else {
        document.addEventListener('mousedown', this._onMousedown, false)
        document.addEventListener('mousemove', this._onMousemove, false)
        document.addEventListener('mouseup', this._onMouseup, false)
      }
    }
  },
  beforeDestroy() {
    if (this.enable) {
      if (this.isMobile) {
        document.removeEventListener('touchstart', this._onMousedown)
        document.removeEventListener('touchmove', this._onMousemove)
        document.removeEventListener('touchend', this._onMouseup)
      } else {
        document.removeEventListener('mousedown', this._onMousedown)
        document.removeEventListener('mousemove', this._onMousemove)
        document.removeEventListener('mouseup', this._onMouseup)
      }
    }
  },
  methods: {
    // 判断是否选中状态
    _hasActive(row, col) {
      return this.datas.includes(`${row}-${col}`)
    },
    // 判断元素的包含关系
    _contains(refNode, childNode) {
      if (typeof refNode.contains == 'function') {
        return refNode.contains(childNode)
      } else if (typeof refNode.compareDocumentPosition == 'function') {
        return !!(refNode.compareDocumentPosition(childNode) & 16)
      } else {
        let _parentNode = childNode.parentNode
        do {
          if (_parentNode === refNode) {
            return true
          } else {
            _parentNode = _parentNode.parentNode
          }
        } while (_parentNode !== null)
        return false
      }
    },
    // 鼠标按下事件
    _onMousedown(e) {
      if (!this.isMobile) {
        e.preventDefault()
      }
      if (!this._hasInWrap(e)) {
        return
      }
      this.isRangeActive = true
      let _timeSelectionRange = this.$refs.timeSelectionRange
      _timeSelectionRange.style.display = 'block'
      this.begin.x = e.clientX || e.touches[0].clientX
      this.begin.y = e.clientY || e.touches[0].clientY
      this.end.x = e.clientX || e.touches[0].clientX
      this.end.y = e.clientY || e.touches[0].clientY
      this._setRangePosition(e)
    },
    // 鼠标移动事件
    _onMousemove(e) {
      if (!this.isMobile) {
        e.preventDefault()
      }
      if (!this.isRangeActive) {
        return
      }
      if (!this._hasInWrap(e)) {
        this._onMouseup(e)
        return
      }
      this.end.x = e.clientX || e.touches[0].clientX
      this.end.y = e.clientY || e.touches[0].clientY
      this._setRangePosition(e)
    },
    // 鼠标放起事件
    _onMouseup(e) {
      if (!this.isMobile) {
        e.preventDefault()
      }
      // 结束时在范围内
      if (this._hasInWrap(e)) {
        this._setSelectedItem(e)
      }
      this.isRangeActive = false
      let _timeSelectionRange = this.$refs.timeSelectionRange
      _timeSelectionRange.style.display = 'none'
      this.begin = { x: 0, y: 0 }
      this.end = { x: 0, y: 0 }
    },
    // 设置选中单元格数据
    _setSelectedItem(e) {
      let _timeSelectionArea = this.$refs.timeSelectionArea
      let _tds = _timeSelectionArea.querySelectorAll('td')
      let _filterTds = Array.from(_tds).filter(td => {
        let _range = td.getBoundingClientRect()
        let _x1 = _range.left
        let _x2 = _x1 + _range.width
        let _y1 = _range.top
        let _y2 = _y1 + _range.height
        let _bx1 = this.begin.x
        let _bx2 = this.end.x
        let _by1 = this.begin.y
        let _by2 = this.end.y
        if (_bx1 > _bx2) {
          ;[_bx1, _bx2] = [_bx2, _bx1]
        }
        if (_by1 > _by2) {
          ;[_by1, _by2] = [_by2, _by1]
        }
        if (_x2 < _bx1 || _x1 > _bx2 || _y2 < _by1 || _y1 > _by2) {
          return false
        }
        return true
      })
      let _isAllActive = _filterTds.every(td => {
        let _classList = td
          .querySelector('div')
          .getAttribute('class')
          .split(' ')
        return _classList.includes('is-active')
      })
      let _selections = [...this.datas]
      if (_isAllActive) {
        _filterTds.forEach(td => {
          let _value = `${td.dataset.row}-${td.dataset.col}`
          let _index = _selections.findIndex(s => s === _value)
          if (_index >= 0) {
            _selections.splice(_index, 1)
          }
        })
      } else {
        _filterTds.forEach(td => {
          let _d = `${td.dataset.row}-${td.dataset.col}`
          if (!_selections.includes(_d))
            _selections.push(`${td.dataset.row}-${td.dataset.col}`)
        })
      }
      this.datas = _selections.sort()
    },
    // 判断鼠标是否位于判断范围内
    _hasInWrap(e) {
      let _timeSelectionWrap = this.$refs.timeSelectionWrap
      let _timeSelectionYaxis = this.$refs.timeSelectionYaxis
      let _timeSelectionPickerHeader = this.$refs.timeSelectionPickerHeader
      let _target = e.target
      return (
        this._contains(_timeSelectionWrap, _target) &&
        !this._contains(_timeSelectionYaxis, _target) &&
        !this._contains(_timeSelectionPickerHeader, _target)
      )
    },
    // 设置选框的position
    _setRangePosition(e) {
      let _timeSelectionRange = this.$refs.timeSelectionRange
      let _timeSelectionArea = this.$refs.timeSelectionArea
      let _opt = _timeSelectionArea.getBoundingClientRect()
      let _x = e.clientX || e.touches[0].clientX
      let _y = e.clientY || e.touches[0].clientY
      let _left = 0
      let _top = 0
      if (_x < this.begin.x) {
        _left = _x - _opt.left
      } else {
        _left = this.begin.x - _opt.left
      }
      if (_y < this.begin.y) {
        _top = _y - _opt.top
      } else {
        _top = this.begin.y - _opt.top
      }
      // 50为yaxis边距，32为header边距
      _timeSelectionRange.style.left = `${_left + 50}px`
      _timeSelectionRange.style.top = `${_top + 32}px`
      _timeSelectionRange.style.width = `${Math.abs(_x - this.begin.x)}px`
      _timeSelectionRange.style.height = `${Math.abs(_y - this.begin.y)}px`
    },
    // picker格子点击事件
    _onTimePickerClick({ row, col, value }) {
      this.$emit('time-picker', { row, col, value })
    },
    // 设置选中单元格数据-索引值（根据范围数据：key为列值，value为行范围值数组）
    _setIndexSelected(initial) {
      let _datas = []
      let _dd = initial || this.selections
      if (Array.isArray(_dd)) {
        _datas = [..._dd]
      } else {
        for (let _k in _dd) {
          let _kIndex = this.columns.findIndex(col => col.value === _k)
          if (_kIndex === undefined) {
            continue
          }
          let _value = _dd[_k]
          for (let _t = 0; _t < _value.length; _t++) {
            let _rang = _value[_t]
            let _s = _rang[0]
            let _e = _rang[1]
            let _sIndex =
              this.rows.findIndex(
                row => row.value === _s || row.value === `${_s}:00`
              ) || 0
            let _eIndex =
              this.rows.findIndex(
                row => row.value === _e || row.value === `${_e}:00`
              ) || 0
            while (_sIndex < _eIndex) {
              _datas.push(`${_sIndex}-${_kIndex}`)
              _sIndex++
            }
          }
        }
      }
      this.datas = _datas
    },
    // 获取选中单元格(索引值)
    getIndexSelected() {
      return this.datas
    },
    // 获取选中单元格(真实值)
    getSelected() {
      let _datasMap = {}
      this.datas.forEach(d => {
        let [row, col] = d.split('-')
        let _key = this.columns[+col].value
        if (!_datasMap[_key]) {
          _datasMap[_key] = []
        }
        _datasMap[_key].push([this.rows[+row].value, this.rows[+row + 1].value])
      })
      return _datasMap
    },
    // 获取合并时间范围
    getMergeSelected() {
      let _datasMap = this.getSelected()
      for (let _key in _datasMap) {
        let _k_datas = _datasMap[_key]
        _datasMap[_key] = []
        let _uni_datas = Array.prototype.concat
          .apply([], _k_datas)
          .sort((a, b) => {
            // 获取对应索引值，按索引值排序
            let _sIndex = this.rows.findIndex(row => row.value === a) || 0
            let _eIndex = this.rows.findIndex(row => row.value === b) || 0
            return _sIndex - _eIndex
          })
        let _flatArr = []
        _uni_datas.forEach((ite, i, arr) => {
          if (arr.indexOf(ite) === arr.lastIndexOf(ite)) {
            _flatArr.push(ite)
          }
        })
        for (let _i = 0, _len = _flatArr.length; _i < _len; _i++) {
          if ((_i + 1) % 2 === 0) {
            _datasMap[_key].push([_flatArr[_i - 1], _flatArr[_i]])
          }
        }
      }
      return _datasMap
    },
    _clearData() {
      this.datas = []
    },
    _testData() {
      this._setIndexSelected({ Mon: [['9:00', '15:00']] })
    },
    _getData() {
      console.log(this.getMergeSelected())
    }
  }
}
</script>
<style lang="stylus">
@import '../../style/mixins'
@import '../../style/variable'
.time-selection
  & *
    padding 0
    margin 0
    box-sizing border-box
  height 100%
  width 100%
  position relative
  display flex
  flex-direction column
  clearfix()
  &--header, &--footer
    text-align center
    h2
      color $textColor
      font-size 150%
      margin 0.5em 0
  &--range
    position absolute
    border 2px dashed #b2b2b2
    z-index 10
    display none
  &-wrap
    clearfix()
    position relative
    flex 1 0 0
    .time-picker, .yaxis-picker
      width 100%
      height 100%
      text-align center
      color $textColor
    .header-picker
      height 32px
    .time-picker
      border 1px solid #fff
      &.is-active
        background-color $accentColor
  &--yaxis
    width 50px
    float left
    font-size 12px
    margin-top 21px
  &--main
    margin-left 50px
  &-picker
    width 100%
    border-collapse collapse
    border-spacing 0
    &--bordered
      border 1px solid $borderColor
</style>