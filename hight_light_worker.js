onmessage = (event) => {
  importScripts('//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.16.2/build/highlight.min.js');
  let { content, index } = event.data
  const result = self.hljs.highlightAuto(content);
  postMessage({ content: result.value, index });
};