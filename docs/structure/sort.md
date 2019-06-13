#乱序

## 新手常用的乱序（实现不了真正的乱序）

```
function shuffle(arr) {
    return arr.sort(() =>Math.random() - 0.5);
}
```

## 添加随机值进行乱序（数组遍历多次性能不好）

```
function shuffle(arr) {
    let newArr = arr.map(item=>({val:item,ram:Math.random()}));
    newArr.sort((a,b)=>a.ram-b.ram);
    arr.splice(0,arr.length,...newArr.map(i=>i.val));
    return arr;
}
```

## 最随机乱序（Fisher–Yates）

```
function shuffle(arr) {
    let m = arr.length;
    while (m > 1){
        let index = Math.floor(Math.random() * m--);
        [arr[m] , arr[index]] = [arr[index] , arr[m]]
    }
    return arr;
}

```

## 乱序测试程序

```
function test_shuffle(shuffleFn) {
  // 多次乱序数组的次数
  let n = 100000; 
  // 乱序的数组
  let originArr=['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  // 保存每个元素在每个位置上出现的次数
  let table = {}
  originArr.forEach(a=>{
    table[a]=Array.from({length:originArr.length}).fill(0)
  })
  for (let i = 0; i < n; i ++) {
      let arr = originArr.slice(0);
      shuffleFn(arr);
      for(let key in table){
        table[key][arr.indexOf(key)]++
      }
  }
  console.table(table);
}

test_shuffle(shuffle)
```
