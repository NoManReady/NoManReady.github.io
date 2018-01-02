import marked from 'marked'
import '@/style/hljs.css'
marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})
export default str => {
  return new Promise(resolve => {
    marked(str, function(err, content) {
      if (err) throw err
      content = `<pre class="hljs">${content}</pre>`
      resolve(content || 'Resolve error!')
    })
  })
}
