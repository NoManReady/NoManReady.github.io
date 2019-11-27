<template>
  <div class="box">
    <div class="mb10">
      <button :class="{'active':type==='border-box'}" @click="_setType('border-box')" class="mr10 btn">border-box</button>
      <button :class="{'active':type==='padding-box'}" @click="_setType('padding-box')" class="mr10 btn">padding-box</button>
      <button :class="{'active':type==='content-box'}" @click="_setType('content-box')" class="mr10 btn">content-box</button>
      <button :class="{'active':type==='text'}" @click="_setType('text')" class="btn">text</button>
    </div>
    <div :style="styl" class="t-border mt10">NoManReady</div>
  </div>
</template>
<script>
export default {
  name: 'transparent-border',
  data() {
    return {
      type: 'border-box'
    }
  },
  computed: {
    styl() {
      if (this.type === 'text') {
        return {
          'background-clip': 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent'
        }
      } else {
        return { 'background-clip': this.type }
      }
    }
  },
  methods: {
    _setType(type) {
      this.type = type
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../style/variable';

.box {
  background-color: rgb(255, 255, 255);
  background-image: url('https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2');

  .t-border {
    border: 10px dashed rgba($borderColor, 0.5);
    padding: 20px;
    text-align: center;
    font-weight: bold;
    font-size: 30px;
    background-color: white;
  }
}
</style>