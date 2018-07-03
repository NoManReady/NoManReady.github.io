# js 插件开发方式

## 完成的 js 插件格式

```
;(function(undefined) {
  'use strict'
  var _global
  var plugin = {
    add: function(n1, n2) {
      return n1 + n2
    },
    sub: function(n1, n2) {
      return n1 - n2
    },
    mul: function(n1, n2) {
      return n1 * n2
    },
    div: function(n1, n2) {
      return n1 / n2
    },
    sur: function(n1, n2) {
      return n1 % n2
    }
  }
  // 将插件对象暴露给全局对象  (0, eval)('this')相当于执行eval('this')
  _global = (function() {
    return this || (0, eval)('this')
  })()
  // 判断是否存在加载器，如果存在加载器，我们就使用加载器，如果不存在加载器。我们就使用顶级域对象。
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = plugin
  } else if (typeof define === 'function' && define.amd) {
    define(function() {
      return plugin
    })
  } else {
    !('plugin' in _global) && (_global.plugin = plugin)
  }
})()
```
