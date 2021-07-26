/*
 * @Author: fan
 * @Date: 2021-07-26 12:43:00
 * @LastEditors: fan
 * @LastEditTime: 2021-07-26 23:43:09
 * @Description: symbol
 */

// 基础
// 可以通过 Symbol 构造函数来创建
let symbol1 = Symbol()
let symbol2 = Symbol("key")
let symbol3 = Symbol("key");
console.log(symbol1, symbol2);
console.log(symbol2 === symbol3); // false  symbol是唯一的

// 作为属性名
// symbolObject[symbolKey] 报错：symbol类型不能作为索引类型使用
// 使用 unique symbol 类型来处理这个问题，unique symbol表示明确地只和一个symbol关联的类型。
const symbolKey: unique symbol = Symbol('key');
let symbolObject = {
  [symbolKey]: "value",
  name: 'fan',
  age: 18
}
console.log(symbolObject[symbolKey]);

// 属性名的遍历
for (const key in symbolObject) {
  console.log(key);
}
console.log(Object.keys(symbolObject));
console.log(Object.getOwnPropertyNames(symbolObject));
console.log(JSON.stringify(symbolObject));
// 前面四种遍历属性名的方法都不能获取到 symbol 类型的属性名
// 我们有两种方法可以遍历到 symbol 类型
console.log(Object.getOwnPropertySymbols(symbolObject));
console.log(Reflect.ownKeys(symbolObject));

// Symbol.for & Symbol.keyfor
// Symbol.for 从运行时的 symbol 注册表中找到对应的 symbol，如果找到了，则返回它，否则，新建一个与该键关联的 symbol，并放入全局 symbol 注册表中。
// Symbol.keyfor 用来获取全局 symbol 注册表中与某个 symbol 关联的键
let symbol4 = Symbol('fan')
let symbol5 = Symbol('fan')
console.log(symbol4 === symbol5); // false

let symbol6 = Symbol.for('fan')
let symbol7 = Symbol.for('fan')
console.log(symbol6 === symbol7); // true
// symbol4 不是全局的 symbol6 是全局的
console.log(Symbol.keyFor(symbol4));  // undefined
console.log(Symbol.keyFor(symbol6));  // fan

// 11 个内置 Symbol 值
// 1. Symbol.hasInstance 方法，会被instanceof运算符调用。构造器对象用来识别一个对象是否是其实例。
let symbolObject1 = {
  [Symbol.hasInstance](value: any) {
    console.log(value);
  }
}
console.log({ name: 'fan' } instanceof <any>symbolObject1);

// 2. Symbol.isConcatSpreadable 布尔值，表示当在一个对象上调用Array.prototype.concat时，这个对象的数组元素是否可展开。
let symbolArray1 = [1, 2, 3]
console.log(symbolArray1.concat([4, 5, 6]));
(symbolArray1 as any)[Symbol.isConcatSpreadable] = false
console.log(symbolArray1.concat([4, 5, 6]));

// 3. Symbol.species 函数值，为一个构造函数。用来创建衍生对象。
class symbolClass extends Array {
  constructor(...args: any[]) {
    super(...args)
  }
  static get [Symbol.species]() {
    return Array
  }
  getName() {
    console.log('fan');
  }
}
let symbolC = new symbolClass(1, 2, 3)
let classMap = symbolC.map(item => {
  console.log(item);
  return item + 1
})
console.log(classMap);
console.log(classMap instanceof Array); // true
// 在 js 中，如果没有使用 Symbol.species 函数，是会返回 true 的，与 ts 有一点区别
console.log(classMap instanceof symbolClass); // false

// 4. Symbol.match()
// 5. Symbol.split()
// 6. Symbol.replace()
// 7. Symbol.search()
let symbolObject2: unknown = {
  [Symbol.match](string: string) {
    console.log(string.length);
  },
  [Symbol.split](string: string) {
    console.log(string.length);
  },
  [Symbol.replace](string: string) {
    console.log(string.length);
  },
  [Symbol.search](string: string) {
    console.log(string.length);
  }
}
console.log('abc'.match(<RegExp>symbolObject2));
console.log('abcd'.split(<any>symbolObject2));
console.log('abcde'.replace(<RegExp>symbolObject2, 'a'));
console.log('abcdef'.search(<RegExp>symbolObject2));

// 8. Symbol.iterator 方法，被for-of语句调用。返回对象的默认迭代器。

// 9. Symbol.toPrimitive 方法，被ToPrimitive抽象操作调用。把对象转换为相应的原始值。
let symbolObject3: unknown = {
  [Symbol.toPrimitive](type: any) {
    console.log(type);
  }
}
// const symbolResult1 = (symbolObject3 as number)++ // number
const symbolResult2 = `fan${symbolObject3}` // default 和 js 是有区别的， js 打印的类型是 string

// 10. Symbol.toStringTag 方法，也可以是属性值。被内置方法Object.prototype.toString调用。返回创建对象时默认的字符串描述。
let symbolObject4 = {
  // [Symbol.toStringTag]: 'fan'
  get [Symbol.toStringTag]() {
    return 'fan'
  }
}
console.log(symbolObject4.toString()); // [object fan]

// 11. Symbol.unscopables 对象，它自己拥有的属性会被with作用域排除在外。
let symbolObject5 = {
  x: 12,
  y: 28
}
console.log(Array.prototype[Symbol.unscopables]); // 这个对象中的属性是使用 with 获取不到的，但可以使用其他方法获取，比如过滤器 filter

