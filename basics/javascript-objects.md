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

# 2. 객체 지향 프로그래밍(OOP)
JavaScript에서 객체를 중심으로 코드 구조를 만드는 방법
- 객체 : '속성(데이터)'과 '메서드(행동)'를 포함한 독립적인 단위

## 핵심개념
1. 객체(Object) : JavaScript에서 객체는 데이터와 함수(메서드)를 그룹화한 것. 
    ```js
    let person = {
      name: "Bob",
      age: 30,
      speak: function() {
        console.log("Hello!");
      }
    };
    person.speak(); // "Hello!"
    ```
2. 클래스(Class) : ES6(ECMAScript2015)에서 도입된 개념으로, 객체를 만들기 위한 '청사진' 역할을 하며, 클래스를 통해 비슷한 성격을 가진 여러 객체를 쉽게 만들 수 있음. 
    ```js
    class Person {
      constructor(name, age) {
        this.name = name;
        this.age = age;
      }
      speak() {
        console.log(`Hello, my name is ${this.name}`);
      }
    }
    let Bob = new Person("Bob", 30);
    Bob.speak(); // Hello, my name is Bob
    ```
3. 상속(Inheritance) : 상속은 클래스가 다른 클래스의 속성과 메서드를 물려받는 것을 의미하며 이를 통해 코드의 재사용성과 유지보수성을 높일 수 있음
    ```js
    class Student extends Person {
      constructor(name, age, grade) {
        super(name, age); // 부모 클래스의 생성자 호출
        this.grade = grade;
      }
      study() {
        console.log(`${this.name} is studying.`);
      }
    }
    let student = new Student("Alice", 20, "A");
    student.speak(); // Hello, my name is Alice
    student.study(); // Alice is studying.
    ```
4. 캡슐화 : 객체의 내부 상태(데이터)를 외부로부터 숨기고, 객체와 상호작용할 때는 객체가 제공하는 공개 메서드(인터페이스)를 통해서만 접근할 수 있게 하는 것.
  - 프로그램의 유지보수와 확장성이 훨씬 쉬워짐. 
    ```js
    class Student {
      constructor(name, year) { // constructor라는 메서드를 사용해서 객체 초기화 <- 클래스가 인스턴스화될 때 자동으로 호출되며, 클래스와 이름이 같지 않아도 됨! (이름이 고정된 메서드)
        this.name = name;
        this._year = year; // _로 시작해서 비공개 속성임을 표시
      }

      canStudyArchery() {
        return this._year > 1; // 2학년 이상이면 양궁 공부 가능
      }
    }

    let student = new Student('Bob', 1);
    console.log(student.canStudyArchery()); // false
    ```
    - 외부에서 직접 접근하는 것이 아닌, `canStudyArchery()` 메서드를 통해서만 `_year` 속성의 값을 확인할 수 있음. 
  - 장점
    - 정보 은닉 : 내부 데이터(속성)를 외부에서 접근하지 못하도록 하여 객체의 데이터를 보호함
    - 유지보수성 : 프로그램 로직을 한 곳에서 수정할 수 있으므로, 변경 사항이 있을 때 수정해야 할 코드 양이 줄어듦
    - 안정성 : 외부에서 객체 내부 상태를 직접 수정하는 일을 방지하여 프로그램의 예기치 않은 오류 방지

