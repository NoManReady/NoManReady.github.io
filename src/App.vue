<template>
  <el-container class="app">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <Article @art-link="artLink"></Article>
      </el-aside>
      <el-main>
        <pre v-html="content"></pre>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import Article from "./views/Article";
export default {
  name: "app",
  data() {
    return {
      content: "Hello,Man!"
    };
  },
  components: {
    Article
  },
  methods: {
    artLink(content) {
      this.content = content;
    }
  }
};
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
.app {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>


