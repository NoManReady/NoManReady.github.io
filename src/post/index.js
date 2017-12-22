const _paths = require.context('../../static/mds', true, /\.md$/).keys()

const _articles = _paths.map(p => {
    return p.replace(/.*\/(\w+).md$/, '$1')
})

export default _articles