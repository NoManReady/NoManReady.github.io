# EWEB开发编程指南
---
### 1 概述 
	简要介绍易网络web前端代码框架及ow-luci框架及开发流程
### 2 规范
###### 命名：
- vue组件->首字母大写的驼峰：比如Package.vue（每个组件name属性标识组件所在模块名称及组件名称，组件模板类名响应的以小写单词标识，多个单词以中横线分开，如：name:'DiagnosePackage'->class:diagnose-package）;
- 全局静态->大写单词，多单词以下横线分开，如：const APP_STATUS=1
- 局部变量->以下横线开头首字母小写的驼峰，如：let _count=0，local _lua='xxx'
- css->小写单词，多单词以中横线分开，如：box-tit

###### 路由及菜单
- 路由->path,name,t都是以下横线分开的多个单词，如：
```
{
    path: 'diagnose_package',
    name: 'diagnose_package',
    component: Package,
    meta: {
      roles:[],
      t: 'diagnose_package'
    }
  }
```
- 菜单->格式如下：
```
{
    "label": "故障诊断",
    "icon": "eweb-diagnosis",
    "t": "nav.diagnose",
    "children": [
      {
        "label": "抓包网络",
        "icon": "eweb-star",
        "t": "nav.diagnose_package",
        "path": "/admin/diagnose_package",
        "roles": [],
        "children": null
      }
}
```
- 国际化->以模块划分，多层级对象展示，如：
```
{
  author: 'NoManready',
  brand: 'EG',
  header: {
    guide: '快速配置',
    logout: '注销',
    lang: 'English'
  },
  nav: {
    notfound: '404',
    quickset: '快速配置',
    // 首页
    home: '首页',
    home_overview: '运行状态'
   }
}
```



### 3 web前端
###### 3.1 框架介绍
　　web前端采用vue全家桶进行单页面web开发（[webpack][webpack]+[vue2.0][vue]+[vuex][vuex]+[vue-router][vueRouter]+[axios][axios]+[element-ui][ele]等）；app采用[element-ui][ele]为前端UI框架，[vue-i18n][i18n]作为国际化处理方式。前端数据请求以application/json格式提交。
###### 3.2 目录结构
	代码目录以功能结构划分。
+ src
	+ api  ---*后台接口（去中心化）*
	+ assets  ---*app资源文件*
	+ common  ---*通用组件*
	+ components  ---*通用业务组件*
	+ config  ---*app全局配置文件（移至外层config文件）*
	+ directives  ---*指令目录*
	+ fiters  ---*过滤器*
	+ lang  ---*国际化目录（去中心化）*
	+ layout  ---*app结构布局*
	+ libs  ---*第三方插件*
	+ mixins  ---*公用混合目录*
	+ model  ---*web端数据模型（去中心化）*
	+ plugins  ---*vue插件*
	+ router  ---*路由目录（去中心化）*
	+ store  ---*app共享数据源（vuex）*
	+ style  ---*本地样式文件*
	+ theme  ---*element-ui皮肤定制*
	+ tips  ---*页面帮助说明（静态文本）*
	+ utils  ---*app工具函数（包括fetch、debug等）*
	+ views  ---*页面组件*
	+ app.vue  ---*入口组件*
	+ main.js  ---*入口启动脚本*


>#### store(vuex)
>store主要存放eweb全局的状态，其中包含页面自身状态--appModule、路由权限状态--authorityModule、设备信息状态--systemModule
>#### main.js（入口）
>main.js作为程序的入口，包含各个全局插件的应用（vue-router,vue-i18n,element-ui等）以及对vue实例全局变量的绑定（如：$api-api代理，$bus-事件总线，$dev-设备型号，$roles-设备角色列表），loadRoutes--动态路由的注册实现
```
function loadRoutes(next, to) {
  return new Promise((resolve, reject) => {
    if (!store.getters.dynamicRoutes.length) {
      store.dispatch('getDynamicRoute').then(d => {
        router.addRoutes(d)
        next(to.path)
      })
    } else {
      next()
    }
    resolve()
  })
}
```
>#### router
>router作为前端路由模块，包含vue-router的初始化（行为及注册），声明静态路由与动态路由（包含路由的条件行为及权限--roles）
>#### api
>对fetch.js的功能模块化封装（api.js包含全部接口的基础实现，其他文件都是对api.js的功能化封装）