## mdn 설명
1. 의사 코드에서 Professor 클래스
    ```js
    class Professor
        properties
            name
            teaches
        methods
            grade(paper)
            introduceSelf()
    ```
    - 클래스는 해당 유형의 구체적인 객체를 만들기 위한 일종의 템플릿일 뿐, 그 자체로는 아무것도 하지 않음. 
    - 내가 생성하게 되는 각 구체적인 Professor는 Professor 클래스의 `인스턴스`
    - 인스턴스 생성 프로세스는 `생성자`에 의해 수행됨. 새 인스턴스에서 초기화하려는 내부 상태에 대한 값을 생성자에 전달.
    - 일반적으로 생성자는 클래스 정의의 일부로 작성되며, 일반적으로 클래스와 동일한 이름을 갖는다. 
    ```js
    class Professor
        properties
            name
            teaches
        // 이 생성자는 두 개의 매개변수를 사용하므로 새로운 구체적인 교수를 만들 때 name과 teaches 속성 초기화 가능!
        constructor
            Professor(name, teaches) 
        methods
            grade(paper)
            introduceSelf()
    ```

    이제 생성자가 있으니까 다른 교수들을 만들 수 있음!
    ```js
    aki = new Professor("Aki", "Psychology"); // new 키워드를 사용해서 생성자(Professor(name, teaches)가 호출되고 있음을 알림.
    megumi = new Professor("Megumi", "poetry");

    aki.teaches; // Psychology
    aki.introduceSelf(); 
    ```
    - 이렇게 하면 `Professor` 클래스의 인스턴스인 두 개의 객체가 생성됨.


2. 의사코드에서 상속
모든 공통 속성을 정의하는 새 클래스 Person을 정의하여 이를 모델링할 수 있음. 그 다음 `Professor`와 `Student`는 `Person`에서 파생되어 추가 속성을 추가할 수 있다!
    ```js
    class Person
        properties
            name
        constructor
            Person(name)
        methods
            introduceSelf()

    class Professor : extends Person
        properties
            teaches
        constructor
            Professor(name, teaches)
        methods
            grade(paper)
            introduceSelf()

    class Student : extends Person
        properties
            year
        constructor
            Student(name, year)
        methods
            introduceSelf()
    ```
- Person은 Professor와 student의 상위 클래스/부모 클래스
- 따라서 introduceSelf()는 세 클래스 모두에 정의되어 있음!

# 3. OOP와 JavaScript
JavaScript도 OOP(클래스 기반 객체 지향 프로그래밍)를 구현할 수는 있찌만, 그 방식이 전통적인 OOP 언어들(Java, C++)과는 좀 다르다는 걸 이해하는 게 중요하다!

## 생성자와 프로토타입
JavaScript에서 생성자는 객체를 만들 때 필요한 청사진 같은 역할을 하는, 클래스의 역할을 한다고 볼 수 있음.
- 하지만 JavaScript에서는 모든 객체가 클래스로부터 생성되는게 아니고, `객체 리터럴`을 사용해서도 쉽게 객체를 만들 수 있음
  - 이게 JavaScript가 전통적인 OOP 언어보다 가볍고 유연한 이유 중 하나!
- 또한, 자바스크립트는 `프로토타입`을 사용해서 상속과 비슷한 기능을 제공함.
  - 생성자에서 모든 메서드를 정의할 필요 없이, 메서드를 생성자의 `prototype` 속성에 정의하면, 그 생성자로 만들어진 모든 객체가 그 메서드를 공통으로 사용할 수 있게 됨.

## 프로토타입 체인과 상속의 차이
프로토타입 체인은 JavaScript에서 상속을 구현하는 방법이지만, 전통적인 상속과는 차이가 있다!
- 전통적인 OOP에서는 상속받은 클래스가 새로운 인스턴스를 만들 때, 모든 속성과 메서드가 그 객체 안에 복사되지만, JavaScript에서는 `프로토타입 체인`을 통해 객체들이 서로 연결됨. 
- 즉, Student 객체에 특정 속성이 없으면, 그 객체의 프로토타입(Person)을 참조해서 속성이나 메서드를 가져오는 것! 이 방식은 위임이라는 패턴에 더 가깝다.
  - 객체가 스스로 해결할 수 없는 작업을 다른 객체에 위임해서 해결하는 방식

흠

