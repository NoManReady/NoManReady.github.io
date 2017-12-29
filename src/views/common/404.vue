<template>
  <div class="error 404">
    <div class="error-inner">
      <i class="el-icon-info"></i>
      <p class="error-msg fs20">404,功能开发中</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'err404',
  title: '404页面',
  data() {
    return {}
  }
}
</script>
<style lang="scss" scoped>
.error {
  color: #666;
  text-align: center;
  .el-icon-info {
    font-size: 56px;
  }
  .error-msg {
    margin-top: 15px;
  }
  .error-inner {
    display: inline-block;
    margin: 10% auto 0;
  }
}
</style>