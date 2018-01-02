<template>
  <div class="admin">
    <app-header></app-header>
    <div class="app-main">
      <app-aside :menus="menus" @select-item="selectItem"></app-aside>
      <div class="app-content" :style="contentStyl">
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </div>
    </div>
    <app-footer class="hide"></app-footer>
  </div>
</template>
<script>
import { AppAside, AppHeader, AppFooter } from '@/layout'
import menus from '@/utils/menus'
export default {
  name: 'Admin',
  data() {
    return {
      menus
    }
  },
  components: {
    AppAside,
    AppHeader,
    AppFooter
  },
  created() {
    if (!this.$store.state.app.init) {
      this.$router.replace({ name: 'welcome' })
    }
  },
  computed: {
    contentStyl() {
      return this.$store.getters.collapse ? { left: '75px' } : { left: '160px' }
    }
  },
  methods: {
    selectItem(menu) {
      this.$router.push({ path: menu.path })
    }
  }
}
</script>