### Java(OOP)에서의 상속
```java
// 부모 클래스: Person
class Person {
  String name;

  public Person(String name) {
    this.name = name;
  }

  public void introduceSelf() {
    System.out.println("Hi, my name is " + name);
  }
}

// 자식 클래스: Student (Person 클래스를 상속 받음)
class Student extends Person {
  int year;

  public Student(String name, int year) {
    super(name); // 부모 클래스의 생성자 호출
    this.year = year;
  }

  public boolean canStudyArchery() {
    return year > 1;
  }
}

public class Main {
  public static void main(String[] args) {
    Student student = new Student("Bob", 1);
    student.introduceSelf(); // 부모 클래스의 메서드 사용
    System.out.println("Can study archery: " + student.canStudyArchery());
  }
}
```
- Student 클래스가 Person 클래스를 상속받아 Person 클래스의 name 속성과 introduceSelf() 메서드를 그대로 사용할 수 있음
- Student 클래스는 자신의 속성인 year와 canStudyArchery() 메서드를 추가로 정의함.
- Student 인스턴스가 만들어지면 name, year를 사용할 수 있고, canStudyArchery(), introduceSelf() 메서드 모두 사용 가능


### JavaScript에서의 프로토타입 체인
```js
// 부모 객체: Person
function Person(name) {
  this.name = name;
}

Person.prototype.introduceSelf = function() {
  console.log("Hi, my name is " + this.name);
}

// 자식 객체: Student (Person을 프로토타입으로 상속받음)
function Student(name, year) {
  Person.call(this, name); // Person 생성자 호출
  this.year = year;
}

// Student의 프로토타입을 Person으로 설정하여 상속 구현
Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;

Student.prototype.canStudyArchery = function () {
  return this.year > 1;
};

let student = new Student("Bob", 1);
student.introduceSelf(); // 부모 객체의 메서드 사용
console.log("Can study archery : " + student.canStudyArchery());
```
- JavaScript에서는 생성자 함수와 프로토타입을 이용해서 상속 구현 가능
- Student 함수는 Person 함수를 call 메서드로 호출해 부모의 속성을 상속받고, 프로토타입 체인을 통해 메서드를 공유함. 
- 프로토타입을 사용하면 객체 간의 상속을 구현할 수 있는데, 프로토타입 체인을 통해 Student 객체가 Person 객체의 메서드에 접근할 수 있음.

# 4. 객체 멤버(속성, 메서드)의 세 가지 주요 유형
1. 생성자 함수 내부에서 정의된 멤버 
  - 이 속성은 인스턴스에서만 사용할 수 있음. 즉, `new` 키워드로 생성된 객체에서만 접근 가능
    ```js
    function Person(name, age) {
      this.name = name;
      this.age = age;
    }

    let person1 = new Person("Alice", 30);
    console.log(person1.name); //Alice
    ```

2. 생성자 함수에 직접 정의된 멤버
  - 생성자 함수 자체에 속성이나 메서드를 정의한 것으로, 이 멤버는 생성자 함수에서만 사용할 수 있음
    ```js
    function Person() {}

    Person.hello = function () {
      console.log("Hello from Person Constructor");
    }

    Person.hello(); //Hello from Person Constructor
    ```
    - `Object.key()`같은 내장 함수도 생성자 함수에 직접 정의된 것

