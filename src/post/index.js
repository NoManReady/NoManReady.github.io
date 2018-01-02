const _paths = require.context('../../static/mds', true, /\.md$/).keys()

const _articles = _paths.map(p => {
  return p.replace(/.*\/(\d+@)?(.+).md$/, '$2')
})

export default _articles
