# Java​Script 速查手册
> author: Yongjian Huang
> tags: Java​Script

文章摘要
**********
## let 和 const 命令
`let` 命令用来声明变量，没有变量提升，支持块级作用域，不允许重复声明。

`const` 命令用来声明常量，没有变量提升，支持块级作用域，不允许重复声明。常量自身不能发生变化，但是它引用的对象可以发生变化。如果要冻结一个对象可以使用 `Object.freeze` 方法。完整的冻结一个对象可以使用递归方式：
```
function freeze (obj) {
    Object.freeze(obj)
    Object.keys(obj).forEach((key, i) => {
        if (typeof obj[key] === 'object') {
            freeze(obj[key])
        }
    })
}
```
## 变量的解构赋值
### 数组的结构赋值
```
let [a, b, c] = [1, 2, 3]
let [a, b, [c]] = [1, 2, [3]]
let [head, ...tail] = [1, 2, 3, 4]
let [a = true] = [] // 可以指定默认值
```
对于 Set 结构，也可以使用数组的解构赋值。事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值。
### 对象的解构赋值
```
let { fieldA, fieldB } = { fieldA: 'A', fieldB: 'B' }
let { alias: fieldA } = { alias: 'A' } // fieldA: 'A'
let { fieldA = 'AA', fieldB = 'BB' } = { fieldA: 'A' } // 可以指定默认值
```
### 字符串的解构赋值
```
let [a, b, c, d, e] = 'Hello'
```
## 新的原始数据类型Symbol
JavaScript 语言的七种数据类型，undefined、null、boolean、string、number、object、symbol。
正确的获取类型信息：
```
Object.prototype.toString.call(undefined)
"[object Undefined]"

Object.prototype.toString.call(null)
"[object Null]"

Object.prototype.toString.call(true)
"[object Boolean]"

Object.prototype.toString.call('')
"[object String]"

Object.prototype.toString.call(0)
"[object Number]"

Object.prototype.toString.call({})
"[object Object]"
Object.prototype.toString.call([])
"[object Array]"
Object.prototype.toString.call(() => {})
"[object Function]"

Object.prototype.toString.call(Symbol())
"[object Symbol]"
```
`Symbol` 表示独一无二的值。
```
let s0 = Symbol('s0') // 创建一个 Symbol，接受字符串参数，表示实例的描述
let s0 = Symbol('s0') // 创建一个 Symbol，接受字符串参数，表示实例的描述
let s0 = Symbol('s0') // 创建一个 Symbol，接受字符串参数，表示实例的描述
let s1 = Symbol('s1')
let s2 = Symbol('s2')
s2.description // 属性 description，直接返回 Symbol 的描述：s2

Symbol.for('s3') // 创建一个 Symbol
Symbol.for('s3') // 返回之前创建的 Symbol
Symbol.for('s3') // 返回之前创建的 Symbol
```
Symbol.for() 与 Symbol() 这两种写法，都会生成新的 Symbol。它们的区别是，前者会被登记在全局环境中供搜索，后者不会。Symbol.for() 不会每次调用就返回一个新的 Symbol 类型的值，而是会先检查给定的 key 是否已经存在，如果不存在才会新建一个值。比如，如果你调用 Symbol.for("cat") 30 次，每次都会返回同一个 Symbol 值，但是调用 Symbol("cat") 30 次，会返回 30 个不同的 Symbol 值。
```
let ss = Symbol.for("key");
Symbol.keyFor(ss) // "key"
```
