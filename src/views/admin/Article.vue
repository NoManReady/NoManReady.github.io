<template>
  <div>
    <a href="javascript:;" class="article" v-for="item in acticles" :key="item" @click="onClick(item)">{{item}}</a>
  </div>
</template>
<script>
import acticles from '@/post'
import marked from 'marked'
export default {
  name: 'Article',
  data() {
    return {
      acticles
    }
  },
  methods: {
    onClick(item) {
      this.$api.getArticle(item).then(d => {
        console.log(d)
        this.$emit('art-link', marked(d))
      })
    }
  }
}
</script>