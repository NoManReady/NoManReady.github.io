<template>
  <div class="search-box">
    <input
      @input="query = $event.target.value"
      aria-label="Search"
      :value="query"
      autocomplete="off"
      spellcheck="false"
      @keyup.enter="search">
  </div>
</template>

<script>
export default {
  props:['keyword'],
  data () {
    return {
      query: this.keyword
    }
  },
  computed: {
  },
  methods: {
    search () {
      this.$emit('enter',this.query)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../style/variable'
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
    font-size 0.9rem
    outline none
    transition all .2s ease
    background #fff url(../theme/search.svg) 0.6rem 0.5rem no-repeat
    background-size 1rem
    &:focus
      cursor auto
      border-color $accentColor
    line-height 1.5
    padding 0.4rem 0.6rem 0.4em 2em
    border-radius 4px
    &.focused
      background-color #f3f4f5
</style>
