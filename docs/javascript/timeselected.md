# 拖拽选区组件

开发中遇到想快速选择某二维坐标中的数据，比如本文的例子：每天的时间点选择。要求如下：

* 可以拖拽圈选某个范围的数据，选中的区域高亮显示
* 当多选区域范围内全部为选中状态时，标识为反选，其余表示全选该区域
* 支持初始化选中数据，是否可选择，行列数据自定义的等
实现效果如图：

![timeSelected](/img/time.png)

此栗子由vue组件编写。

## 定义结构
1、首先定义一个选区组件TimeSelected.vue,组件结构分为上中下，分别为header、wrap、footer。wrap为选区组件主要区域，其又分为左右结构，分别为Y轴和表格区域，X轴由表格header定义，选择内容块由th定义，所以组件的主要结构如下：

```
<template>
<!-- 定义组件 -->
  <div class="time-selection">
    <!-- 组件头 -->
    <div class="time-selection--header" v-if="showHeader">
      <slot name="timeSelection_title">
        <h2>{{title}}</h2>
      </slot>
    </div>
    <!-- 组件主体 -->
    <div ref="timeSelectionWrap" class="time-selection-wrap">
      <!-- Y轴 -->
      <div class="time-selection--yaxis" ref="timeSelectionYaxis">
        <div v-for="(row,index) in rows" :key="row.value" :class="['yaxis-picker',`time-selection--yaxis_item_${index}`]" :style="yaxisItemStyl">{{row.label}}</div>
      </div>
      <!-- Table块 -->
      <div class="time-selection--main">
        <table class="time-selection-picker">
          <!-- X轴 -->
          <thead ref="timeSelectionPickerHeader">
            <tr v-if="columns.length">
              <th v-for="(col,index) in columns" :key="col.value" :class="['header-picker',`time-selection-picker--header_item_${index}`]">
                {{col.label}}
              </th>
            </tr>
          </thead>
          <!-- 选区区域 -->
          <tbody ref="timeSelectionArea">
            <tr v-for="(row,i) in rows" :key="`${row.value}-${rows[i+1].value}`" v-if="i<rows.length-1">
              <td class="time-selection-picker--bordered" :class="{begin:enable}" v-for="(col,j) in columns" :key="col.value" :data-col="j" :data-row="i" @click="_onTimePickerClick({row:i,col:j,value:[`${row.value}-${rows[i+1].value}`,col.value]})">
                <div :class="['time-picker',`time-selection-picker--body_item_${j}`,{'is-active':_hasActive(i,j)}]" :style="timeItemStyl"></div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 框选层 -->
      <div class="time-selection--range" ref="timeSelectionRange"></div>
    </div>
    <!-- 组件尾 -->
    <div class="time-selection--footer" v-if="showFooter">
      <slot name="timeSelection_legend">
        <h2>{{legend}}</h2>
      </slot>
    </div>
  </div>
</template>
```
## 逻辑实现
2、逻辑实现，定义组件state，选区实现，初始化数据输入及选择数据输出
### 输入
2.1、初始化数据输入

```
props: {
    //定义Y轴数据（label为展示，value为实际值）
    rows: {
      type: Array,
      default: () =>
        Array.from({ length: 25 }).map((_, i) => ({
          value: `${i}:00`,
          label: `${i.toString().padStart(2, '0')}:00`
        }))
    },
    //定义X轴数据（label为展示，value为实际值）
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
    //初始化选中
    selections: {
      type: [Array, Object],
      default: () => []
    },
    //组件头标题
    title: {
      type: String,
      default: 'PickerComponentTitle'
    },
    //组件尾标题
    legend: {
      type: String,
      default: 'PickerComponentLegend'
    },
    //单个选项高度
    itemHeight: {
      type: Number,
      default: 20
    },
    //是否显示组件头
    showHeader: {
      type: Boolean,
      default: true
    },
    //是否显示组件尾
    showFooter: {
      type: Boolean,
      default: true
    },
    //是否可编辑
    enable: {
      type: Boolean,
      default: true
    },
    //选中数据排列
    sortDirective: {
      type: Number,
      default: 1
    }
  }
```

### 内置状态
2.2、state定义（组件内部记录状态）

```
data() {
    return {
      //选择开始点
      begin: {
        x: 0,
        y: 0
      },
      //选择结束点
      end: {
        x: 0,
        y: 0
      },
      //是否开始选择标识
      isRangeActive: false,
      //选中数据集合
      datas: [],
      //是否移动端
      isMobile: browser.versions.mobile
    }
  }
```

### 事件注册
2.3、定义事件（mounted阶段定义，beforeDestroy阶段取消），pc端mousedown,mousemove,mouseup;mobile端touchstart,toucemove,touchend

```
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
  }
```

### 事件实现
2.4、事件定义及实现

```
//判断当前节点是否在可操作选区内
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
    }
// 鼠标按下事件，（记录开始点--此时开始点与结束点一致，并开始绘画选区框图，_setRangePosition）
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
    // 鼠标移动事件，（当处于选区状态时，不断记录更新结束点及绘制框图）
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
    // 鼠标放起事件，（记录框选数据_setSelectedItem，并关闭框选区域，重置开始及结束点）
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
```

### 选中单元格及记录数据
2.5、设置选中单元格

```
// 设置选中单元格数据（判断每个单元格所在区域是否在选区区域内，及单元格在选框的上下左右方向，然后判断选框区域内的单元格是否全部选中--是否具有is-active类，是：清除datas中的数据；否：新增的数据加入datas；然后由vue的数据驱动更新dom更新）
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
          _selections.push(`${td.dataset.row}-${td.dataset.col}`)
        })
      }
      this.datas = [...new Set(_selections)].sort()
    }
```

### 设置选框
2.6、设置框选框位置

```
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
    }
```

## 样式美化
3、样式美化

```
<style lang="scss" scoped>
@import '../style/utils/_mixins.scss';
@import '../style/utils/_variable.scss';
.time-selection {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  @extend %clearfix;
  &--header,
  &--footer {
    text-align: center;
    h2 {
      color: $--color-text-regular;
      font-size: 150%;
      margin: 0.5em 0;
    }
  }
  &--header {
  }
  &--footer {
  }
  &--range {
    position: absolute;
    border: 2px dashed #b2b2b2;
    z-index: 10;
    display: none;
  }
  &-wrap {
    @extend %clearfix;
    position: relative;
    flex: 1 0 0;
    .time-picker,
    .yaxis-picker {
      width: 100%;
      height: 100%;
      text-align: center;
      color: $--color-text-regular;
    }
    .header-picker {
      height: 32px;
    }
    .time-picker {
      border: 1px solid #fff;
      &.is-active {
        background-color: $--color-success;
      }
    }
  }
  &--yaxis {
    width: 50px;
    float: left;
    font-size: 12px;
    margin-top: 21px;
  }
  &--main {
    margin-left: 50px;
  }
  &-picker {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    &--bordered {
      border: 1px solid $--border-color-base;
    }
  }
}
</style>
```
## DEMO
<mockjs-timeselected/>
