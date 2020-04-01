<template>
  <div @click="_toggle" class="box" :style="showStyl">
    <section class="g-img"></section>
    <section class="g-img"></section>
    <section class="g-img"></section>
    <section class="g-img"></section>
  </div>
</template>
<script>
export default {
  name: 'parallax',
  data() {
    return {
      show: false
    }
  },
  computed:{
    showStyl(){
      if(!this.show){
        return {}
      }else{
        return {
          position:'fixed'
        }
      }
    }
  },
  methods: {
    _toggle() {
      this.show = !this.show
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../style/variable';

.box {
  height: 400px;
  width: 100%;
  overflow: auto;
  margin: 0;
  padding: 0;

  section {
    height: 100%;
    width: 100%;
  }

  .g-img {
    background-attachment: fixed;
    background-size: contain;
    background-position: center center;
  }

  .g-img:nth-of-type(1) {
    background-image: url('https://dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/885.jpg?2'); // dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/885.jpg?2);
  }

  .g-img:nth-of-type(2) {
    background-image: url('https://dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/884.jpg?2'); // dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/884.jpg?2);
  }

  .g-img:nth-of-type(3) {
    background-image: url('https://dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/883.jpg?2'); // dss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/skin/883.jpg?2);
  }

  .g-img:nth-of-type(4) {
    background-image: url('https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2'); // ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2);
  }
}
</style>