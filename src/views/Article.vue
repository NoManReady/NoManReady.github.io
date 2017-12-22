<template>
  <div>
      <a href="javascript:;" class="article" v-for="item in acticles" :key="item" @click="onClick(item)">{{item}}</a>
  </div>
</template>
<script>
import acticles from "../post";
import marked from "marked";
import axios from "axios";
export default {
  name: "articles",
  data() {
    return {
      acticles
    };
  },
  methods: {
    onClick(item) {
      axios.get(`/static/mds/${item}.md`).then(res => {
        this.$emit("art-link", marked(res.data));
      });
    }
  }
};
</script>
