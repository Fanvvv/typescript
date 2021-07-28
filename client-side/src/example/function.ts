/*
 * @Author: fan
 * @Date: 2021-07-28 10:26:29
 * @LastEditors: fan
 * @LastEditTime: 2021-07-28 11:35:35
 * @Description: 函数 function
 */
// 函数类型
// 为函数定义类型
let addFunc1: (x: number, y: number) => number

// 完整函数类型
let addFunc2: (x: number, y: number) => number
addFunc2 = (x: number, y: number) => x + y

// 使用接口定义函数类型: tslint 会提示转换为类型别名的形式
// interface addFunc3 {
//   (x: number, y: number): number
// }

// 使用类型别名
type addFunc4 = (x: number, y: number) => number

// 参数
// 可选参数
function fullName(firstName: string, lastName?: string): string {
  return lastName ? `${firstName} ${lastName}` : firstName
}

// 剩余参数: ts 也支持 ... 操作符
function buildName(firstName: string, ...resetOfName: string[]) {
  return firstName + ' ' + resetOfName.join(' ')
}
console.log(buildName('fan', 'egret', 'fan', 'egert'));

// 默认参数: 指定形参的默认值
function addFunc5(x: number, y = 10) {
  return x + y
}

// 重载
function funcReload(x: number, y: number): number
function funcReload(firstName: string, lastName: string): string
function funcReload(x: any, y: any) {
  if (typeof x === 'number') {
    return x + y
  }
  return `${x} ${y}`
}
console.log(funcReload(1, 2));
console.log(funcReload('fan', 'egret'));
