/*
 * @Author: fan
 * @Date: 2021-07-29 14:16:02
 * @LastEditors: fan
 * @LastEditTime: 2021-07-29 19:00:23
 * @Description: 泛型 generics
 */
// 简单使用
// function getArray(value: number, length: number = 5): any[] {
//   return new Array(length).fill(value)
// }
// console.log(getArray(5, 6));
function getArray<T>(value: T, length: number = 5): T[] {
  return new Array(length).fill(value)
}
console.log(getArray<number>(5, 6).map(item => item.toString()));
console.log(getArray<string>('abc', 3).map(item => item.toUpperCase()));

// 泛型变量
function getTuple<T, U>(param1: T, param2: U, length: number = 5): [T, U][] {
  return new Array(length).fill([param1, param2])
}
console.log(getTuple('fan', 18));

// 泛型类型: 有三种方法
let getArray2: <T>(value: T, length: number) => T[]
// 类型别名的方式
type GetArray = <T>(value: T, length: number) => T[]
// 接口的方式
// interface GetArray2 {
//   <T>(value: T, length: number): T[]
// }
getArray2 = (value: any, length: number) => {
  return new Array(length).fill(value)
}

// 泛型约束
// 参数 value 需要包含 length 属性
interface ValueWithLength {
  length: number
}
type GetValue = <T extends ValueWithLength>(value: T) => T
let getValue: GetValue = (value) => {
  return value
}
getValue('fan')
// getValue(1) // number 没有 length 属性

// 在泛型约束中使用类型参数
// 在对象中，我们访问它没有的属性，会返回一个 undefined，我们需要对其进行约束，使用类型参数
function getPeople<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}
let peopleObj = { name: 'fan', age: 18 }
console.log(getPeople(peopleObj, 'name'));
// getPeople(peopleObj, 'sex') // 没有 sex 这个属性
