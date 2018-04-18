import wcldConfig from './config'
let _idBase = new Date() - 0 //随机id
let DOM_WORDCLOUD_KEY = '_wCloud_instance_'
let _instances = {}

let messages = {
  dataError: '参数配置错误！'
}

export default function(dom) {
  dom = dom instanceof Array ? dom[0] : dom
  let key = dom.getAttribute(DOM_WORDCLOUD_KEY)
  if (!key) {
    key = _idBase++
    dom.setAttribute(DOM_WORDCLOUD_KEY, key)
  }

  _instances = new WCloud(dom)
  _instances.id = key

  return _instances
}

/*构造函数*/

function WCloud(dom) {
  this.dom = dom
  this._init()
}

function normalInt(min, max, iter) {
  iter = iter == 0 ? 1 : iter
  let arr = []
  for (let i = 0; i < iter; i++) {
    arr[i] = Math.random()
  }
  return (
    Math.floor(
      arr.reduce(function(i, j) {
        return i + j
      }) /
        iter *
        (max - min)
    ) + min
  )
}

/**
 * collusion 检测碰撞
 * @param {CanvasPixelArray} imageData 画布的imageData
 * @param {CanvasPixelArray} wordImageData 文字的imageData
 * @return {Boolean} 返回是否碰撞
 */
function collision(wordImageData) {
  let wdata, wy, widx, widxend, fidx, wv, fv
  wdata = wordImageData.data
  for (let wy = 0; wy < wdata.length; wy++) {
    if (wdata[wy]) {
      return true
    }
  }
  return false
}

