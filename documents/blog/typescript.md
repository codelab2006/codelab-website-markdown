# TypeScript 速查手册
> author: Yongjian Huang
> tags: TypeScript

文章摘要
**********
## Basic Types
```
let isDone: boolean = true;
```
```
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```
```
let color: string = 'blue';
color = 'red';
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`
```
```
let list: number[] = [1,2,3];
let list: Array<number> = [1,2,3];
```
```
let x: [string, number];
x = ['Hello', 100];
```
```
enum Color {Red = 100, Green = 200, Blue}
let c: Color = Color.Red
```
```
let notSure: any = 4;
notSure = 'string';
notSure = true;
```
```
function warnUser(): void {
    console.log("This is my warning message");
}
let unusable: void;
unusable = undefined;
unusable = null;
```
```
let u1: undefined = undefined;
let u2: undefined = null;

let n1: null = null;
let n2: null = undefined;

However, when using the --strictNullChecks flag, null and undefined are only assignable to void and their respective types. This helps avoid many common errors. In cases where you want to pass in either a string or null or undefined, you can use the union type string | null | undefined

As a note: we encourage the use of --strictNullChecks when possible.
```
```
function error(message: string): never {
    throw new Error(message);
}
function fail() {
    return error("Something failed");
}
function infiniteLoop(): never {
    while (true) {}
}
```
```
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;
// the other is the as-syntax
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
## Variable Declarations
```
let input = [1,2];
let [first,second] = input;
[first, second] = [second, first];

function f([first, second]: [number, number]) {
    console.log(first);
    console.log(second);
}
f([1,2]);

let [first, ...rest] = [1,2,3,4,5];
console.log(first); // outputs 1
console.log(rest); // outputs [ 2, 3, 4, 5 ]

let o = {
    a: "foo",
    b: 12,
    c: "bar"
};
let { a, b } = o;
let { a, ...passthrough } = o;

let { a, b }: { a: string, b: number } = o;

function keepWholeObject(wholeObject: { a: string, b?: number }) {
    let { a, b = 1001 } = wholeObject;
}

type C = { a: string, b?: number }
function f({ a, b }: C): void {
    // ...
}

function f({ a = "", b = 0 } = {}): void {
    // ...
}
f();

let first = [1, 2];
let second = [3, 4];
let bothPlus = [0, ...first, ...second, 5];

let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { ...defaults, food: "rich" };
let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
let search = { food: "rich", ...defaults };
```
## Interfaces
```

```
