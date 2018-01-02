export default [
  {
    id: '1',
    label: 'nav.article',
    icon: 'el-icon-star-on',
    path: '/admin/article',
    children: [
      {
        id: '1.1',
        label: 'nav.vue',
        path: '/admin/article/vue',
        children: null
      },
      {
        id: '1.2',
        label: 'nav.js',
        path: '/admin/article/js',
        children: null
      },
      {
        id: '1.3',
        label: 'nav.css',
        path: '/admin/article/css',
        children: null
      },
      {
        id: '1.4',
        label: 'nav.other',
        path: '/admin/article/other',
        children: null
      }
    ]
  }
]
