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
      '/react/': ['todo'],
      '/ow/': ['eweb', 'lua'],
      '/javascript/': ['pluginmode']
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Vue', link: '/vue/' },
      { text: 'React', link: '/react/' },
      { text: 'Ow', link: '/ow/' },
      { text: 'Javascript', link: '/javascript/' },
      { text: '开源库', link: '/gist/' }
    ],
    repo: 'NoManReady/NoManReady.github.io',
    docsDir: 'docs',
    docsBranch: 'dev',
    editLinks: true
  },
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // config.module.rules.unshift(
      //   ...styleConfig.styleLoaders({
      //     sourceMap: true,
      //     usePostCSS: false
      //   })
      // )
    }
    console.log(config.module.rules)
  }
}
