<template>
  <div class="admin">
    <app-header></app-header>
    <div class="app-main">
      <app-aside :menus="menus" @select-item="selectItem"></app-aside>
      <div class="app-content">
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
  methods: {
    selectItem(menu) {
      this.$router.push({ path: menu.path })
    }
  }
}
</script>