let data = []
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
  for (let i = 0; i < (e.data.size || 10000); i++) {
    data.push({
      name: '成员' + i
    })
  }
  postMessage({ type: 'data-end' })
}

function _filterData(e, i = 0) {
  let _size = e.data.size
  let _count = Math.ceil(data.length / _size)
  setTimeout(() => {
    if (i < _count) {
      _postData(i, _size)
      i = i + 1
      _filterData({ data: { size: _size } }, i)
    }
  }, 100)
}

function _postData(index, size) {
  let _index = (index + 1) * size
  let _end = data.length <= _index
  postMessage({
    type: 'data-filter',
    end: _end,
    data: data.slice(index * size, (index + 1) * size)
  })
}
