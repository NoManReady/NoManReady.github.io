const OPTS = {
  topId: 'top',
  bottomId: 'bottom',
  container: '#iScroll',
  sizes: 20,
  height: 40,
  render: () => ({})
}
class IScroll {
  constructor(opts) {
    this.options = Object.assign(OPTS, opts)
    this.confCache = {
      paddingTop: 0,
      paddingBottom: 0,
      topY: 0,
      topRatio: 0,
      bottomY: 0,
      bottomRatio: 0,
      renderIndex: 0
    }
  }
  updateCache(cache) {
    Object.assign(this.confCache, cache)
  }
  adjustPadding(isScrollDown) {
    let { container, height, sizes } = this.options
    let { paddingTop, paddingBottom } = this.confCache
    let newPaddingTop, newPaddingBottom
    let paddingDiff = height * Math.floor(sizes / 2)
    if (isScrollDown) {
      newPaddingTop = paddingTop + paddingDiff
      newPaddingBottom = Math.min(0, Math.abs(paddingBottom - paddingDiff))
    } else {
      newPaddingBottom = paddingBottom + paddingDiff
      newPaddingTop = Math.min(0, Math.abs(paddingTop - paddingDiff))
    }
    this.updateCache({ paddingTop: newPaddingTop, paddingBottom: newPaddingBottom })
    container.style.paddingBottom = `${newPaddingBottom}px`
    container.style.paddingTop = `${newPaddingTop}px`

  }
  getRenderIndex(isScrollDown) {
    let { renderIndex } = this.confCache
    let { sizes } = this.options
    let increment = Math.floor(sizes / 2)
    let index = 0
    if (isScrollDown) {
      index = renderIndex + increment
    } else {
      index = renderIndex - increment
    }
    if (index < 0) {
      index = 0
    }
    return index
  }
  topDomCb(entry) {
    let { topY, topRatio } = this.confCache
    let newTopY = entry.boundingClientRect.top
    let newTopRadio = entry.intersectionRatio
    // 滚动条向上滚
    if (newTopY > topY && entry.isIntersecting && newTopRadio >= topRatio) {
      let renderIndex = this.getRenderIndex(false)
      this.adjustPadding(false)
      this.options.render(renderIndex)
      this.updateCache({ topY: newTopY, topRatio: newTopRadio, renderIndex })
    } else {
      this.updateCache({ topY: newTopY, topRatio: newTopRadio })
    }
  }
  bottomDomCb(entry) {
    let { bottomY, bottomRatio } = this.confCache
    let newBottomY = entry.boundingClientRect.top
    // 目标视口的占比率（变大说明目标正在进去视口）
    let newBottomRadio = entry.intersectionRatio
    // 滚动条向下滚
    if (bottomY > newBottomY && entry.isIntersecting && newBottomRadio >= bottomRatio) {
      let renderIndex = this.getRenderIndex(true)
      this.adjustPadding(true)
      this.options.render(renderIndex)
      this.updateCache({ bottomY: newBottomY, bottomRatio: newBottomRadio, renderIndex })
    } else {
      this.updateCache({ bottomY: newBottomY, bottomRatio: newBottomRadio })
    }
  }
  startObserve() {
    const callback = (entries) => {
      entries.forEach(entry => {
        if (entry.target.id === this.options.topId) {
          this.topDomCb(entry)
        } else if (entry.target.id === this.options.bottomId) {
          this.bottomDomCb(entry)
        }
      })
    }
    let observe = new IntersectionObserver(callback, {})
    observe.observe(document.getElementById(this.options.topId))
    observe.observe(document.getElementById(this.options.bottomId))
  }
  start() {
    this.startObserve()
  }
}

export default IScroll