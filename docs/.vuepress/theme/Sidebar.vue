<template>
  <div class="sidebar" ref="sidebar">
    <NavLinks/>
    <ul class="sidebar-links" v-if="items.length">
      <li ref="sidebarItem" v-for="(item, i) in items">
        <SidebarGroup
          :collapsable="item.collapsable"
          :first="i === 0"
          :item="item"
          :open="i === openGroupIndex"
          @toggle="toggleGroup(i)"
          v-if="item.type === 'group'"
        />
        <SidebarLink :item="item" v-else/>
      </li>
    </ul>
  </div>
</template>

<script>
import SidebarGroup from './SidebarGroup.vue'
import SidebarLink, { groupHeaders } from './SidebarLink.vue'
import NavLinks from './NavLinks.vue'
import { isActive, resolveSidebarItems } from './util'
import { scrollTop } from '../utils/dom'

export default {
  components: { SidebarGroup, SidebarLink, NavLinks },
  props: ['items'],
  data() {
    return {
      openGroupIndex: 0
    }
  },
  created() {
    this.refreshIndex()
  },
  mounted() {
    this.$nextTick(() => {
      let _activeElIndex = resolveItemIndex(this.$route, this.items)
      let _dom = this.$refs.sidebarItem[_activeElIndex]
      if (_dom) {
        scrollTop(this.$refs.sidebar, 0, _dom.offsetTop)
      }
    })
  },
  watch: {
    $route() {
      this.refreshIndex()
    }
  },
  methods: {
    refreshIndex() {
      const index = resolveOpenGroupIndex(this.$route, this.items)
      if (index > -1) {
        this.openGroupIndex = index
      }
    },
    toggleGroup(index) {
      this.openGroupIndex = index === this.openGroupIndex ? -1 : index
    },
    isActive(page) {
      return isActive(this.$route, page.path)
    }
  }
}

function resolveOpenGroupIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (
      item.type === 'group' &&
      item.children.some(c => isActive(route, c.path))
    ) {
      return i
    }
  }
  return -1
}

function resolveItemIndex(route, items) {
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (
      item.type === 'group' &&
      item.children.some(c => isActive(route, c.path))
    ) {
      return i
    } else {
      if (isActive(route, item.path)) {
        return i
      }
    }
  }
  return -1
}
</script>

<style lang="stylus">
@import './styles/config.styl';

.sidebar {
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
  }

  a {
    display: inline-block;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    .nav-item, .github-link {
      display: block;
      line-height: 1.25rem;
      font-weight: 600;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  .sidebar-links {
    margin-top: 1.5rem;
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;
    }

    .sidebar-links {
      margin-top: 1rem;
    }
  }
}
</style>
