# Base Class

```
class Base extends HTMLElement {
  constructor() {
    super()
    this._properties = new Map()
    // 配置properties与attribute的映射
    this.constructor.observedAttributes.forEach(attr => {
      Object.defineProperty(this, attr, {
        get() {
          let _attr = this.getAttribute(attr)
          return this._properties.get(_attr)
        },
        set(v) {
          let _uni_key = new Date().getTime().toString(16)
          this._properties.set(_uni_key, v)
          if (v === undefined || v === null) {
            this.removeAttribute(attr)
          } else {
            this.setAttribute(attr, _uni_key)
          }
        }
      })
    })
  }
  attributeChangedCallback(attr, oldValue, newValue) {
    let _callbackName = `_${attr}_change`
    if (this[_callbackName] && typeof this[_callbackName] === 'function') {
      this[_callbackName](this._properties.get(oldValue), this._properties.get(newValue))
    }
  }
  connectedCallback() {
    if (this.mounted && typeof this.mounted === 'function') {
      this.mounted()
    }
  }
  adoptedCallback() {
    if (this.moved && typeof this.moved === 'function') {
      this.moved()
    }
  }
  disconnectedCallback() {
    if (this.unmounted && typeof this.unmounted === 'function') {
      this.unmounted()
    }
  }
}

```
