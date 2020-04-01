;(function() {
  window.onload = () => {
    let _ua = window.navigator.userAgent
    if (_ua.indexOf('Windows') > -1) {
      let _sc = document.createElement('script')
      _sc.src = '/canvas.min.js'
      _sc.defer = 'defer'
      document.body.appendChild(_sc)
    }
  }
})()
