# 继承与原型链
> author: Yongjian Huang
> tags: Javascript

文章摘要
**********
function A() {}
A.prototype.methodA = function() {console.log('method A')}

function _() {}
_.prototype = A.prototype

function B() {}
B.prototype = new _();
B.prototype.constructor = B;
B.prototype.methodB = function() {console.log('method B')}
