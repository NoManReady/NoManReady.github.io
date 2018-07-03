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
      '/javascript/': ['pluginmode', 'mobile'],
      '/mockjs/': ['mockjs', 'demo'],
      '/other/': ['papper']
    },
    nav: [
      { text: 'Home', link: '/' },
      {
        text: '文章',
        items: [
          { text: 'Vue', link: '/vue/' },
          { text: 'Ow', link: '/ow/' },
          { text: 'Javascript', link: '/javascript/' },
          { text: 'Mockjs', link: '/mockjs/' },
          { text: '其他', link: '/other/' }
        ]
      },
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
    // console.log(config.module.rules)
  }
}
