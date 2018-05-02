# DEMO

## Mockjs 直接调用方式

```
import Mock from 'mockjs'
const Random = Mock.Random
// 用户模拟接口数据
export const users = Mock.mock({
  'list|10-15': [
    {
      name: '@cname',
      'age|15-30': 1,
      sex: Random.pick(['male', 'female']),
      id: '@id',
      avatar: Random.dataImage('88x31', Random.region())
    }
  ]
})
```

## axios-mock-adapter 拦截 axios 请求

```
import Axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

let mock = new MockAdapter(Axios,{delayResponse:500})

export default mock

import mock from './mockPlugin'
import * as mockData from './mockData'
mock.onGet('/users').reply(config => {
  return [200, mockData.users]
})
```

## 通过 easy-mock

```
<!-- easymock新建项目会生成相应的projectId -->
const PROJECTID = '59dec7acc09842759ae666da'
_easyMock() {
  fetch(
    '/users',
    {},
    {
      baseURL: `https://www.easy-mock.com/mock/${PROJECTID}/mock`
    }
  ).then(d => {
    this.users = Object.freeze(d.list)
  })
}
```

通过在[easy-mock][easy-mock]注册项目，新建 api（mock-template 与 mockjs 一致），然后切换本地请求 host（本例子 host： [https://www.easy-mock.com/mock/59dec7acc09842759ae666da/mock](https://www.easy-mock.com/mock/59dec7acc09842759ae666da/mock/users 'host')） 进行 mock 环境、其他环境的切换

<mockjs-demo1/>
[easy-mock]: https://www.easy-mock.com/project/59dec7acc09842759ae666da 'easy-mock'

## 优缺点

* 直接调用方式比较灵活，直接截获应用的 ajax 请求，方便各种请求使用,可以配置多个 host 实现一部分走真实接口一部分走 mock 接口
* 通过 axios-mock-adapter 库连接，接管了所有 axios 的请求，一旦使用只要通过 axios 发出的请求都会被截获，实现不了多 host，但是 mock 和其他环境的切换比较方便（开启 axios-mock-adapter？）
* easymock 接口数据模拟，由于 api 存放在第三方站点界面 UI 好看，团队间更好维护，接口根据 host 进行目标定位，可以实现多 host

**_所以为了项目的多人协作及后续 api 文档的输出，一般选用第三种 mock 方式（easymock)。_**
