<template>
  <div class="box">
    <div>
      <div class="progress">
        <div class="progress-outer">
          <div :style="styl" class="progress-inner"></div>
        </div>
      </div>
    </div>
    <div>
      <div @mouseenter="_show(true)" @mouseleave="_show(false)" class="card">
        <div :class="{animated:show}" class="wow">NoManReady</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'gradient',
  data() {
    return {
      pWidth: 40,
      show: false
    }
  },
  computed: {
    styl() {
      return { width: `${this.pWidth}%` }
    }
  },
  created() {
    if (!this.$isServer) {
      this._doAnimate()
    }
  },
  methods: {
    _doAnimate() {
      window.requestAnimationFrame(() => {
        this.pWidth = (this.pWidth + 1) % 100
        this.$nextTick(() => {
          this._doAnimate()
        })
      })
    },
    _show(flag) {
      this.show = flag
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../style/variable';

.box {
  .wow {
    opacity: 0;
    transition: all 0.5s 0.5s ease-in-out;
  }

  .animated {
    opacity: 1;
  }

  background-color: rgb(255, 255, 255);
  background-image: url('https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2');
  display: flex;

  &>div {
    flex: 1;
    text-align: center;
    min-height: 150px;
    color: white;

    .progress {
      height: 12px;
      width: 80%;
      overflow: hidden;
      border-radius: 16px;
      position: relative;

      &-outer {
        background-color: rgba(#713f0e, 0.5);
        height: inherit;
      }

      &-inner {
        background-size: 12px 12px;
        height: inherit;
        border-radius: 16px;
        width: 0;
        // transition: 0.3s width ease-in-out;
        animation: panoramic 20s linear infinite;
        // color-stop
        background-image: repeating-linear-gradient(
          -45deg,
          pink 0,
          pink 25%,
          red 0%,
          red 50%,
          pink 0%,
          pink 75%,
          red 0%,
          red 100%
        );
      }

      @keyframes panoramic {
        to {
          background-position: 100% 0;
        }
      }
    }

    .card {
      width: 200px;
      height: 100px;
      background-image: radial-gradient(circle at 100px -8px, transparent 20px, #b4a078 21px);
    }
  }
}
</style>