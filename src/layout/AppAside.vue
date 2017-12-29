<script>
export default {
  name: 'AppAside',
  props: {
    menus: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      defaultActive: '',
      defaultOpeneds: []
    }
  },
  created() {
    this._setNavStatus()
  },
  watch: {
    $route(v) {
      this._setNavStatus()
    }
  },
  computed: {
    flatMenu() {
      return this._getFlatMenu(this.menus)
    },
    collapse() {
      return this.$store.getters.collapse
    }
  },
  methods: {
    // 扁平化菜单
    _getFlatMenu(menus, menuMap = {}) {
      menus.forEach(menu => {
        if (menu.path) {
          menuMap[menu.path] = menu
        }
        if (menu.children && menu.children.length) {
          this._getFlatMenu(menu.children, menuMap)
        }
      })
      return menuMap
    },
    // 设置菜单状态
    _setNavStatus() {
      let _active = this.$route.path
      let _openeds = []
      let _curMenu = this.flatMenu[_active]
      let _menus = this.menus
      while (_menus.length) {
        for (let i = 0, len = _menus.length; i < len; i++) {
          let _m = _menus[i]
          if (_curMenu.id.indexOf(_m.id) === 0) {
            _openeds.push(_m.id)
            if (_m.children && _m.children.length) {
              _menus = _m.children
            }
            break
          }
        }
        _menus = []
      }
      this.defaultActive = _curMenu.id
      this.defaultOpeneds = _openeds
    },
    // 生成菜单
    _generator(menus) {
      return menus.map((menu, index) => {
        let _lab = this.$t(menu.label)
        if (menu.children && menu.children.length) {
          return (
            <el-submenu index={menu.id}>
              <template slot="title">
                <i class={menu.icon} />
                <span title={_lab}>{_lab}</span>
              </template>
              {this._generator(menu.children)}
            </el-submenu>
          )
        } else {
          return (
            <el-menu-item
              index={menu.id}
              onClick={this.onItemClick.bind(this, menu)}
            >
              <i class={menu.icon} />
              <span title={_lab}>{_lab}</span>
              <span slot="title">{_lab}</span>
            </el-menu-item>
          )
        }
      })
    },
    // 菜单点击事件
    onItemClick({ id, path }) {
      this.$emit('select-item', { id, path })
    },
    // 菜单选中事件（el带）
    selectItem(data) {
      // this.$emit('select-item', data)
    },
    // 菜单打开
    menuOpen(data) {
      this.$emit('menu-open', data)
    },
    // 菜单关闭
    menuClose(data) {
      this.$emit('menu-close', data)
    }
  },
  render(h) {
    const _vm = this
    const _menus = this._generator(this.menus)
    const _props = {
      props: {
        'default-active': this.defaultActive,
        'default-openeds': this.defaultOpeneds,
        collapse: this.collapse
      },
      class: {
        'aside-menu': true
      },
      on: {
        select(index, indexPath) {
          _vm.selectItem({ index, indexPath })
        },
        open(index, indexPath) {
          _vm.menuOpen({ index, indexPath })
        },
        close(index, indexPath) {
          _vm.menuClose({ index, indexPath })
        }
      }
    }
    return (
      <div class="app-aside">
        <el-menu {..._props}>{_menus}</el-menu>
      </div>
    )
  }
}
</script>
<style lang="css" scoped>

</style>