(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{54:function(e,a,t){"use strict";t.r(a);var n=t(0),r=Object(n.a)({},function(){this.$createElement;this._self._c;return this._m(0)},[function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"content"},[t("h1",{attrs:{id:"eweb项目结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#eweb项目结构","aria-hidden":"true"}},[e._v("#")]),e._v(" Eweb项目结构")]),t("hr"),t("h2",{attrs:{id:"概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概述","aria-hidden":"true"}},[e._v("#")]),e._v(" 概述")]),t("pre",[t("code",[e._v("简要介绍易网络web前端代码框架及ow-luci框架及开发流程\n")])]),t("h2",{attrs:{id:"规范"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#规范","aria-hidden":"true"}},[e._v("#")]),e._v(" 规范")]),t("h4",{attrs:{id:"命名："}},[t("a",{staticClass:"header-anchor",attrs:{href:"#命名：","aria-hidden":"true"}},[e._v("#")]),e._v(" 命名：")]),t("ul",[t("li",[e._v("vue组件->首字母大写的驼峰：比如Package.vue（每个组件name属性标识组件所在模块名称及组件名称，组件模板类名响应的以小写单词标识，多个单词以中横线分开，如：name:‘DiagnosePackage’->class:diagnose-package）;")]),t("li",[e._v("全局静态->大写单词，多单词以下横线分开，如：const APP_STATUS=1")]),t("li",[e._v("局部变量->以下横线开头首字母小写的驼峰，如：let _count=0，local _lua=‘xxx’")]),t("li",[e._v("css->小写单词，多单词以中横线分开，如：box-tit")])]),t("h4",{attrs:{id:"路由及菜单"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#路由及菜单","aria-hidden":"true"}},[e._v("#")]),e._v(" 路由及菜单")]),t("ul",[t("li",[e._v("路由->path,name,t都是以下横线分开的多个单词，如：")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("{\n    path: 'diagnose_package',\n    name: 'diagnose_package',\n    component: Package,\n    meta: {\n      roles:[],\n      t: 'diagnose_package'\n    }\n  }\n")])]),t("ul",[t("li",[e._v("菜单->格式如下：")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('{\n    "label": "故障诊断",\n    "icon": "eweb-diagnosis",\n    "t": "nav.diagnose",\n    "children": [\n      {\n        "label": "抓包网络",\n        "icon": "eweb-star",\n        "t": "nav.diagnose_package",\n        "path": "/admin/diagnose_package",\n        "roles": [],\n        "children": null\n      }\n}\n')])]),t("ul",[t("li",[e._v("国际化->以模块划分，多层级对象展示，如：")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("{\n  author: 'NoManready',\n  brand: 'EG',\n  header: {\n    guide: '快速配置',\n    logout: '注销',\n    lang: 'English'\n  },\n  nav: {\n    notfound: '404',\n    quickset: '快速配置',\n    // 首页\n    home: '首页',\n    home_overview: '运行状态'\n   }\n}\n")])]),t("h2",{attrs:{id:"web前端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#web前端","aria-hidden":"true"}},[e._v("#")]),e._v(" web前端")]),t("h4",{attrs:{id:"3-1-框架介绍"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#3-1-框架介绍","aria-hidden":"true"}},[e._v("#")]),e._v(" 3.1 框架介绍")]),t("p",[e._v("web前端采用vue全家桶进行单页面web开发（"),t("a",{attrs:{href:"https://webpack.js.org/guides/getting-started/",title:"webpack",target:"_blank",rel:"noopener noreferrer"}},[e._v("webpack")]),e._v("+"),t("a",{attrs:{href:"https://cn.vuejs.org/v2/guide/",title:"vue",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue2.0")]),e._v("+"),t("a",{attrs:{href:"https://vuex.vuejs.org/zh-cn/",title:"vuex",target:"_blank",rel:"noopener noreferrer"}},[e._v("vuex")]),e._v("+"),t("a",{attrs:{href:"https://router.vuejs.org/zh-cn/",title:"vue-router",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-router")]),e._v("+"),t("a",{attrs:{href:"https://www.kancloud.cn/yunye/axios/234845",title:"axios",target:"_blank",rel:"noopener noreferrer"}},[e._v("axios")]),e._v("+"),t("a",{attrs:{href:"http://element-cn.eleme.io/#/zh-CN",title:"Element-UI",target:"_blank",rel:"noopener noreferrer"}},[e._v("element-ui")]),e._v("等）；app采用"),t("a",{attrs:{href:"http://element-cn.eleme.io/#/zh-CN",title:"Element-UI",target:"_blank",rel:"noopener noreferrer"}},[e._v("element-ui")]),e._v("为前端UI框架，"),t("a",{attrs:{href:"http://kazupon.github.io/vue-i18n/en/",title:"i18n",target:"_blank",rel:"noopener noreferrer"}},[e._v("vue-i18n")]),e._v("作为国际化处理方式。前端数据请求以application/json格式提交。")]),t("h4",{attrs:{id:"3-2-目录结构"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#3-2-目录结构","aria-hidden":"true"}},[e._v("#")]),e._v(" 3.2 目录结构")]),t("pre",[t("code",[e._v("代码目录以功能结构划分。\n")])]),t("ul",[t("li",[e._v("src\n"),t("ul",[t("li",[e._v("api  —"),t("em",[e._v("后台接口（去中心化）")])]),t("li",[e._v("assets  —"),t("em",[e._v("app资源文件")])]),t("li",[e._v("common  —"),t("em",[e._v("通用组件")])]),t("li",[e._v("components  —"),t("em",[e._v("通用业务组件")])]),t("li",[e._v("config  —"),t("em",[e._v("app全局配置文件（移至外层config文件）")])]),t("li",[e._v("directives  —"),t("em",[e._v("指令目录")])]),t("li",[e._v("fiters  —"),t("em",[e._v("过滤器")])]),t("li",[e._v("lang  —"),t("em",[e._v("国际化目录（去中心化）")])]),t("li",[e._v("layout  —"),t("em",[e._v("app结构布局")])]),t("li",[e._v("libs  —"),t("em",[e._v("第三方插件")])]),t("li",[e._v("mixins  —"),t("em",[e._v("公用混合目录")])]),t("li",[e._v("model  —"),t("em",[e._v("web端数据模型（去中心化）")])]),t("li",[e._v("plugins  —"),t("em",[e._v("vue插件")])]),t("li",[e._v("router  —"),t("em",[e._v("路由目录（去中心化）")])]),t("li",[e._v("store  —"),t("em",[e._v("app共享数据源（vuex）")])]),t("li",[e._v("style  —"),t("em",[e._v("本地样式文件")])]),t("li",[e._v("theme  —"),t("em",[e._v("element-ui皮肤定制")])]),t("li",[e._v("tips  —"),t("em",[e._v("页面帮助说明（静态文本）")])]),t("li",[e._v("utils  —"),t("em",[e._v("app工具函数（包括fetch、debug等）")])]),t("li",[e._v("views  —"),t("em",[e._v("页面组件")])]),t("li",[e._v("app.vue  —"),t("em",[e._v("入口组件")])]),t("li",[e._v("main.js  —"),t("em",[e._v("入口启动脚本")])])])])]),t("blockquote",[t("h3",{attrs:{id:"store-vuex"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#store-vuex","aria-hidden":"true"}},[e._v("#")]),e._v(" store(vuex)")]),t("p",[e._v("store主要存放eweb全局的状态，其中包含页面自身状态–appModule、路由权限状态–authorityModule、设备信息状态–systemModule")]),t("h3",{attrs:{id:"main-js（入口）"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#main-js（入口）","aria-hidden":"true"}},[e._v("#")]),e._v(" main.js（入口）")]),t("p",[e._v("main.js作为程序的入口，包含各个全局插件的应用（vue-router,vue-i18n,element-ui等）以及对vue实例全局变量的绑定（如：$api-api代理，$bus-事件总线，$dev-设备型号，$roles-设备角色列表），loadRoutes–动态路由的注册实现")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("function loadRoutes(next, to) {\n  return new Promise((resolve, reject) => {\n    if (!store.getters.dynamicRoutes.length) {\n      store.dispatch('getDynamicRoute').then(d => {\n        router.addRoutes(d)\n        next(to.path)\n      })\n    } else {\n      next()\n    }\n    resolve()\n  })\n}\n")])]),t("blockquote",[t("h4",{attrs:{id:"router"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#router","aria-hidden":"true"}},[e._v("#")]),e._v(" router")]),t("p",[e._v("router作为前端路由模块，包含vue-router的初始化（行为及注册），声明静态路由与动态路由（包含路由的条件行为及权限–roles）")]),t("h4",{attrs:{id:"api"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#api","aria-hidden":"true"}},[e._v("#")]),e._v(" api")]),t("p",[e._v("对fetch.js的功能模块化封装（api.js包含全部接口的基础实现，其他文件都是对api.js的功能化封装）")])]),t("h6",{attrs:{id:"3-3-开发模式-生产模式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#3-3-开发模式-生产模式","aria-hidden":"true"}},[e._v("#")]),e._v(" 3.3 开发模式&生产模式")]),t("p",[e._v("开发环境针对本地开发配置一系列线上初始化参数及自动登录；\napp启动时，如果判断是开发环境，则进行登录login操作，完成后进行动态路由的注册加载，代码如下（登录操作具体见debug.js）：")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("if (dev) {\n    login().then(() => {\n      loadRoutes(next, to)\n    })\n  } else {\n    loadRoutes(next, to)\n  }\n  \n  //debug.js登陆操作\n  export const login = () => {\n  if (window.sid) {\n    return Promise.resolve()\n  }\n  return new Promise((resolve, reject) => {\n    api\n      .auth('login', {\n        username: 'admin',\n        password: 'admin',\n        time: parseInt(Date.now() / 1000)\n      })\n")])]),t("p",[e._v("生产环境针对线上版本及编译代码目标进行操作，主要配置代码在外层config->index.js文件：")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const pathConstant = {\n//目标基础路径\n  proPath: path.join(__dirname, '../../code'),\n  //生成目标入口页面路径\n  entryPath: 'themes/eweb/luasrc/view/entry.htm',\n  //生成目标静态资源路径\n  staticPath: 'themes/eweb/htdocs/luci-static/eweb'\n}\n")])]),t("h6",{attrs:{id:"3-4-开发流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#3-4-开发流程","aria-hidden":"true"}},[e._v("#")]),e._v(" 3.4 开发流程")]),t("blockquote",[t("p",[e._v("讲解如何在一个特定菜单下创建一个页面并显示（以Package.vue诊断抓包页面为例）：")])]),t("ul",[t("li",[e._v("1、在特定模块下新建一个页面组件-》在views->admin->diagnose下创建Package.vue单页面组件")]),t("li",[e._v("2、在特定模块下新建一个路由-》router->dynamic->diagnose.js下增加对Package.vue的路由引用")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const Package = () => import(/* webpackChunkName: \"group-diagnose\" */ '@/views/admin/diagnose/Package')\n{\n    path: 'diagnose_package',\n    name: 'diagnose_package',\n    component: Package,\n    meta: {\n      roles:[],\n      t: 'diagnose_package'\n    }\n  }\n")])]),t("ul",[t("li",[e._v("3、后台菜单新增抓包诊断菜单-》后台目录themes->eweb->luasrc->webconfig->menus.json的故障诊断下新增页面菜单")])]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('{\n        "label": "抓包网络",\n        "icon": "eweb-star",\n        "t": "nav.diagnose_package",\n        "path": "/admin/diagnose_package",\n        "children": null\n      }\n')])]),t("ul",[t("li",[e._v("4、刷新页面，左侧菜单就会出现抓包诊断菜单，点击页面主区域就会切换成Package.vue页面")])]),t("h2",{attrs:{id:"luci后端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#luci后端","aria-hidden":"true"}},[e._v("#")]),e._v(" luci后端")]),t("blockquote",[t("p",[e._v("OpenWRT是一个高度模块化、高度自动化的嵌入式Linux系统，拥有强大的网络组件和扩展性,是一个从零开始编写的、功能齐全的、容易修改的路由器操作系统。\n　　首页采用target-template的方式输出（index.lua后端渲染），其他所有的数据请求都是以rpc（原生rpc稍作修改，json数据支持）的方式进行请求交互（api.lua,application/json格式）《由于rpc只支持json格式数据，所以上传文件操作走的是luci通用注册路由的方式（upload.lua）》。\n　　lua接口大体归为两类，一类是对应对设备端接口的统一封装，见cmd.lua文件；一类为用户对设配配置（原生方式）及设备接口的再次封装接口实现，见modules下其他文件\n　　调用设备端接口是需要传递device参数标识着请求的来源，比如：eweb为’pc’，app为’mobile’")])]),t("h4",{attrs:{id:"4-1-目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#4-1-目录","aria-hidden":"true"}},[e._v("#")]),e._v(" 4.1 目录")]),t("blockquote",[t("p",[e._v("开发是以一个luci主题的方式进行，在themes下新建一个主题包eweb，编译时menu中选择eweb主题进行编译")])]),t("ul",[t("li",[e._v("eweb\n"),t("ul",[t("li",[e._v("htdocs\n"),t("ul",[t("li",[e._v("luci-static   "),t("em",[e._v("静态文件夹")]),t("ul",[t("li",[e._v("eweb   "),t("em",[e._v("eweb主题静态文件夹")])])])])])]),t("li",[e._v("ipkg")]),t("li",[e._v("luasrc   "),t("em",[e._v("lua代码目录")]),t("ul",[t("li",[e._v("controller   "),t("em",[e._v("控制器目录（luci初始化会索引该目录生成节点树）")]),t("ul",[t("li",[e._v("eweb   "),t("em",[e._v("eweb主题控制器目录")])])])]),t("li",[e._v("modules   "),t("em",[e._v("各模块接口及通用rpc接口")])]),t("li",[e._v("utils   "),t("em",[e._v("工具模块（debug.lua，jsonrpc.lua）")])]),t("li",[e._v("view   "),t("em",[e._v("入口页面及登录认证页面")])]),t("li",[e._v("webconfig   "),t("em",[e._v("菜单文件")])])])]),t("li",[e._v("root")]),t("li",[e._v("Makefile")])])])]),t("blockquote",[t("p",[e._v("后端代码主要存放在luasrc目录底下，对应主题的静态文件及页面文件根据前端代码编译生成至该目录。")])]),t("h4",{attrs:{id:"4-2-dispatcher流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#4-2-dispatcher流程","aria-hidden":"true"}},[e._v("#")]),e._v(" 4.2 dispatcher流程")]),t("p",[e._v("1、uhttp接收一个请求，生成一个新的req，然后创建一个httpdispatch协程，轮询执行resume直到协程执行结束")]),t("p",[e._v("2、执行dispatch操作（设置语言，判断是否已构建路由节点，req.tree,没有则遍历controller目录递归生成tree）\n　　2.1 根据请求路径找到对应的tree所在节点，当node.leaf为true时不再向下寻找，整理参数args(传给执行的函数),freq(最全的路径节点)，preq(请求的有效路径)《preq+args=freq》")]),t("p",[e._v("2.2 声明模板引擎")]),t("p",[e._v("2.3 判断当前节点是否需要认证sysauth=true，获取cookie-sysauth值进行认证，不通过如果form-params中存在正确的用户和密码则重新写入sid，以上两步都不通过则直接返回403认证失败。")]),t("p",[e._v("2.4 认证成功，判断node.target的类型进行相应的操作（这里只有入口页面是template,其他的都是走call调用函数方式）")]),t("h4",{attrs:{id:"4-3-rpc流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#4-3-rpc流程","aria-hidden":"true"}},[e._v("#")]),e._v(" 4.3 RPC流程")]),t("p",[e._v("RPC的主要区别是它做注册的treenode不适用template引擎，即node.notemplate=false，借助luci.json.Decoder解析器解析并返回请求的json数据，RPC请求的json数据有一定的格式，包含method键，指明请求所要操作的入口方法，params指明请求的参数：")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("前端请求的数据格式如下：\n{\n\tmethod:'wireless',\n\tparams:{xxx}\n}\n")])]),t("p",[e._v("键值method可以[.]分割，可以调用多层次的方法体，比如cmd.lua文件")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('acConfig = {\n    get = function(params)\n        params.method = "get"\n        return forkCommand("ac_config", params)\n    end,\n    set = function(params)\n        params.method = "set"\n        return forkCommand("ac_config", params)\n    end,\n    clear = function(params)\n        params.method = "clear"\n        return forkCommand("ac_config", params)\n    end\n}\n')])])])}],!1,null,null,null);a.default=r.exports}}]);