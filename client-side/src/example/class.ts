/*
 * @Author: fan
 * @Date: 2021-08-01 12:05:57
 * @LastEditors: fan
 * @LastEditTime: 2021-08-02 23:53:05
 * @Description: ts 中的类
 */

// TS中定义类
class Pointer {
  x!: number; // 实例上的属性必须声明
  y!: number;
  constructor(x: number, y?: number, ...args: number[]) {
    this.x = x
    this.y = y as number
  }
}
const pointer = new Pointer(100, 200)
console.log(pointer);

// 类中的修饰符
// 1. public 修饰符，公共的，（谁都可以访问到）
class Animal1 {
  public name!: string; // 不写 public 默认也是公开的
  public age!: number;
  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}
class Cat1 extends Animal1 {
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.name, this.age); // 子类访问
  }
}
const cat1 = new Cat1('Tom', 2)
console.log(cat1.name, cat1.age); // 外层访问
// 可以通过参数属性来简化父类中的代码
// class Animal1 {
//   constructor(public name: string, public age: number) {
//     this.name = name
//     this.age = age
//   }
// }

// 2. protected 修饰符，保护的，(自己和子类能访问到)
class Animal2 {
  constructor(protected name: string, protected age: number) {
    this.name = name
    this.age = age
  }
}
class Cat2 extends Animal2 {
  constructor(name: string, age: number) {
    super(name, age)
    console.log(this.name, this.age);
  }
}
const cat2 = new Cat2('Tom', 3)
// console.log(cat2.name, cat2.age); // 无法访问到，只能在子类中访问

// 3. private 修饰符，私有的，(只有自己可以访问到)
class Animal3 {
  constructor(private name: string, private age: number) {
    this.name = name
    this.age = age
  }
}
class Cat3 extends Animal3 {
  constructor(name: string, age: number) {
    super(name, age)
    // console.log(this.name, this.age); // 私有属性只能自己访问，不能继承
  }
}
const cat3 = new Cat3('Tom', 4);
// console.log(cat3.name, cat3.age); // 私有属性只能自己访问

// 4. readonly 修饰符，只读的
class Animal4 {
  constructor(public readonly name: string, public age: number) {
    this.name = name
    this.age = age
  }
  changeName(name: string) {
    // this.name = name // 只读属性只能在 constructor 中赋值
  }
}

// 静态属性和方法 静态属性和静态方法是可以被子类继承的
class Animal5 {
  static type = "动物" // 静态属性
  static getName() { // 静态方法
    return "动物类"
  }
  private _name: string = 'Tom'
  get name() {
    return this._name
  }
  set name(newName: string) {
    this._name = newName
  }
}
const animal5 = new Animal5()
console.log(animal5.name);

// Super属性
class Animal6 {
  say(message: string) {
    console.log(message);
  }
  static getType() {
    return "动物"
  }
}
class Cat6 extends Animal6 {
  say() {
    super.say("喵喵叫")
  }
  static getType() {
    return super.getType()
  }
}
const cat6 = new Cat6()
cat6.say()
console.log(Cat6.getType());

// 类的装饰器
// 1. 装饰类 装饰类可以给类扩展功能,需要开启experimentalDecorators:true
function addSay(target: any) {
  target.prototype.say = () => { console.log('say') }
}
@addSay
class Person1 {
  say!: () => void
}
let person1 = new Person1()
person1.say();
// 2. 装饰类中的属性 装饰属性可以对属性的内容进行改写，装饰的是实例属性则target指向类的原型、装饰的是静态属性则target执行类本身
function toUpperCase(target: any, key: string) {
  let value = target[key];
  Object.defineProperty(target, key, {
    get() {
      return value.toUpperCase();
    },
    set(newValue) {
      value = newValue
    }
  })
}
function double(target: any, key: string) {
  let value = target[key];
  Object.defineProperty(target, key, {
    get() {
      return value * 2;
    },
    set(newValue) { value = newValue }
  })
}
class Person2 {
  @toUpperCase
  name: string = 'JiangWen'
  @double
  static age: number = 10;
  getName() {
    return this.name;
  }
}
let person2 = new Person2();
console.log(person2.getName(), Person2.age)
// 3. 装饰类中的方法
function noEnum(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(descriptor)
  descriptor.enumerable = false;
}
class Person3 {
  @toUpperCase
  name: string = 'JiangWen'
  @double
  static age: number = 10;
  @noEnum
  getName() {
    return this.name;
  }
}
let person3 = new Person3();
console.log(person3); // getName 不可枚举
// 4. 装饰参数
function addPrefix(target: any, key: string, paramIndex: number) {
  console.log(target, key, paramIndex); // Person.prototype getName 0
}
class Person4 {
  @toUpperCase
  name: string = 'JiangWen'
  @double
  static age: number = 10;
  prefix!: string
  @noEnum
  getName(@addPrefix prefix: string) {
    return this.name;
  }
}

// 抽象类 抽象类无法被实例化，只能被继承，抽象方法不能在抽象类中实现，只能在抽象类的具体子类中实现,而且必须实现。
abstract class Animal {
  name!: string;
  abstract speak(): void
}
class Cat extends Animal {
  speak() {
    console.log('猫猫叫');
  }
}
class Dog extends Animal {
  speak(): string {
    console.log('汪汪叫');
    return 'wangwang'
  }
}
