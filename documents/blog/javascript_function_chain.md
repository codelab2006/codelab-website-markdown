# 手动实现一个方法链式调用
> author: Yongjian Huang
> tags: Java​Script

文章摘要
**********
```
function fun(n) {
  let ns = [];
  ns.push(n);
  return {
    fun(n) {
      ns.push(n);
      return this;
    },
    sum() {
      return ns.reduce((a, b) => a + b, 0);
    }
  };
}
console.log(fun(1).fun(2).fun(3).sum())
```
