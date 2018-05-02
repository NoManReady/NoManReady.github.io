# Mockjs

## Mockjs 是什么？

Mockjs 是一款前端开发中拦截 Ajax 请求，然后随机生成预定义模板数据的工具库。前端开发过程中可以用它来模拟服务端响应，让前端独立于服务端开发。

**其优点有如下几点：**

* 前后端分离开发
* 增加单元测试数据的真实性
* 可以无侵入的植入 mock 数据，开发生产环境切换不需要修改代码
* mock 数据接口简单明了
* mock 数据类型丰富
* 可以自定义数据类型

## Mockjs 安装

_这边只进行 npm 方式的安装_

```
npx install mockjs -D
import Mock from mockjs
<!-- 随机生成20-200条指定数据模板的数据 -->
const _mockData=Mock.mock({
  'list|20-200':[{
    'name':'@first',
    'age|18-35':1
  }]
})
```

## Mockjs 语法

Mockjs 包含两种语法规范：

1.  数据模板规范（DTD）
2.  数据占位符规范（DPD）

### 1、数据模板规范

```
<!-- 数据模板包含3部分：属性名(name)，生成规则([rule])，属性值(value) -->
'name|rule':value
<!-- 包含7中格式（生成规则需要依赖属性值的类型，不同的属性值具有不同的含义）： -->
'name|min-max': value
'name|count': value
'name|min-max.dmin-dmax': value
'name|min-max.dcount': value
'name|count.dmin-dmax': value
'name|count.dcount': value
'name|+step': value
<!-- 属性值可以为：字符串、数字、布尔型、对象、数组、函数、正则表达式 -->
```

### 2、数据占位符规范

*占位符*只是在属性值字符串中占个位置，并不出现在最终的属性值中。

```
<!-- 占位符格式如下： -->
@占位符
@占位符(argv[,argv])
<!--Mockjs中为我们内置了许多种不同的占位符，当占位符引用数据模板中的属性时会优先使用数据模板的属性值 -->
const _person=Mock.mock({
  first:'@FIRST',
  last:'@LAST',
  fullname:'@first-@last'
})
```

## Mockjs 设置

配置拦截 Ajax 请求时的行为。支持的配置项有：timeout。

```
<!-- 表示请求的响应时间 -->
<!-- Mock.setup({
  timeout:{数值或以中横线划分的数值范围}
}) -->
```

## Mockjs 数据生成

* 根据数据模板生成数据`Mock.mock(template)`
* 拦截特定请求路径，然后生成数据(optionsb 表示此次请求的选项)`Mock.mock(url,tempalte|function(options))`
* 拦截特定请求路径特定请求动作类型，然后生成数据(optionsb 表示此次请求的选项)`Mock.mock(url,type,tempalte|function(options))`
* 判断真实数据是否符合数据模板定义的数据`Mock.valid(template,data)`

[Mockjs 演示][mockjs-demo]

[Mockjs 文档地址][mockjs-wiki]

[Mockjs 官网][mockjs]

[Easy Mock][easymock]

[mockjs-demo]: /other/mockdemo 'mockjs-demo'
[mockjs-wiki]: https://github.com/nuysoft/Mock/wiki 'mockjs-wiki'
[mockjs]: http://mockjs.com/ 'mockjs'
[easymock]: https://www.easy-mock.com/ 'easymock'