3. 프로토타입에 정의된 멤버
  - 생성자의 프로토타입 객체에 정의된 메소드나 속성, 이 멤버는 모든 인스턴스에서 상속받아 사용할 수 있음.
  - 자바스크립트에서는 객체가 프로토타입 체인(상속 체계)을 따라가면서 메소드를 찾는다!
    ```js
    function Person(name) {
      this.name = name;
    }
    Person.prototype.greet = function() {
      console.log(`Hello, I'm ${this.name}`);
    }

    let person1 = new Person("Alice");
    person1.greet();
    ```

## [참고] ECMAScript 2015(ES6) 클래스
ES6에서는 class 문법을 도입해 객체를 더 쉽게 만들 수 있다!

- 상속을 위한 extends와 super
  - 클래스를 상속받을 때는 `extends` 키워드를 사용하고, 상위 클래스의 생성자를 호출하려면 `super()`를 사용함. 
    ```js
    class Teacher extends Person {
      constructor(name, age, subject) {
        super(name, age); // 상위 클래스(Person)의 생성자 호출
        this.subject = subject;
      }

      teach() {
        console.log(`${this.name} teaches ${this.subject}`);
      }
    }

    let teacher1 = new Teacher("Bob", 40, "Math");
    teacher1.greet(); // "Hello, I'm bob"
    teacher1.teach(); // "Bob teaches Math"
    ```
- `getter`와 `setter`
  - 속성에 대한 접근을 제어할 때 사용됨. 속성 값을 조회할 때는 `get`을, 값을 설정할 때는 `set`을 사용함
    ```js
    class Teacher extends Person {
      constructor(name, age, subject) {
        super(name, age);
        this._subject = subject;
      }

      get subject() {
        return this._subject;
      }

      set subject(newSubject) {
        this._subject = newSubject;
      }
    }

    let teacher1 = new Teacher("Bob", 40, "Math");
    console.log(teacher1.subject); //Math
    teacher1.subject = "Science"; // Setter로 값 변경
    console.log(teacher1.subject); // Science
    ```

# 5. JSON으로 작업하기
JSON(JavaScript Object Notation)은 데이터를 쉽게 저장하고 전송할 수 있는 형식!
- 주로 서버와 웹 애플리케이션 간에 데이터를 주고받을 때 많이 사용됨. JSON은 사람이 읽기 쉽고, 구조화된 데이터를 표현하는데 편리하다!
## JSON의 주요 개념
1. 데이터 표현 방식 : JSON은 키-값 쌍으로 데이터를 표현함. 자바스크립트의 객체와 비슷한 구조로, 중괄호{}를 사용해 객체를 표현하고, 배열은 대괄호[]를 사용함.
  ```json
  {
    "name": "bob",
    "age": 30,
    "isStudent": false
  }
  ```

2. 데이터 타입 
  - 문자열, 숫자(정수나 소수), 불리언, 배열, 객체({"key": "value"}), null

3. JSON의 사용 : 웹 서버와 클라이언트가 데이터를 교환할 때 JSON 형식으로 데이터를 보내면, 그 데이터를 자바스크립트로 쉽게 파싱하거나 생성할 수 있음. 
  - 예를 들어, 서버에서 받은 JSON 데이터를 자바스크립트에서 객체로 변환하려면 `JSON.parse()`를 사용!
    ```js
    let jsonData = '{"name": "Bob", "age": 30}';
    let obj = JSON.parse(jsonData);
    console.log(obj.name); // Bob
    ```
  - 반대로, 자바스크립트 객체를 JSON 형식으로 변환하려면 `JSON.stringify()`를 사용!
    ```js
    let obj = {name: "Bob", age: 30};
    let jsonData = JSON.stringify(obj);
    console.log(jsonData); // '{"name": "Bob", "age": 30}'
    ```

## JSON 구조
JSON은 JavaScript 객체 리터럴 형식과 매우 유사한 형식의 문자열로, JSON 내부에 표준 자바스크립트 객체와 동일한 기본 데이터 유형(문자열, 숫자, 배열, 불리언 및 기타 객체 리터럴)을 포함할 수 있음. 
이를 통해 데이터 계층 구성 가능!
```js
{
  "homeTown": "Metro City",
  "members": [
    {
      "name": "aki",
      "age": 30
      "powers": ["radiation resistance", "Turning tiny"]
    },
    {
      "name": "megumi",
      "age": 28
      "powers": ["damage resistance", "Turning huge"]
    }
  ]
}
```
- 계층 구조에서 더 낮은 데이터에 엑세스하려면 필요한 속성 이름과 배열 인덱스를 함께 연결해야 함. 
- 예를 들어, 위의 멤버 목록에 나열된 두 번째 영웅의 두 번째 초능력에 액세스하려면 이렇게 해야한다.
```js
superHeros["members"][1]["powers"][1];
```

## 기타 참고사항
- JSON은 지정된 데이터 형식을 가진 문자열일 뿐. 속성만 포함하고 메서드는 포함하지 않는다!
- JSON은 문자열과 속성 이름을 둘러싸기 위해 큰 따옴표를 사용해야 함! 작은 따옴표는 전체 JSON 문자열을 둘러싸는 것 외에는 유효하지 않음.
- 단 하나의 쉼표나 콜론만 잘못되어도 JSON 파일이 잘못되어 작동하지 않을 수 있으므로 사용하려는 모든 데이터의 유효성을 검사하는데 주의해야함.. JSONLint.