WCloud.prototype = {
  _init: function() {
    //创建画布
    let canvas = document.createElement('canvas')
    let text = document.createTextNode('sorry!您的浏览器版本太低...')
    canvas.appendChild(text)
    canvas.width = this.dom.scrollWidth
    canvas.height = this.dom.scrollHeight
    this.dom.appendChild(canvas)
    this.canvas = canvas
    if (canvas.getContext) {
      let ctx = (this.ctx = canvas.getContext('2d'))
      //this._createAxis(ctx);//坐标
    }
  },
  /*--确定数据源--*/
  setOption: function(option) {
    if (option.data) {
      //console.log();
      this._setOption(option)
    } else if (option.textData) {
      this._setOption(option)
    } else {
      alert('数据未定义！')
      return this
    }
  },
  //将数据按从大到小排序
  _sort: function(arr) {
    return arr.sort(function(v1, v2) {
      if (!v1.frq) {
        console.log(messages.dataError + ':frq')
      }
      if (v1.frq > v2.frq) {
        return -1
      } else if (v1.frq < v2.frq) {
        return 1
      } else return 0
    })
  },
  /*--在此根据 styleType 类型分发任务--*/
  _setOption: function(option) {
    if (option.styleType == 'vertical') {
      this._drawVertical(option)
    } else if (option.styleType == 'tilt') {
      this._drawTitle(option)
    } else {
      this._drawNormal(option)
    }
    return this
  },
  _createAxis: function(ctx) {
    ctx.save()
    let width = this.dom.scrollWidth
    let height = this.dom.scrollHeight

    ctx.strokeStyle = '#aaa'
    ctx.translate(width / 2, height / 2)

    ctx.beginPath()
    ctx.moveTo(-(width / 2), 0)
    ctx.lineTo(width / 2, 0)

    ctx.moveTo(0, height / 2)
    ctx.lineTo(0, -height / 2)
    ctx.rotate(90 * Math.PI / 180)

    ctx.fillText('原点', 0, 0)
    ctx.stroke()

    ctx.restore()
  },
  _drawNormal: function(option) {
    let data = this._sort(option.data)
    let ctx = this.ctx
    /*--平移--*/
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2)
    for (let i = 0; i < data.length; i++) {
      ctx.save()
      ctx.fillStyle = /*wcldConfig.COLORS[i]*/ '#008ca3'
      let fontsize = 'Bold ' + data[i].frq + 'px 宋体'
      ctx.font = fontsize
      let text = data[i].word
      let tWidth = ctx.measureText(text).width
      let tHeight = data[i].frq
      let x, y
      /*--循环碰撞测验--*/
      while (true) {
        x =
          normalInt(-this.canvas.width / 2, this.canvas.width / 2, 10) -
          tWidth / 2
        y =
          normalInt(-this.canvas.height / 2, this.canvas.height / 2, 20) +
          tHeight / 2
        let isCollision = collision(
          ctx.getImageData(
            x + this.canvas.width / 2,
            y - tHeight + this.canvas.height / 2,
            tWidth + 3,
            tHeight + 3
          )
        )
        if (!isCollision) break
      }
      ctx.fillText(text, x, y)
      ctx.restore()
    }
  },
  _drawVertical: function(option) {
    let data = this._sort(option.data)
    let ctx = this.ctx
    /*--平移--*/
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2)

    function Spin() {
      //获取均匀随机值，是否旋转，旋转的概率为（1-0.7）
      if (Math.random() > 0.7) {
        ctx.rotate(90 * Math.PI / 180)
        return true
      } else {
        return false
      }
    }
    for (let i = 0; i < data.length; i++) {
      ctx.save()
      let isSpin = Spin()
      ctx.fillStyle = /*wcldConfig.COLORS[i]*/ '#008ca3'
      let fontsize = 'Bold ' + data[i].frq + 'px 宋体'
      ctx.font = fontsize
      let text = data[i].word
      let tWidth = ctx.measureText(text).width
      let tHeight = data[i].frq
      let x, y
      /*--循环碰撞测验--*/
      while (true) {
        x =
          normalInt(-this.canvas.width / 2, this.canvas.width / 2, 20) -
          tWidth / 2
        y =
          normalInt(-this.canvas.height / 2, this.canvas.height / 2, 20) +
          tHeight / 2
        let isCollision
        if (isSpin) {
          isCollision = collision(
            ctx.getImageData(
              -y + this.canvas.width / 2,
              x + this.canvas.height / 2,
              tHeight + 3,
              tWidth + 3
            )
          )
        } else {
          isCollision = collision(
            ctx.getImageData(
              x + this.canvas.width / 2,
              y - tHeight + this.canvas.height / 2,
              tWidth + 3,
              tHeight + 3
            )
          )
        }
        if (!isCollision) break
      }
      ctx.fillText(text, x, y)
      ctx.restore()
    }
  },
  _drawTitle: function(option) {
    let data = this._sort(option.data)
    let ctx = this.ctx
    /*--平移--*/
    ctx.translate(this.canvas.width / 2, this.canvas.height / 2)

    function Spin(ctx) {
      if (Math.random() > 0.5) {
        ctx.rotate(-45 * Math.PI / 180)
        return true
      } else {
        ctx.rotate(45 * Math.PI / 180)
        return false
      }
    }
    for (let i = 0; i < data.length; i++) {
      ctx.save()
      let isSpin = Spin(ctx)
      ctx.fillStyle = /*wcldConfig.COLORS[i]*/ '#008ca3'
      let fontsize = 'Bold ' + data[i].frq + 'px 宋体'
      ctx.font = fontsize
      let text = data[i].word
      let tWidth = ctx.measureText(text).width
      let tHeight = data[i].frq
      let x, y
      /*--循环碰撞测验--*/
      while (true) {
        x =
          normalInt(-this.canvas.width / 2, this.canvas.width / 2, 20) -
          tWidth / 2
        y =
          normalInt(-this.canvas.height / 2, this.canvas.height / 2, 20) +
          tHeight / 2

        let isCollision
        if (isSpin) {
          // -45°
          let x1 = (x + y - tHeight) / Math.sqrt(2) + this.canvas.width / 2
          let y1 =
            (y - x - tHeight - tWidth) / Math.sqrt(2) + this.canvas.height / 2
          let l = (tHeight + tWidth) / Math.sqrt(2) + 3
          isCollision = collision(ctx.getImageData(x1, y1, l, l))
        } else {
          // 45°
          let x2 = (x - y) / Math.sqrt(2) + this.canvas.width / 2
          let y2 = (x + y - tHeight) / Math.sqrt(2) + this.canvas.height / 2
          let l2 = (tHeight + tWidth) / Math.sqrt(2) + 3
          isCollision = collision(ctx.getImageData(x2, y2, l2, l2))
        }
        if (!isCollision) break
      }
      ctx.fillText(text, x, y)
      ctx.restore()
    }
  }
}
