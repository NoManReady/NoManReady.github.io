// 环境value
let _isDev = process.env.NODE_ENV === 'development'

/**
 * 去中心化
 * @param {上下文} requireContext
 * @param {排除文件} exinclude
 */
export const deCentralization = (
  requireContext,
  exinclude = /index/,
  fn = argv => argv
) => {
  const sourceMap = {}
  const paths = requireContext.keys().filter(p => {
    return !exinclude.test(p)
  })
  for (let p of paths) {
    const ss = fn(requireContext(p))
    for (let s in ss) {
      sourceMap[s] = ss[s]
    }
  }
  return sourceMap
}

/**
 * 去中心化(export default形式)
 * @param {上下文} requireContext
 */
export const deCentralizationUmd = (
  requireContext,
  fn = (a, b) => ({ ...a, ...b })
) => {
  const sourceMap = (r => {
    return requireContext.keys().map(k => {
      return r(k).default
    })
  })(requireContext)
  return sourceMap.reduce(fn)
}

/**
 * 开发输出log
 * @param {消息} msg
 */
export const log = msg => {
  if (_isDev && console && console.log) {
    console.log(msg)
  }
}

/**
 * 获取style样式
 */
export const getStyle = (element, attr) => {
  let target
  // scrollTop 获取方式不同，不属于style，而且只有document.body才能用
  if (attr === 'scrollTop') {
    target = element.scrollTop
  } else if (element.currentStyle) {
    target = element.currentStyle[attr]
  } else {
    target = document.defaultView.getComputedStyle(element, null)[attr]
  }
  return target
}
