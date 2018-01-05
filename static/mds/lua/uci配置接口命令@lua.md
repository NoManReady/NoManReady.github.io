## UCI

### uci 为 shell 命令的分装器，对 openwrt 设备配置选项进行统一的管理

---

## LUCI

### luci 作为 openwrt 的 web 管理框架

---

## uci 常用操作

### 1、获取 option

```
uci:get("config", "sectionname", "option")
```

### 2、设置 option

```
uci:set("config", "sectionname", "option", "value")
```

### 3、删除 option

```
uci:delete("config", "sectionname", "option")
```

### 4、删除 section

```
uci:delete("config", "sectionname")
```

### 5、添加匿名的 typeSection，返回 sectionName

```
uci:add("config", "type")
```

### 6、添加一个命名的 typeSection

```
uci:set("config","name", "type")
```

### 7、遍历 config 中类型为 type 的 section(返回 false 会终止遍历)

```
uci:foreach("config","type",function(s)...end)
```

### 8、移动指定名称的 section 到指定位置（从 0 开始）

```
uci:reorder("config","sectionname","position")
```

### 9、回滚 config 中还未提交（commit）的改变

```
uci:revert("config")
```

### 10、提交 config

```
uci:commit("config")
```

---

## luci 对 uci 的一些扩展

> local uci=require("luci.model.uci").cursor()
