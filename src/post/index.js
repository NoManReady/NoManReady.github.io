const _paths = require.context('../../static/mds', true, /\.md$/).keys()

const _articles = _paths.map(p => {
  let reg = /.*\/(.+)@([\w-]+).md$/
  reg.test(p)
  return {
    name: RegExp.$1,
    type: RegExp.$2,
    path: p.replace(/^\./, '/static/mds')
  }
})

export default _articles
