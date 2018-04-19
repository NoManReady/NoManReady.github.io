# 高性能 lua

## 用 local 声明变量

> lua5.0 后 lua 采用寄存器式的模式，声明的 locla 变量都会存储在寄存器中

```
//声明local时产生的伪指令（a=a+b）：
//a是寄存器0 b是寄存器1
ADD 0 1
//若没有声明local即默认global变量产生的伪指令：
GETGLOBAL    0 0    ;get a
GETGLOBAL    1 1    ;get b
ADD          0 1    ;do add
SETGLOBAL    0 1    ;set a
```

所以声明 lua 变量时尽量用 local 声明变量的作用域，下面为测试结果：

```
//每次调用全局的math.sin
a = os.clock()
for i = 1,10000000 do
  local x = math.sin(i)
end
b = os.clock()
print(b-a)

//每次调用局部的math.sin
a = os.clock()
local sin=math.sin
for i = 1,10000000 do
  local x = sin(i)
end
b = os.clock()
print(b-a)
```

### global

![global](/img/global.png)

### local

![local](/img/local.png)

## 预填充 table

表在 Lua 中使用十分频繁，因为表几乎代替了 Lua 的所有容器。所以快速了解一下 Lua 底层是如何实现表，对我们编写 Lua 代码是有好处的。

Lua 的表分为两个部分：数组(array)部分和哈希(hash)部分。数组部分包含所有从 1 到 n 的整数键，其他的所有键都储存在哈希部分中。

哈希部分其实就是一个哈希表，哈希表本质是一个数组，它利用哈希算法将键转化为数组下标，若下标有冲突(即同一个下标对应了两个不同的键)，则它会将冲突的下标上创建一个链表，将不同的键串在这个链表上，这种解决冲突的方法叫做：链地址法。

当我们把一个新键值赋给表时，若数组和哈希表已经满了，则会触发一个再哈希(rehash)。再哈希的代价是高昂的。首先会在内存中分配一个新的长度的数组，然后将所有记录再全部哈希一遍，将原来的记录转移到新数组中。新哈希表的长度是最接近于所有元素数目的 2 的乘方。

```
//以下代码执行时间为1.53秒：
a = os.clock()
for i = 1,2000000 do
    local a = {}
    a[1] = 1; a[2] = 2; a[3] = 3
end
b = os.clock()
print(b-a)  --1.528293

//如果我们在创建表的时候就填充好它的大小，则只需要0.75秒，一倍的效率提升！
a = os.clock()
for i = 1,2000000 do
    local a = {1,1,1}
    a[1] = 1; a[2] = 2; a[3] = 3
end
b = os.clock()
print(b-a)  --0.746453
```

* 所以，当需要创建非常多的小 size 的表时，应预先填充好表的大小。

## lua 字符串

第一，所有的字符串在 Lua 中都只储存一份拷贝。当新字符串出现时，Lua 检查是否有其相同的拷贝，若没有则创建它，否则，指向这个拷贝。这可以使得字符串比较和表索引变得相当的快，因为比较字符串只需要检查引用是否一致即可；但是这也降低了创建字符串时的效率，因为 Lua 需要去查找比较一遍。

第二，所有的字符串变量，只保存字符串引用，而不保存它的 buffer。这使得字符串的赋值变得十分高效。例如在 Perl 中，$x = $y，会将$y 的 buffer 整个的复制到$x 的 buffer 中，当字符串很长时，这个操作的代价将十分昂贵。而在 Lua，同样的赋值，只复制引用，十分的高效。

```
//在Lua中，以下代码将花费6.65秒：

a = os.clock()
local s = ''
for i = 1,300000 do
    s = s .. 'a'
end
b = os.clock()
print(b-a)  --6.649481
//我们可以用table来模拟buffer，下面的代码只需花费0.72秒，9倍多的效率提升：

a = os.clock()
local s = ''
local t = {}
for i = 1,300000 do
    t[#t + 1] = 'a'
end
s = table.concat( t, '')
b = os.clock()
print(b-a)  --0.07178
```

* 所以：在大字符串连接中，我们应避免..。应用 table 来模拟 buffer，然后 concat 得到最终字符串。

[文章地址](http://wuzhiwei.net/lua_performance/)
