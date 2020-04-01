let GLOBAL_DATA = []
importScripts('/ajax.js')
onmessage = function(e) {
  switch (e.data.type) {
    case 'data-begin':
      data = []
      _beginData(e)
      break
    case 'data-filter':
      _filterData(e)
    default:
      break
  }
}
function _beginData(e) {
  let _type = e.data.from || 'local'
  let _promise = null
  if (_type === 'local') {
    _promise = _genDataLocal(e)
  } else {
    _promise = ajaxGet(
      'https://www.easy-mock.com/mock/59dec7acc09842759ae666da/mock/bigdata'
    )
  }
  _promise.then(d => {
    if (typeof d === 'string') {
      d = JSON.parse(d).data
    }
    GLOBAL_DATA = d
    postMessage({ type: 'data-end' })
  })
}

function _genDataLocal(e) {
  return new Promise(resolve => {
    for (let i = 0; i < (e.data.size || 10000); i++) {
      data.push({
        name: '成员' + i,
        id: i
      })
    }
    resolve(data)
  })
}
function _filterData(e, i = 0) {
  let _size = e.data.size
  let _count = Math.ceil(GLOBAL_DATA.length / _size)
  setTimeout(() => {
    if (i < _count) {
      _postData(i, _size, e.data.key)
      i = i + 1
      _filterData({ data: { ...e.data } }, i)
    }
  }, 100)
}

function _postData(index, size, key) {
  let _index = (index + 1) * size
  let _end = GLOBAL_DATA.length <= _index
  let _blockData = GLOBAL_DATA.slice(index * size, (index + 1) * size)
  let _filterData = _blockData.filter(block =>
    JSON.stringify(block).includes(key)
  )
  postMessage({
    type: 'data-filter',
    end: _end,
    data: _filterData
  })
}
