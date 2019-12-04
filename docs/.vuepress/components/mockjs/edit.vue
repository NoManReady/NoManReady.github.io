<template>
  <div class="mockjs-edit box mt10">
    <div class="flex-box-item">
      <textarea class="mockjs-edit--edit" name="mockjs" cols="30" rows="10" v-model="value" placeholder="Please enter mockjs template here."></textarea>
    </div>
    <div class="tc mt10" style="width:100%;">
      <button class="mockjs-edit--tool btn mr10" @click="_resetData" :disabled="hasReset">重置</button>
      <button class="mockjs-edit--tool btn" @click="_genMockData">生成</button>
    </div>
    <div class="flex-box-item">
      <pre class="mockjs-edit--view">{{result}}</pre>
    </div>
  </div>
</template>
<script>
import Mock from 'mockjs'
const MockTemplate = {
  name: '@cname',
  f: '@first',
  l: '@last',
  full: '@f@l',
  'list|1-10': ['@color']
}
export default {
  name: 'mockjs-edit',
  data() {
    return {
      value: JSON.stringify(MockTemplate, null, 4),
      result: ''
    }
  },
  computed:{
    hasReset(){
      return this.value.replace(/[\r\n\s]/g,'')===JSON.stringify(MockTemplate).replace(/[\r\n\s]/g,'')
    }
  },
  methods: {
    _resetData(){
      this.value=JSON.stringify(MockTemplate, null, 4)
    },
    _genMockData() {
      try {
        let _template = JSON.parse(this.value||'{}')
        let _result = Mock.mock(_template)
        this.result = JSON.stringify(_result, null, 4)
      } catch (error) {
      }
    }
  }
}
</script>
<style lang="stylus">
@import '../../style/variable'
.mockjs-edit
  box-sizing border-box
  flex-wrap wrap
  &--edit, &--view
    border 1px solid $borderColor
    border-radius 6px
    width 90%
    height 10rem
    padding 1.25rem 1.5rem
    margin 0
    color $textColor
  &--view
    color lighten($textColor, 40%)
    height auto
    min-height 10rem
  &--edit:focus
    outline none
</style>