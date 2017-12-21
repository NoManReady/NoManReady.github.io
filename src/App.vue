<template>
  <div id="app">
    <svg-icon icon-class="success" @click.native="onClick"></svg-icon>
    <svg-icon icon-class="idcard" @click.native="onClick"></svg-icon>
    <svg-icon icon-class="share" @click.native="onClick"></svg-icon>
  </div>
</template>

<script>
export default {
  name: "app",
  methods: {
    onClick(e) {
      console.log([...e.target.classList].join(","));
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
[class*=" icon-"],
[class^="icon-"] {
  margin-left: 10px;
}
</style>
