<template>
<div class="app-header">
  <i class="el-icon-menu vm fs24 ml20 collapse-icon" :class="{'active':collapse}" @click="onCollapse"></i>
  <el-select v-model="lang" class="vm fr w100 mr20" size="mini" :popper-class="popperCla">
    <el-option label="中文" value="zh">
    </el-option>
    <el-option label="English" value="en">
    </el-option>
  </el-select>
</div>
</template>
<script>
export default {
  name: 'AppHeader',
  data() {
    return {
      lang: this.$store.getters.lang,
      popperCla: 'popperCla'
    }
  },
  computed: {
    collapse() {
      return this.$store.getters.collapse
    }
  },
  watch: {
    lang(v) {
      this.setLang(v)
    }
  },
  methods: {
    setLang(lang) {
      this.$bus.$emit('lang', lang)
    },
    onCollapse() {
      this.$store.dispatch('setCollapse', !this.collapse)
    }
  }
}
</script>
<style lang="scss">
.app-header {
  .collapse-icon {
    cursor: pointer;
    &:hover {
      color: #eee;
    }
    &.active {
      color: #9ef5c9;
    }
  }
  .popperCla {
    width: 100px !important;
  }
}
</style>