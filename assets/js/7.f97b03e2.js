(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{101:function(t,e,s){"use strict";s.r(e);var a=s(3),l=s.n(a),i={name:"@cname",f:"@first",l:"@last",full:"@f@l","list|1-10":["@color"]},n={name:"mockjs-edit",data:function(){return{value:JSON.stringify(i,null,4),result:""}},computed:{hasReset:function(){return this.value.replace(/[\r\n\s]/g,"")===JSON.stringify(i).replace(/[\r\n\s]/g,"")}},methods:{_resetData:function(){this.value=JSON.stringify(i,null,4)},_genMockData:function(){try{var t=JSON.parse(this.value||"{}"),e=l.a.mock(t);this.result=JSON.stringify(e,null,4)}catch(t){}}}},c=(s(88),s(0)),o=Object(c.a)(n,(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"mockjs-edit box mt10"},[s("div",{staticClass:"flex-box-item"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],staticClass:"mockjs-edit--edit",attrs:{name:"mockjs",cols:"30",rows:"10",placeholder:"Please enter mockjs template here."},domProps:{value:t.value},on:{input:function(e){e.target.composing||(t.value=e.target.value)}}})]),s("div",{staticClass:"tc mt10",staticStyle:{width:"100%"}},[s("button",{staticClass:"mockjs-edit--tool btn mr10",attrs:{disabled:t.hasReset},on:{click:t._resetData}},[t._v("重置")]),s("button",{staticClass:"mockjs-edit--tool btn",on:{click:t._genMockData}},[t._v("生成")])]),s("div",{staticClass:"flex-box-item"},[s("pre",{staticClass:"mockjs-edit--view"},[t._v(t._s(t.result))])])])}),[],!1,null,null,null);e.default=o.exports},77:function(t,e,s){},88:function(t,e,s){"use strict";var a=s(77);s.n(a).a}}]);