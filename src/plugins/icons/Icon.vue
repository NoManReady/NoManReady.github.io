<template>
  <svg class="svg-icon" aria-hidden="true" :class="iconName">
    <use :xlink:href="`#${iconName}`"></use>
  </svg>
</template>

<script>
export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    }
  },
  computed: {
    iconName() {
      return `icon-${this.iconClass}`
    }
  },
  mounted(){
    document.body.appendChild(this.$el)
  }
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
