<template>
<div class="welcome">
  <div class="app-header tc fc-6 fs24 welcome-tit">欢迎访问</div>
  <div class="app-main mt20 mb20 sc-y plr20" style="bottom:60px;">
    <div class="welcome-box">
      <transition name="fade" mode="out-in">
        <div>
          <h2 class="logo-txt">NoManReady</h2>
          <p class="tr fs24 f-green">-- Learn a little every day!</p>
        </div>
      </transition>
    </div>
  </div>
  <div class="app-footer tc welcome-footer">
    <transition name="fade" mode="out-in">
      <div class="welcome-box mb20">
        <el-button type="primary" @click.native="goEntry">进入访问</el-button>
      </div>
    </transition>
  </div>
</div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'Welcome',
  data() {
    return {
      step: 0,
      labelPos: 'top',
      stepData: {}
    }
  },
  computed: {
    data() {
      return this.stepData[this.step]
    }
  },
  created() {},
  mounted() {
    window.addEventListener('resize', this._onResize, false)
    this._onResize()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this._onResize)
  },
  methods: {
    ...mapActions(['setInit']),
    // 浏览器收缩
    _onResize() {
      let _innerWidth = document.documentElement.offsetWidth
      if (_innerWidth < 768) {
        this.labelPos = 'top'
      } else {
        this.labelPos = 'right'
      }
    },
    goEntry() {
      this.setInit()
      this.$router.push({ name: 'admin' })
    }
  }
}
</script>
<style lang="scss">
@import '../../style/utils/_mixins.scss';
.welcome {
  .empty-col {
    height: 1px;
    opacity: 0;
  }
  @extend %position-absolute;
  .welcome-tit {
    @include text-middle(60px);
    padding: 0;
    background: #efefef;
    box-shadow: 0 1px 5px 0 #999;
  }
  .welcome-box {
    width: 50%;
    margin: 0 auto;
    .logo-txt {
      font-size: 40px;
      text-align: center;
      color: #666;
      margin-top: 30%;
    }
  }
  .welcome-footer {
    .el-button {
      width: 80%;
    }
    height: auto;
    background-color: transparent;
    box-shadow: none;
  }
  @media screen and (max-width: 768px) {
    .welcome-box {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>