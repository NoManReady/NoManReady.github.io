(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{73:function(t,s,i){},83:function(t,s,i){"use strict";var e=i(73);i.n(e).a},96:function(t,s,i){"use strict";i.r(s);var e={name:"mutil-border",data:function(){return{shadows:["0 0 0 10px red","0 0 0 20px green","0 0 0 30px blue","0 0 0 40px pink","0 0 0 50px yellow","0 0 0 60px white"],step:5}},computed:{styl:function(){return{"box-shadow":this.shadows.slice(0,this.step).join(",")}}},methods:{_add:function(t){this.step<this.shadows.length?this.step++:this.step=0}}},n=(i(83),i(0)),a=Object(n.a)(e,(function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"box"},[s("div",[s("div",{staticClass:"shadow",style:this.styl,on:{click:this._add}},[s("span",{staticStyle:{"margin-top":"19px",display:"inline-block"}},[this._v("点我")])])]),this._m(0),this._m(1)])}),[function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("div",{staticClass:"outline"},[this._v("outline")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",[s("div",{staticClass:"inner-round"},[this._v("inner-round")])])}],!1,null,"46c0fcf5",null);s.default=a.exports}}]);