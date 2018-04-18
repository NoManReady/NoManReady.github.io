module.exports = {
  title: 'NoManReady',
  description: 'Enjoy Vue',
  host: 'localhost',
  port: '9999',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['script', { src: `/plugin.js`, defer: `defer` }]
  ],
  themeConfig: {
    sidebarDepth: 1,
    sidebar: {
      '/vue/': [['axios', 'Axios配置'], ['image', '图片上传']],
      '/react/': [['todo', '演示项目']],
      '/ow/': [['eweb', 'Eweb项目结构']]
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Ow', link: '/ow/' }
    ],
    repo: 'NoManReady/NoManReady.github.io/tree/dev',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true
  }
}