###### 3.3 开发模式&生产模式
　　开发环境针对本地开发配置一系列线上初始化参数及自动登录；
app启动时，如果判断是开发环境，则进行登录login操作，完成后进行动态路由的注册加载，代码如下（登录操作具体见debug.js）：
```
if (dev) {
    login().then(() => {
      loadRoutes(next, to)
    })
  } else {
    loadRoutes(next, to)
  }
  
  //debug.js登陆操作
  export const login = () => {
  if (window.sid) {
    return Promise.resolve()
  }
  return new Promise((resolve, reject) => {
    api
      .auth('login', {
        username: 'admin',
        password: 'admin',
        time: parseInt(Date.now() / 1000)
      })
```
　　生产环境针对线上版本及编译代码目标进行操作，主要配置代码在外层config->index.js文件：
```
const pathConstant = {
//目标基础路径
  proPath: path.join(__dirname, '../../code'),
  //生成目标入口页面路径
  entryPath: 'themes/eweb/luasrc/view/entry.htm',
  //生成目标静态资源路径
  staticPath: 'themes/eweb/htdocs/luci-static/eweb'
}
```
###### 3.4 开发流程
>讲解如何在一个特定菜单下创建一个页面并显示（以Package.vue诊断抓包页面为例）：
- 1、在特定模块下新建一个页面组件-》在views->admin->diagnose下创建Package.vue单页面组件
- 2、在特定模块下新建一个路由-》router->dynamic->diagnose.js下增加对Package.vue的路由引用
```
const Package = () => import(/* webpackChunkName: "group-diagnose" */ '@/views/admin/diagnose/Package')
{
    path: 'diagnose_package',
    name: 'diagnose_package',
    component: Package,
    meta: {
      roles:[],
      t: 'diagnose_package'
    }
  }
```
- 3、后台菜单新增抓包诊断菜单-》后台目录themes->eweb->luasrc->webconfig->menus.json的故障诊断下新增页面菜单
```
{
        "label": "抓包网络",
        "icon": "eweb-star",
        "t": "nav.diagnose_package",
        "path": "/admin/diagnose_package",
        "children": null
      }
```
- 4、刷新页面，左侧菜单就会出现抓包诊断菜单，点击页面主区域就会切换成Package.vue页面

### 4 luci后端
>　　OpenWRT是一个高度模块化、高度自动化的嵌入式Linux系统，拥有强大的网络组件和扩展性,是一个从零开始编写的、功能齐全的、容易修改的路由器操作系统。
>　　首页采用target-template的方式输出（index.lua后端渲染），其他所有的数据请求都是以rpc（原生rpc稍作修改，json数据支持）的方式进行请求交互（api.lua,application/json格式）《由于rpc只支持json格式数据，所以上传文件操作走的是luci通用注册路由的方式（upload.lua）》。
>　　lua接口大体归为两类，一类是对应对设备端接口的统一封装，见cmd.lua文件；一类为用户对设配配置（原生方式）及设备接口的再次封装接口实现，见modules下其他文件
>　　调用设备端接口是需要传递device参数标识着请求的来源，比如：eweb为'pc'，app为'mobile'


###### 4.1 目录
>开发是以一个luci主题的方式进行，在themes下新建一个主题包eweb，编译时menu中选择eweb主题进行编译

- eweb
	- htdocs
		- luci-static   *静态文件夹*
			- eweb   *eweb主题静态文件夹*
	- ipkg
	- luasrc   *lua代码目录*
		- controller   *控制器目录（luci初始化会索引该目录生成节点树）*
			- eweb   *eweb主题控制器目录*
		- modules   *各模块接口及通用rpc接口*
		- utils   *工具模块（debug.lua，jsonrpc.lua）*
		- view   *入口页面及登录认证页面*
		- webconfig   *菜单文件*
	- root
	- Makefile

>后端代码主要存放在luasrc目录底下，对应主题的静态文件及页面文件根据前端代码编译生成至该目录。

###### 4.2 dispatcher流程
1、uhttp接收一个请求，生成一个新的req，然后创建一个httpdispatch协程，轮询执行resume直到协程执行结束

2、执行dispatch操作（设置语言，判断是否已构建路由节点，req.tree,没有则遍历controller目录递归生成tree）
　　2.1 根据请求路径找到对应的tree所在节点，当node.leaf为true时不再向下寻找，整理参数args(传给执行的函数),freq(最全的路径节点)，preq(请求的有效路径)《preq+args=freq》

　　2.2 声明模板引擎

　　2.3 判断当前节点是否需要认证sysauth=true，获取cookie-sysauth值进行认证，不通过如果form-params中存在正确的用户和密码则重新写入sid，以上两步都不通过则直接返回403认证失败。

　　2.4 认证成功，判断node.target的类型进行相应的操作（这里只有入口页面是template,其他的都是走call调用函数方式）

###### 4.3 RPC流程
　　RPC的主要区别是它做注册的treenode不适用template引擎，即node.notemplate=false，借助luci.json.Decoder解析器解析并返回请求的json数据，RPC请求的json数据有一定的格式，包含method键，指明请求所要操作的入口方法，params指明请求的参数：
```
前端请求的数据格式如下：
{
	method:'wireless',
	params:{xxx}
}
```
键值method可以[.]分割，可以调用多层次的方法体，比如cmd.lua文件
```
acConfig = {
    get = function(params)
        params.method = "get"
        return forkCommand("ac_config", params)
    end,
    set = function(params)
        params.method = "set"
        return forkCommand("ac_config", params)
    end,
    clear = function(params)
        params.method = "clear"
        return forkCommand("ac_config", params)
    end
}
```

[ele]: http://element-cn.eleme.io/#/zh-CN "Element-UI"
[vue]: https://cn.vuejs.org/v2/guide/ "vue"
[vuex]:https://vuex.vuejs.org/zh-cn/ "vuex"
[vueRouter]:https://router.vuejs.org/zh-cn/ "vue-router"
[axios]:https://www.kancloud.cn/yunye/axios/234845 "axios"
[webpack]:https://webpack.js.org/guides/getting-started/ "webpack"
[i18n]:http://kazupon.github.io/vue-i18n/en/ "i18n"