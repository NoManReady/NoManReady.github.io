<template>
  <div class="box">
    <div>
      <div :style="styl" @click="_add" class="shadow">
        <span style="margin-top:19px;display:inline-block;">点我</span>
      </div>
    </div>
    <div>
      <div class="outline">outline</div>
    </div>
    <div>
      <div class="inner-round">inner-round</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'mutil-border',
  data() {
    return {
      shadows: [
        '0 0 0 10px red',
        '0 0 0 20px green',
        '0 0 0 30px blue',
        '0 0 0 40px pink',
        '0 0 0 50px yellow',
        '0 0 0 60px white'
      ],
      step: 5
    }
  },
  computed: {
    styl() {
      return { 'box-shadow': this.shadows.slice(0, this.step).join(',') }
    }
  },
  methods: {
    _add(type) {
      if (this.step < this.shadows.length) {
        this.step++
      } else {
        this.step = 0
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '../../../style/variable';

.box {
  background-color: rgb(255, 255, 255);
  background-image: url('https://ss1.bdstatic.com/lvoZeXSm1A5BphGlnYG/skin/836.jpg?2');
  display: flex;

  &>div {
    flex: 1;
    text-align: center;
    min-height: 150px;
    padding: 60px;
    color: white;

    &:nth-of-type(1) {
      margin-left: 50px;
    }

    .shadow {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      color: white;
      font-size: 12px;
      line-height: 1;
      background-color: $accentColor;
      transition: 0.5s box-shadow ease-in-out;

      &:hover {
        cursor: pointer;
      }
    }

    .outline {
      width: 80px;
      height: 80px;
      background: #efebe9;
      border: 5px solid #B4A078;
      outline: #B4A078 dashed 1px;
      outline-offset: -10px;
      margin-bottom: 20px;
    }

    .inner-round {
      width: 80px;
      height: 80px;
      box-shadow: 0 0 0 5px gray;
      outline: 6px solid gray;
      border-radius: 5px;
    }
  }
}
</style>