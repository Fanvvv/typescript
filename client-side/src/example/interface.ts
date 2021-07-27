/*
 * @Author: fan
 * @Date: 2021-07-27 20:26:56
 * @LastEditors: fan
 * @LastEditTime: 2021-07-27 22:32:36
 * @Description: 接口 interface
 */
// 基本用法
interface NameInfo {
  firstName: string,
  lastName: string
}
function getFullName({ firstName, lastName }: NameInfo) {
  console.log(`${firstName} ${lastName}`);
}
let interfaceObj1 = { firstName: 'fan', lastName: 'egret' }
getFullName(interfaceObj1)

// 可选属性: 接口里的属性不全都是必需的。
// interface OptionInterface {
//   name: string,
//   age?: number,
// }
// function peopleInfo(info: OptionInterface) {
//   console.log(info.name, info.age ? info.age : '');
// }
// let interfaceObj2 = { name: 'fan' }
// peopleInfo(interfaceObj2)

// 多余属性检查: 如果我们传入的值多于接口中的值，ts 会帮我们检查出来
// 绕开多余属性检查: 可以使用 类型断言 和 索引签名
interface OptionInterface {
  name: string,
  age?: number,
  // 使用索引签名
  [prop: string]: any,
}
function peopleInfo(info: OptionInterface) {
  console.log(info.name, info.age ? info.age : '');
}
// 使用类型断言
peopleInfo({ name: 'fan', age: 18, sex: '男' } as OptionInterface)

// 只读属性: 一些对象属性只能在对象刚刚创建的时候修改其值。
interface PointInterface {
  readonly x: number,
  readonly y: number,
}
let point1: PointInterface = { x: 12, y: 13 }
// point1.x = 13 无法分配到 "x" ，因为它是只读属性。
let readonlyArr: ReadonlyArray<number> = [1, 2, 3]
// readonlyArr.push(1) 类型“readonly number[]”上不存在属性“push”。

// 函数类型
type FuncType = (x: number, y: number) => void
const addFunction: FuncType = (x, y) => {
  console.log(x + y);
}

// 索引类型: 描述对象索引的类型，还有相应的索引返回值类型
interface IndexType {
  [index: string]: number,
}
let indexObj1: IndexType = {
  string: 1,
}
let indexObj2: IndexType = {
  1: 1, // 这样写也是可以的，会默认隐式转换为 string 类型
}

// 继承接口: 和类一样，接口也可以相互继承。一个接口可以继承多个接口
interface Parent {
  one: number
}
interface Children extends Parent {
  two: number
}
interface FullInterface extends Parent, Children {
  three: number
}
let childrenObj1: Children = {
  one: 1,
  two: 2
}
let childrenObj2: FullInterface = {
  one: 1,
  two: 2,
  three: 3
}

// 混合类型接口: 一个对象可以同时具有上面提到的多种类型。
// 一个例子就是，一个对象可以同时做为函数和对象使用，并带有额外的属性
interface Counter {
  (): void,
  count: number
}
function getCount(): Counter {
  const c = () => c.count++
  c.count = 18
  return c
}
console.log(getCount()); // ƒ () { return c.count++; }
const addCount = getCount()
addCount()
console.log(addCount.count); // 19

// 接口继承类: 当接口继承了一个类类型时，它会继承类的成员但不包括其实现。
class Control {
  private state: any;
}
interface SelectableControl extends Control {
  select(): void;
}
class Button extends Control implements SelectableControl {
  select() { }
}
class TextBox extends Control {
  select() { }
}
// 错误：“Image”类型缺少“state”属性。
// class Image implements SelectableControl {
//   select() { }
// }

