const menus = [
  {
    label: 'nav.article',
    icon: 'el-icon-star-on',
    path: '/admin/article',
    children: [
      {
        label: 'nav.vue',
        path: '/admin/article/vue',
        isDefault: true,
        children: null
      },
      {
        label: 'nav.js',
        path: '/admin/article/js',
        children: null
      },
      {
        label: 'nav.css',
        path: '/admin/article/css',
        children: null
      },
      {
        label: 'nav.lua',
        path: '/admin/article/lua',
        children: null
      },
      {
        label: 'nav.other',
        path: '/admin/article/other',
        children: null
      }
    ]
  },
  {
    label: 'OW-VUE',
    icon: 'el-icon-star-on',
    path: '/admin/article',
    children: [
      {
        label: '概括',
        path: '/admin/article/ow',
        children: null
      },
      {
        label: 'OW解析',
        path: '/admin/article/ow-rpc',
        children: null
      },
      {
        label: 'VUE解析',
        path: '/admin/article/ow-vue',
        children: null
      }
    ]
  }
]

let defaultPath = ''
let allLeafPaths = []
// 生成序列
const getQuene = (list, par_q) => {
  if (!list || !list.length) {
    return null
  }
  let cur_q = 1
  return list.filter(lis => {
    if (lis.hidden) {
      return false
    }
    let _id = cur_q++
    if (par_q) {
      _id = `${par_q}.${_id}`
    }
    lis.id = _id.toString()
    if (!lis.children || !lis.children.length) {
      if (lis.isDefault) {
        defaultPath = lis.path
      }
      allLeafPaths.push(lis.path)
    }
    lis.children = getQuene(lis.children, _id)
    return true
  })
}

export default getQuene(menus)

export let path = defaultPath

export const paths = allLeafPaths
