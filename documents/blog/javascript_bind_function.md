# 手动实现一个 bind 方法
> author: Yongjian Huang
> tags: Java​Script

文章摘要
**********
```
function bind(fun, thisArgs, ...defaultArgs){
	return (...args) => {
  	fun.apply(thisArgs, defaultArgs.concat(args));
  };
}

let o = {
	message: "I'm o"
}

function bFun(arg1, arg2) {
	console.log(this.message, arg1, arg2);
}

bFun('a', 'b');

let aFun1 = bind(bFun, o);
aFun1();
aFun1("c", "d");


let aFun2 = bind(bFun, o, 'defaultA1');
aFun2();
aFun2("e");

Function.prototype.bindx = function(thisArgs, ...defaultArgs) {
	return (...args) => {
  	this.apply(thisArgs, defaultArgs.concat(args));
  };
}

aFun1 = bFun.bindx(o);
aFun1();
aFun1("f", "g");


aFun2 = bFun.bindx(o, 'defaultA2');
aFun2();
aFun2("h");
```
