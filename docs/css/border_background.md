# 边框&背景

[You need know css][ynkc]

## 半透明边框
相关css属性：
+ [background-clip][clip]

```
如果没有设置背景图片（background-image）或背景颜色（background-color），那么这个属性只有在边框（ border）被设置为非固实（soild）、透明或半透明时才能看到视觉效果（与 border-style 或 border-image 有关），否则，本属性产生的样式变化会被边框覆盖。
```

```
border: 10px dashed rgba($borderColor, 0.5);
background-clip: padding-box;
```

<css-border_bg-t_border/>

## 多边框&内圆

相关css属性：
+ [box-shadow][shadow] 
+ [outline][outline] 
+ [outline-offset(IE不支持)][outline-offset]

```
.shadow{
  box-shadow: red 0px 0px 0px 10px, green 0px 0px 0px 20px, blue 0px 0px 0px 30px;
}

.outline{
  width: 200px; height: 120px;
  background: #efebe9;
  border: 5px solid #B4A078;
  outline: #B4A078 dashed 1px;
  outline-offset: -10px;
  margin-bottom: 20px;
}

.inner-round{
  box-shadow: 0 0 0 5px gray;
  outline: 6px solid gray;
  border-radius: 5px;
}
```
<css-border_bg-mutil_border/>

## 渐变

<css-border_bg-gradient/>

## 旋转头像

<css-border_bg-turn_avatar/>

[clip]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-clip'

[shadow]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow'

[outline]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline'

[outline-offset]: https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-offset 'https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-offset'


[ynkc]: https://lhammer.cn/You-need-to-know-css 'https://lhammer.cn/You-need-to-know-css'
