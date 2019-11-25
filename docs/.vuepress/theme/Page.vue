<template>
  <div class="page">
    <Content :custom="false" />
    <Top />
    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank">Edit this page</a>
      <OutboundLink />
    </div>
    <div class="content page-nav" v-if="prev || next">
      <p class="inner">
        <span class="prev" v-if="prev">
          ←
          <router-link :to="prev.path" class="prev" v-if="prev">{{ prev.title || prev.path }}</router-link>
        </span>
        <span class="next" v-if="next">
          <router-link :to="next.path" v-if="next">{{ next.title || next.path }}</router-link>→
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import OutboundLink from './OutboundLink.vue'
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'
import Top from './Top.vue'
export default {
  components: { OutboundLink, Top },
  props: ['sidebarItems'],
  computed: {
    prev() {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },
    next() {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
    editLink() {
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master'
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }

      if (repo && editLinks) {
        const base = outboundRE.test(repo) ? repo : `https://github.com/${repo}`
        return (
          base.replace(endingSlashRE, '') +
          `/edit/${docsBranch}/` +
          docsDir.replace(endingSlashRE, '') +
          path
        )
      }
    }
  },
  mounted() {
    // window.addEventListener('load', this._hljs_init, false)
  },
  watch: {
    $page: {
      handler() {
        this.$nextTick().then(() => {
          this._hljs_init()
        })
      },
      immediate: true
    }
  },
  methods: {
    _hljs_init() {
      const codes = Array.from(document.querySelectorAll('.page pre>code'))
      const worker = new Worker('/hight_light_worker.js')
      worker.onmessage = ({ data }) => {
        let { content, index } = data
        codes[index].innerHTML = content
      }
      codes.forEach((code, i) => {
        worker.postMessage({ content: code.textContent || '', index: i })
      })
    }
  }
}

function resolvePrev(page, items) {
  return find(page, items, -1)
}

function resolveNext(page, items) {
  return find(page, items, 1)
}

function find(page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...(item.children || []))
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl';

.page {
  padding-bottom: 2rem;
}

.edit-link.content {
  padding-top: 0 !important;

  a {
    color: lighten($textColor, 25%);
    margin-right: 0.25rem;
  }
}

.page-nav.content {
  padding-top: 1rem !important;
  padding-bottom: 0 !important;

  .inner {
    min-height: 2rem;
    margin-top: 0 !important;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
  }

  .next {
    float: right;
  }
}
</style>
