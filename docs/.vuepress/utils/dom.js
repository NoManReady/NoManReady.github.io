/**
 * 滚动元素至指定位置
 * @param {HTMLElement} el 滚动元素
 * @param {number} from 初始位置
 * @param {number} to 结束位置
 * @param {number} duration 持续时间
 */
export const scrollTop = (el, from = 0, to, duration = 500, cb = () => { }) => {
  return new Promise(r => {
    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 1000 / 60)
        }
    }
    const difference = Math.abs(from - to)
    const step = Math.ceil(difference / duration * 50)

    function scroll(start, end, step) {
      cb(start)
      if (start === end) {
        r()
        return
      }

      let d = start + step > end ? end : start + step
      if (start > end) {
        d = start - step < end ? end : start - step
      }

      if (el === window) {
        window.scrollTo(d, d)
      } else {
        el.scrollTop = d
      }
      window.requestAnimationFrame(() => scroll(d, end, step))
    }
    scroll(from, to, step)
  })
}