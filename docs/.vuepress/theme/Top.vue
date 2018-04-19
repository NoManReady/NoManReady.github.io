<template>
    <div :class="classes" :style="styles" @click="back">
        <span>Top</span>
    </div>
</template>
<script>
const prefixCls = 'vuepress'
export default {
  props: {
    height: {
      type: Number,
      default: 400
    },
    bottom: {
      type: Number,
      default: 2
    },
    right: {
      type: Number,
      default: 2
    },
    duration: {
      type: Number,
      default: 1000
    }
  },
  data() {
    return {
      backTop: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll, false)
    window.addEventListener('resize', this.handleScroll, false)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll, false)
    window.removeEventListener('resize', this.handleScroll, false)
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-show`]: this.backTop
        }
      ]
    },
    styles() {
      return {
        bottom: `${this.bottom}em`,
        right: `${this.right}em`
      }
    }
  },
  methods: {
    handleScroll() {
      this.backTop = window.pageYOffset >= this.height
    },
    // scrollTop animation
    scrollTop(el, from = 0, to, duration = 500) {
      if (!window.requestAnimationFrame) {
        window.requestAnimationFrame =
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function(callback) {
            return window.setTimeout(callback, 1000 / 60)
          }
      }
      const difference = Math.abs(from - to)
      const step = Math.ceil(difference / duration * 50)

      function scroll(start, end, step) {
        if (start === end) return

        let d = start + step > end ? end : start + step
        if (start > end) {
          d = start - step < end ? end : start - step
        }

        if (el === window) {
          window.scrollTo(d, d)
        } else {
          el.scrollTop = d
        }
        window.requestAnimationFrame(() => scroll(d, end, step))
      }
      scroll(from, to, step)
    },
    back() {
      let _sTop = document.documentElement.scrollTop || document.body.scrollTop
      this.scrollTop(window, _sTop, 0, this.duration)
      this.$emit('on-click')
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../style/variable'
.vuepress 
    position fixed
    background $accentColor
    color #fff
    padding .8em
    cursor pointer
    border-radius 5px
    width 3em
    height 3em
    justify-content center
    align-items center
    display none
    &:hover
        color darken(#fff,10%)
        box-shadow 0 0 4px $accentColor
    &-show
        display flex
@media (max-width: $MQNarrow)
    .vuepress
        border-radius 50%
        font-size 80%
        padding .5em
        width 2em
        height 2em

</style>
