module.exports = {
  title: 'NoManReady',
  description: 'Enjoy Vue',
  host: '127.0.0.1',
  port: '9999',
  head: [
    ['link', { rel: 'icon', href: `/favicon.ico` }],
    ['link', { rel: 'stylesheet', href: `//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/styles/monokai-sublime.min.css` }],
    ['script', { src: `/plugin.js`, defer: `defer` }]
  ],
  themeConfig: {
    sidebarDepth: 1,
    sidebar: {
      '/ow/': ['eweb', 'lua'],
      '/javascript/': ['pluginmode', 'mobile', 'axios', 'image', 'timeselected', 'utils'],
      '/css/': ['border_background'],
      '/mockjs/': ['api', 'demo'],
      '/vue/': ['config'],
      '/webcomponent/': ['lithtml'],
      '/story/': [''],
      '/structure/': ['sort', 'designJS']
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'WebComponent', link: '/webcomponent/' },
      { text: 'Structure', link: '/structure/' },
      { text: '故事会', link: '/story/' },
      {
        text: '文章',
        items: [
          { text: 'Ow', link: '/ow/' },
          { text: 'Javascript', link: '/javascript/' },
          { text: 'CSS', link: '/css/' },
          { text: 'Mockjs', link: '/mockjs/' },
          { text: 'Vue', link: '/vue/' }
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

    }
  }
}
