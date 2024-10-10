# 1. 객체 프로토타입
## 1. 객체와 프로토타입이란?
자바스크립트의 모든 객체는 다른 객체를 상속할 수 있는데, 이 상속의 기초가 되는 것이 바로 '프로토타입'!
- 객체(Object) : 자바스크립트에서 데이터와 함수 조합
- 프로토타입(Prototype) : 자바스크립트 객체가 다른 객체로부터 속성이나 메소드를 물려받을 수 있는 메커니즘
즉, 객체는 자신만의 속성이나 메소드뿐만 아니라, 다른 객체(프로토타입)로부터 상속받은 속성과 메소드도 사용할 수 있음. 

## 2. 프로토타입 체인
자바스크립트 객체는 프로토타입 체인을 통해 다른 객체의 속성과 메소드를 상속받을 수 있음. 만약 객체에 메소드나 속성이 없으면, 자바스크립트는 그 객체의 프로토타입을 확인함.
이때 프로토타입에 해당 메소드나 속성이 없다면, 계속해서 그 프로토타입의 프로토타입을 확인하는 과정을 반복하는데 이것을 `프로토타입 체인`이라고 함. 
```js
let animal = {
  eats: true
};

let rabbit = {
  jumps: true
};

// rabbit의 프로토타입을 animal로 설정
rabbit.__proto__ = animal;

console.log(rabbit.eats); // true (rabbit은 animal로부터 eats를 상속받았기 때문)
```

## 3. `__proto__`와 `prototype`
자바스크립트에서 프로토타입을 설정하는 방식에는 두 가지가 있음.
- 객체의 `__proto__`(또는 `[[Prototype]]`) : 
  - `__proto__`는 객체의 숨겨진 속성으로, `해당 객체가 상속받는 프로토타입 객체`를 가리킴
  - 이것은 개별 객체가 가지는 속성으로, 생성자가 아니라 생성된 객체에서 존재하는 속성임.
  - 최근 자바스크립트에서는 `Object.getPrototypeOf()` 함수를 사용하여 안전하게 프로토타입 객체에 접근할 수 있음.
    ```js
    let person1 = new Person();
    console.log(person1.__proto__); // person1의 내부 프로토타입 객체 즉, person.prototype을 가리킴
    ```

- 생성자의 `prototype` : 
  - 함수에만 있는 특수한 속성으로, 모든 생성자 함수는 `prototype` 속성을 가지며, 이 속성은 해당 함수로 만들어진 모든 객체들이 상속받을 `프로토타입 객체`를 가리킴. 
    ```js
    function Person() {}
    console.log(Person.prototype); // Person 생성자의 prototype 객체 출력
    ```
```js
function Animal() {} // 객체를 생성하는 생성자 함수, 아무 동작 하지 않으며 단지 새로운 Animal 객체를 만들 수 있는 틀.
Animal.prototype.eats = true; 

// 모든 자바스크립트 객체는 프로토타입을 가지고 있으며, 프로토타입은 다른 객체로부터 상속받는 속성이나 메소드가 저장되는 장소임. 
// Animal.prototype.eats = true;는 Animal 생성자 함수의 프로토타입에 eats라는 속성을 추가하는 것. 
// 즉, Animal로 만든 모든 객체는 이 eats 속성을 상속받아서 사용할 수 있게 된다. 

let rabbit = new Animal(); // Animal 생성자 함수를 사용해서 새로운 객체 생성! <- 이 과정에서 rabbit 객체는 Animal.prototype을 상속받으므로 eats라는 속성을 사용할 수 있게 됨.
console.log(rabbit.eats); // true (rabbit은 Animal.prototype으로부터 상속 받음.)
```
근데 `__proto__`는 과거부터 사용되던 비표준 방식이라서, 지금은 가급적 `Object.getPrototypeOf()`와 `Object.setPrototypeOf()`를 사용하는 것이 권장된다고 한다!

1. `Object.setPrototypeOf(rabbit, animal)`
    이 코드는 이미 존재하는 객체의 프로토타입을 동적으로 변경하는 방식
    ```js
    let animal = {
      eats: true
    };

    let rabbit = {
      jumps: true
    };

    Object.setPrototypeOf(rabbit, animal); // 이미 존재하는 rabbit의 프로토타입을 animal로 설정

    console.log(rabbit.eats); // true (animal로부터 상속받음)
    console.log(rabbit.jumps); // true (rabbit 자신의 속성)
    ```
    - rabbit 객체가 이미 jump 속성을 가지고 있는 상태에서 `Object.setPrototypeOf(rabbit, animal)`을 통해 rabbit의 프로토타입을 나중에 animal로 설정한 것
    - 따라서, rabbit은 기존 속성(jump)을 유지하면서, 추가로 animal로부터 eats 속성을 상속받는다. 


2. `Object.create(animal)`
   이 코드는 새로운 객체를 생성하면서, 그 객체의 프로토타입을 animal로 설정하는 방식
    ```js
    let animal = {
      eats: true
    };

    let rabbit = Object.create(animal); // 새로운 객체 rabbit을 만들고, 프로토타입은 animal로 설정.

    console.log(rabbit.eats); // true(animal로부터 상속받음)
    console.log(rabbit.jumps); // undefined (rabbit 자체에는 jumps 속성이 없음!)

    console.log(Object.getPrototypeOf(rabbit)); // animal
    ```
    - rabbit 객체는 `Object.create(animal)`을 사용해 animal을 프로토타입으로 하여 새로운 객체를 생성
    - 새롭게 만들어진 rabbit 객체는 자신의 속성은 없고, 오직 animal로부터 상속된 속성들만 사용할 수 있음(eats)
    - rabbit.jumps는 undefined로 나오는데, 이는 rabbit 자체에 jumps 속성이 없고, `프로토타입 체인`에서도 찾을 수 없기 때문!

- 따라서, 기존 객체의 프로토타입을 변경하려면 `Object.setPrototypeOf()`를 사용하고, 새로운 객체를 특정 프로토타입으로 생성하려면 `Object.create()`를 사용하는 것이 적합함. 
  
#### 프로토타입 상속의 이점 : 프로토타입을 상속하면 코드의 중복을 줄이고, 효율적으로 속성과 메소드를 공유할 수 있음! (코드 재사용성 높임)

## 4. Ojbect.create()로 객체 만들기
`Object.create()`를 사용하면 특정 객체를 프로토타입으로 설정한 새로운 객체를 만들 수 있음.
```js
let animal = {
  eats: true
};

let rabbit = Object.create(animal);
console.log(rabbit.eats); // true 
```

## 5. 프로토타입을 활용한 메소드 공유
같은 메소드를 여러 객체에서 사용하려면, 각 객체에 메소드를 정의하는 대신, 프로토타입에 정의해서 객체들이 공유하게 만들 수 있음.
```js
function Person(name) {
  this.name = name;
}

Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

let aki = new Person("Aki");
let megumi = new Person("Megumi");

aki.sayHello(); // Hello, my name is Aki
```