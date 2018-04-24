<template>
  <div class="search-box">
    <input :class="inputClass" @input="query = $event.target.value" aria-label="Search" :value="query" autocomplete="off" spellcheck="false" :placeholder="placeholder" @focus="focused = true" @blur="focused = false" @keyup.enter="go(focusIndex)" @keyup.up="onUp" @keyup.down="onDown">
    <ul class="suggestions" ref="ssss" v-if="showSuggestions" :class="{ 'align-right': alignRight }" @mouseleave="unfocus">
      <li class="suggestion" v-for="(s, i) in suggestions" :class="{ focused: i === focusIndex }" @mousedown="go(i)" @mouseenter="focus(i)">
        <a :href="s.path" @click.prevent>
          <span class="page-title">{{ s.title || s.path }}</span>
          <span v-if="s.header" class="header">&gt; {{ s.header.title }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['dataSource', 'value', 'inputClass', 'placeholder'],
  data() {
    return {
      query: '',
      focused: false,
      focusIndex: 0
    }
  },
  watch: {
    value: {
      handler(v) {
        this.query = v
      },
      immediate: true
    },
    focusIndex(v, o) {
      let _items = document.querySelectorAll('.suggestion')
      this.scrollTop(this.$refs.ssss, _items[o].offsetTop, _items[v].offsetTop)
    }
  },
  computed: {
    showSuggestions() {
      return this.focused && this.suggestions && this.suggestions.length
    },
    suggestions() {
      const query = this.query.trim().toLowerCase()
      if (!query) {
        return
      }
      if (this.dataSource && this.dataSource.length) {
        return this.dataSource.filter(
          d => d.value.indexOf(query) > -1 || d.title.indexOf(query) > -1
        )
      }
      const max = 5
      const { pages } = this.$site
      const matches = item =>
        item.title && item.title.toLowerCase().indexOf(query) > -1
      const res = []
      for (let i = 0; i < pages.length; i++) {
        if (res.length >= max) break
        const p = pages[i]
        if (matches(p)) {
          res.push(p)
        } else if (p.headers) {
          for (let j = 0; j < p.headers.length; j++) {
            if (res.length >= max) break
            const h = p.headers[j]
            if (matches(h)) {
              res.push(
                Object.assign({}, p, {
                  path: p.path + '#' + h.slug,
                  header: h
                })
              )
            }
          }
        }
      }
      return res
    },
    // make suggestions align right when there are not enough items
    alignRight() {
      const navCount = (this.$site.themeConfig.nav || []).length
      const repo = this.$site.repo ? 1 : 0
      return navCount + repo <= 2
    }
  },
  methods: {
    scrollTop(el, from = 0, to, duration = 500) {
      console.log(from)
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
    onUp() {
      if (this.showSuggestions) {
        if (this.focusIndex > 0) {
          this.focusIndex--
        } else {
          this.focusIndex = this.suggestions.length - 1
        }
      }
    },
    onDown() {
      if (this.showSuggestions) {
        if (this.focusIndex < this.suggestions.length - 1) {
          this.focusIndex++
        } else {
          this.focusIndex = 0
        }
      }
    },
    go(i) {
      if (this.suggestions[i]) {
        if (this.dataSource && this.dataSource.length) {
          this.$emit('input', this.suggestions[i].value)
        } else {
          if (this.suggestions[i].path) {
            this.$router.push(this.suggestions[i].path)
            this.query = ''
            this.focusIndex = 0
          }
        }
      }
    },
    focus(i) {
      this.focusIndex = i
    },
    unfocus() {
      this.focusIndex = -1
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'
.search-box
  display inline-block
  position relative
  margin-right 0.5rem
  input
    cursor pointer
    width 10rem
    color lighten($textColor, 25%)
    display inline-block
    border 1px solid darken($borderColor, 10%)
    border-radius 2rem
    font-size 0.9rem
    line-height 2rem
    padding 0 0.5rem 0 2rem
    outline none
    transition all 0.2s ease
    background #fff url('./search.svg') 0.6rem 0.5rem no-repeat
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
  .suggestions
    max-height 10em
    background #fff
    width 12rem
    position absolute
    overflow auto
    top 2rem
    border 1px solid darken($borderColor, 10%)
    border-radius 6px
    padding 0.2em 0.2rem
    list-style-type none
    &.align-right
      right 0
  .suggestion
    line-height 1.2
    padding 0.3rem 0.5rem
    border-radius 3px
    cursor pointer
    a
      color lighten($textColor, 35%)
      .page-title
        font-weight 600
      .header
        font-size 0.9em
        margin-left 0.25em
    &.focused
      background-color #f3f4f5
      a
        color $accentColor
// @media (max-width: $MQNarrow)
//   .search-box input
//     width 0
//     border-color transparent
//     position relative
//     left 1rem
//     &:focus
//       left 0
//       width 10rem
// @media (max-width: $MQMobile)
//   .search-box
//     margin-right 0
//     .suggestions
//       right 0
// @media (max-width: $MQMobileNarrow)
//   .search-box .suggestions
//     width calc(100vw - 4rem)
</style>
