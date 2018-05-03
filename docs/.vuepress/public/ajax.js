let XHR = (function createAjax() {
  let request = false
  request = new XMLHttpRequest()
  return request
})()
function ajaxGet(url) {
  XHR.open('get', url)
  XHR.setRequestHeader('Content-type', 'application/json')
  XHR.send(null)
  return new Promise(resolve => {
    XHR.onreadystatechange = function() {
      if (XHR.readyState == 4) {
        if (XHR.status == 200) {
          resolve(XHR.responseText)
        } else {
          opt.err.call(self, XHR)
        }
      }
    }
  })
}
