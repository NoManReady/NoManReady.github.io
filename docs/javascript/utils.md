# js积累

## 全局匹配

number:/-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig

```
var number = /-?[0-9]*\.?[0-9]+(?:e[-+]?\d+)?/ig

function parseValues(args) {
    var numbers = args.match(number)
    return numbers ? numbers.map(Number) : []
}

```

## 延迟函数

```
const defer = typeof Promise=='function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;
```

## fetch封装

```
/**
 * c_fetch
 * 基于原生fetch封装了拦截器功能，暴露出来的c_fetch跟原生fetch用法一致，只是增加了拦截器功能。拦截器用法参考axios的拦截器用法。
 * 拦截器: c_fetch.interceptors
 * 注意: 拦截器不拦截reject类型的response结果
 */

(function () {
  //定义用来存储拦截请求和拦截响应结果的处理函数集合
  let interceptors_req = [], interceptors_res = [];

  function c_fetch (input, init = {}) {
    //fetch默认请求方式设为GET
    if(!init.method){
      init.method = 'GET'
    }
    
    //interceptors_req是拦截请求的拦截处理函数集合
    interceptors_req.forEach(interceptors => {
      init = interceptors(init);
    })
    
    //在原生fetch外面封装一个promise，为了在promise里面可以对fetch请求的结果做拦截处理。
    //同时，保证c_fetch函数返回的结果是个promise对象。
    return new Promise(function (resolve, reject) {
      //发起fetch请求，fetch请求的形参是接收上层函数的形参
      fetch(input, init).then(res => {
        //interceptors_res是拦截响应结果的拦截处理函数集合
        interceptors_res.forEach(interceptors => {
          //拦截器对响应结果做处理，把处理后的结果返回给响应结果。
          res = interceptors(res);
        })
        //将拦截器处理后的响应结果resolve出去
        resolve(res)
      }).catch(err => {
        reject(err);
      })
    })

  }
  
  //在c_fetch函数上面增加拦截器interceptors，拦截器提供request和response两种拦截器功能。
  //可以通过request和response的use方法来绑定两种拦截器的处理函数。
  //use方法接收一个参数，参数为一个callback函数，callback函数用来作为拦截器的处理函数；
  //request.use方法会把callback放在interceptors_req中，等待执行。
  //response.use方法会把callback放在interceptors_res中，等待执行。
  //拦截器的处理函数callback接收一个参数。
  //request拦截器的callback接收的是请求发起前的config；
  //response拦截器的callback接收的是网络请求的response结果。
  c_fetch.interceptors = {
    request: {
      use: function (callback) {
        interceptors_req.push(callback);
      }
    },
    response: {
      use: function (callback) {
        interceptors_res.push(callback);
      }
    }
  }

  export default c_fetch;
})()
```

## ES6实现mixin

```
function mix(...mixins) {
  class Mix { }
  for (let mixin of mixins) {
    copyProperties(Mix, mixin); // 拷贝实例属性
    copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
  }
  return Mix;
}
function copyProperties(target, source) {
  for (let key of Reflect.ownKeys(source)) {
    if (key !== "constructor"
      && key !== "prototype"
      && key !== "name"
    ) {
      let desc = Object.getOwnPropertyDescriptor(source, key);
      Object.defineProperty(target, key, desc);
    }
  }
}
```
## defer&async

![脚本加载顺序](/img/async&defer.png)
```
<script src="script.js"></script>

没有 defer 或 async，浏览器会立即加载并执行指定的脚本，“立即”指的是在渲染该 script 标签之下的文档元素之前，也就是说不等待后续载入的文档元素，读到就加载并执行。

<script async src="script.js"></script>

有 async，加载和渲染后续文档元素的过程将和 script.js 的加载与执行并行进行（异步）。

<script defer src="myscript.js"></script>

有 defer，加载后续文档元素的过程将和 script.js 的加载并行进行（异步），但是 script.js 的执行要在所有元素解析完成之后，DOMContentLoaded 事件触发之前完成。

不加：堵塞加载脚本并执行
async：异步加载脚本。加载完就执行（执行与顺序无关）
defer：异步加载脚本。在元素解析完之后DOMContentLoaded之前执行（执行与dom相关的程序）
```
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <script src="/test1.js" async></script>
  <!-- 
    console.log('defer')
    console.log(document.getElementById('test'))
   -->
  <script src="/test.js" defer></script>
  <!-- 
    console.log('async')
    console.log(document.getElementById('test'))
   -->
</head>

<body>
  <div class="masked" id="test">托尔斯泰</div>
  <script>
    console.log("Before DOM fully loaded and parsed")
    document.addEventListener("DOMContentLoaded", function (event) {
      console.log("DOM fully loaded and parsed")
    });
  </script>
</body>

</html>
```

## DOMContentLoaded与load

```
DOMContentLoaded:dom（包括js、css、html）解析完成，无需等待图片等其他资源加载完成；

load:等待图片等其他资源加载完成;
```

## eTag与Cache-Control（HTTP协议缓存）

```
Cache-Control：常见的取值有private、no-cache、max-age、must-revalidate等，默认为private。

说明：
public：	所有内容都将被缓存(客户端和代理服务器都可缓存)
private：	内容只缓存到私有缓存中(仅客户端可以缓存，代理服务器不可缓存)
no-cache：	必须先与服务器确认返回的响应是否被更改，然后才能使用该响应来满足后续对同一个网址的请求。因此，如果存在合适的验证令牌 (ETag)，no-cache 会发起往返通信来验证缓存的响应，如果资源未被更改，可以避免下载。
no-store：	所有内容都不会被缓存到缓存或 Internet 临时文件中
must-revalidation/proxy-revalidation：	如果缓存的内容失效，请求必须发送到服务器/代理以进行重新验证
max-age=xxx (xxx is numeric)：	缓存的内容将在 xxx 秒后失效, 这个选项只在HTTP 1.1可用, 并如果和Last-Modified一起使用时, 优先级较高
```

```
Etag：URL的Entity Tag，用于标示URL对象是否改变。

服务端返回头加入（Etag: xxx_etag)xxx_etag可为请求内容的MD5或hash值
再次请求时请求头将会带上（If-None-Match: xxx_etag）
服务端比较xxx_etag，如果完全相等-》服务器就会认为客户端已经有最新的文件内容的缓存了，于是服务器就会发送一个响应码为“304”的http响应（304：不包含任何响应的内容，只是提示客户端缓存的内容是最新的）
```

## Cookie
[Cookie 详细讲解][cookie_detail]

[cookie_detail]: https://www.cnblogs.com/kabi/p/6699242.html 'Cookie 详细讲解'

## 函数式

```
/**
 * compose函数式
 * @param {*} f 
 */
const compose = (...args) => x => args.reduceRight((value, item) => item(value), x)
// const f = x => x + 2
// const g = x => x * 2
// compose(g, f)(2)
export default compose

/**
 * 变量缓存函数式
 * @param {*} f 
 */
const memorize = f => {
  let _cache = {}
  return function () {
    let _cache_str = JSON.stringify(arguments)
    _cache[_cache_str] = _cache[_cache_str] || f.apply(f, arguments)
    return _cache[_cache_str]
  }
}
// const fn=(x,y)=>x+y
// memFn=memorize(fn)
export default memorize
```

