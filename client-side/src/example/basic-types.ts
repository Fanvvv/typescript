/*
 * @Author: fan
 * @Date: 2021-07-26 10:41:25
 * @LastEditors: fan
 * @LastEditTime: 2021-07-26 12:32:25
 * @Description: 基础类型
 */
// 数值 number
let number: number = 123
let binaryNumber: number = 0b10011
let octalNumber: number = 0o70135
let hexNumber: number = 0xf005d
console.log(number, binaryNumber, octalNumber, hexNumber);


// 字符串 string
let string: string = 'fan'
console.log(string);


// 布尔值 boolean
let boolean: boolean = true

// 数组 Array
let numberArray: number[] = [1, 2, 3]
let stringArray: string[] = ['1', '2', '3']
let array1: Array<number> = [4, 5, 6]
let array2: (number | string)[] = ['7', 8, '9']
console.log(numberArray, stringArray, array1, array2);

// 元组: 元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
// 通过索引可以得到正确的元素类型
let tuple: [number, string, number]
tuple = [1, 'Fan', 3]
console.log(tuple[0].toString());
console.log(tuple[1].toLowerCase());

// 枚举: 类型是对JavaScript标准数据类型的一个补充
// 可以多数值赋予友好的名字
// 默认从 0 开始，可以自己赋值
enum enumColor {
  Blue,
  Red = 3,
  Green
}
console.log(enumColor.Blue, enumColor.Red, enumColor.Green); // 0 3 4

// any 任意类型
let objectAny: any = {
  x: 0,
  y: '001'
}
objectAny.z = { a: 1 }
objectAny = 100
console.log(objectAny);
let arr3: any[] = [1, '2', 3]
console.log(arr3);

// void 
//某种程度上来说，void 类型像是与 any 类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是 void
function printString(): void {
  console.log('hello typescript');
}
printString()
let undefinedVoid: void = undefined
// undefinedVoid = null // --strictNullChecks 严格空值检查，不能将空值赋给 void

// null & undefined: 和 void相似，它们的本身的类型用处不是很大
let undefinedType: undefined = undefined
let nullType: null = null

// never: 表示的是那些永不存在的值的类型。
function neverFn(message: string): never {
  throw new Error(message)
}
function infiniteLoop(): never {
  while (true) {
  }
}

// object
const getObject = (obj: object): void => {
  console.log(obj);
}

// 类型断言
const getLength = (target: string | number): number => {
  // 在 tsx 中只能使用 as 的形式
  if ((<string>target).length || (target as string).length === 0) {
    return (<string>target).length
  }
  return target.toString().length
}
console.log(getLength('123'));

