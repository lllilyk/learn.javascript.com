# 키 기반 컬렉션
입력된 키값을 기준으로 정렬되는 데이터의 집합(자료구조)

## Maps (Map 객체)
Map은 키와 값을 저장하는 `키-값 데이터 구조`로, 키로 어떤 데이터 타입도 사용할 수 있다는 점이 특징!
- 전통적인 JavaScript의 Object는 키가 문자열이나 심볼만 가능하지만, Map은 숫자, 객체, 배열 같은 모든 타입의 값을 키로 사용할 수 있음.

### Map의 주요 특징:
  - 키 타입 : 모든 데이터 타입 사용 가능
  - 크기 추적 : `Map`은 자동으로 크기를 추적해서 `size` 속성을 통해 언제든지 몇 개의 항목이 있는지를 알 수 있음. `Object`는 수동으로 크기를 계산해야 함.
  - 순서 보장 : `Map`에 저장된 요소들은 삽입된 순서대로 반복 가능! `Object`는 순서를 보장하지 않음.
  - 반복 가능한 구조 : `Map` 객체는 `for...of` 같은 반복문으로 각 요소를 쉽게 순회할 수 있음. (키-값 쌍으로 반환되는 구조)
  - 예시
    ```js
    var sayings = new Map();

    // key-value 쌍 추가
    sayings.set("dog", "woof");
    sayings.set("cat", "meow");
    sayings.set("elephant", "toot");

    // Map의 크기 확인
    console.log(sayings.size); // 3

    // 특정 키에 대한 값 가져오기
    console.log(sayings.get("fox")); // undefined - 키가 없으면 undefined 반환
    console.log(sayings.has("bird")); // false - bird라는 키가 있는지 확인

    // 특정 키 삭제
    sayings.delete("dog");

    // Map을 반복문으로 순회
    for (var [key, value] of sayings) {
      console.log(key + " goes " + value);
    }
    // cat goes meow
    // elephant goes toot
    ```
    - `Object`와의 차이점 : `Object`는 프로토타입 체인이 있어서 기본적으로 존재하는 키들이 있지만, `Map`은 프로토타입 체인이 없어서 사용자가 정의한 키들만 존재함.
  
## WeakMap 객체
`WeakMap`은 `Map`과 비슷하게 키-값 쌍을 저장하지만, 몇 가지 중요한 차이가 있는데, 가장 큰 차이점은 `약한 참조(weak reference)`를 사용한다는 것!

### WeakMap의 주요 특징:
  - 오직 객체만 키로 사용: WeakMap은 `객체만을 키로 사용`할 수 있음. 즉, 숫자나 문자열 같은 값은 키로 사용할 수 없다.
  - 약한 참조: `WeakMap의 키`는 `약한 참조(weak reference)`로, 만약 키로 사용된 객체가 다른 곳에서 참조되지 않으면, `가비지 컬렉션`에 의해 자동으로 삭제됨. 
    - 이 덕분에 `메모리 누수를 방지`할 수 있다!
  - 크기와 반복 불가: `WeakMap`은 키 목록을 제공하지 않고, 크기를 추적할 수 없음.
    - 키들이 가비지 컬렉션에 의해 언제 사라질지 모르기 때문에, WeakMap은 순회할 수 있는 메서드(`forEach`나 `for...of`)가 없다.
  - 예시
    - WeakMap은 주로 `객체의 비공개(private) 데이터를 저장`할 때 사용됨. 예를 들어, 객체의 인스턴스 안에서 외부에 공개하고 싶지 않지만 객체와 연관된 데이터는 WeakMap에 저장할 수 있다.
      ```js
      const privates = new WeakMap(); // 이 WeakMap은 나중에 객체와 연관된 비공개 데이터를 저장하는 용도로 사용됨.

      function Public() { // Public이라는 생성자 함수 정의. 생성자 함수는 새로운 인스턴스를 생성할 때 호출됨
        const me = {
          // 비공개 데이터(private data)
          secret: "I am hidden"
        };
        privates.set(this, me); // this는 public 인스턴스, me는 비공개 데이터
      }

      // method라는 메서드를 Public의 프로토타입에 추가
      Public.prototype.method = function() {
        const me = privates.get(this); // 비공개 데이터에 접근
        console.log(me.secret); // I am hidden
      };

      const instance = new Public(); // 새로운 Public 인스턴스 생성. <- 생성자가 호출되면서, 그 인스턴스(this)에 대한 비공개 데이터(me)가 WeakMap에 저장됨
      instance.method(); // 이 메서드가 호출되면 WeakMap에서 해당 인스턴스에 연결된 비공개 데이터를 가져와서 secret 값을 출력함. // I am hidden 

      console.log(instance.secret); // undefined
      ```
      - `const me = {secret: "I am hidden"}`: 비공개 데이터를 정의하는 객체로, 이 me 객체는 외부에서 바로 접근할 수 없고, WeakMap을 통해서만 접근 가능
      - `privates.set(this, me)`: 현재 생성된 인스턴스(`this-Public()`)와 비공개 데이터(`me`)를 WeakMap에 저장하는 코드. 
        - this와 me를 연결해 WeakMap에 저장한다.
      - `privates.get(this)`: 현재 인스턴스(this)에 연결된 비공개 데이터를 WeakMap에서 가져오는 코드. 
        - 이때 `this`는 메서드를 호출한 인스턴스를 가리키고, 그 인스턴스에 저장된 비공개 데이터가 WeakMap에서 반환됨. 
- 왜 `WeakMap`을 사용할까?
  - 외부에서 직접 접근할 수 없는 비공개 데이터를 구현할 수 있기 때문! 즉, secret이라는 속성명이 아니라, 그 데이터를 WeakMap을 통해서만 접근할 수 있기 때문에 비공개가 유지됨.
  - `console.log(instance.secret); // undefined` : secret 속성이 인스턴스 자체에 저장된 것이 아니기 때문에 `instance.secret`으로는 secret 속성에 접근 불가. 
  - me라는 객체에 secret이 있고, 그 me 객체는 오직 WeakMap을 통해서만 접근 가능하다!

## Sets (Set 객체)
`Set` 객체는 값들의 집합을 저장하는 특별한 구조로, 중복된 값을 허용하지 않아서 `하나의 값은 한 번만 저장`됨.
  - 입력된 순서대로 값을 기억하기 때문에, 반복해서 요소들을 순서대로 접근할 수 있음.
  ```js
  var mySet = new Set();
  mySet.add(1);
  mySet.add("some text");
  mySet.add("foo");

  console.log(mySet.has(1)); // true (1이 Set에 존재하므로)
  mySet.delete("foo"); 
  console.log(mySet.size); // 2

  for (let item of mySet) {
    console.log(item); // 1, some text
  }
  ```

### Set과 배열의 상호 변환
`Array.from` 또는 `spread operator(...)`를 사용해서 Set을 배열로 변환 가능!
- `Set` 생성자는 배열을 받아서 중복된 요소들을 자동으로 제거하고 새로운 Set을 만들 수 있다.
  ```js
  const mySet = new Set([1, 2, 2, 3]); // Set은 중복을 허용하지 않아서 [1, 2, 3]이 됨

  const myArr = Array.from(mySet); // Set을 배열로 변환
  const anotherArr = [...mySet]; // spread operator로 변환

  console.log(myArray); //[1, 2, 3]
  ```
- 배열과 Set의 비교
  - 배열은 중복된 값을 허용해서 값을 찾거나 삭제할 때 속도가 느릴 수 있음. 
  - Set은 중복을 허용하지 않기 때문에, 중복 요소를 직접 체크할 필요가 없고, 특정 값을 빠르게 찾거나 삭제할 수 있음
  - `Set`은 `NaN`도 유일한 값으로 취급하므로 배열의 `indexOf` 메서드로 찾기 어려운 값을 처리할 수 있다!
    - `배열의 indexOf 메서드`는 `NaN`을 값으로 취급하지 않아서 NaN이 배열에 있어도 찾을 수 없음. <- indexOf 메서드가 값을 찾을 때 `엄격한 일치(===)`를 사용하기 때문이다!
      - javaScript에서 NaN은 특이하게 `NaN === NaN`이 `false`이기 때문.
        ```js
        const arr = [1, 2, NaN, 4];
        console.log(arr.indexOf(NaN)); // -1 (NaN을 찾지 못함)
        ```
      - `includes` 메서드는 NaN을 찾을 수 있음
        ```js
        console.log(arr.includes(NaN)); // true(NaN을 찾음)
        ``` 
      - isNaN() 함수를 사용해서 배열에 NaN이 있는지 확인 가능
        ```js
        const index = arr.findIndex(item => isNaN(item));
        console.log(index); // 2
        ```

## WeakSet 객체
WeakSet은 Set과 비슷한 개념이지만 중요한 차이점이 있음
1. 오직 객체만 저장 가능 (원시 값은 저장 불가)
2. WeakSet은 객체에 대한 `약한 참조`를 사용함. 즉, `WeakSet` 안의 객체가 다른 참조가 없으면 그 객체는 자동으로 가비지 컬렉션(메모리에서 제거) 대상이 됨.
3. `WeakSet`의 객체들은 열거 불가능. 즉, `WeakSet` 내에 어떤 객체가 있는지 반복하거나 목록을 얻을 수 없음.

```js
let weakSet = new WeakSet();

let obj1 = {name: "object1"};
let obj2 = {name: "object2"};

weakSet.add(obj1); 
weakSet.add(obj2);  

console.log(weakSet.has(obj1));  // true (obj1이 WeakSet에 있음)
weakSet.delete(obj1);            // obj1을 삭제
console.log(weakSet.has(obj1));  // false (이제 더 이상 존재하지 않음)
```
- 왜 WeakSet을 사용할까?
  - `메모리 관리를 위해` 특정 객체를 저장하고 자동으로 삭제되도록 할 때 유용!
    - 예를 들어, DOM 요소들을 `WeakSet`에 저장하면, 해당 DOM 요소가 삭제될 때 메모리 누수를 걱정할 필요가 없음.

## Map과 Set의 키와 값의 동치성
### 동치성 비교
Map과 set에서는 키와 값의 동치성을 비교할 때 same-value-zero algorithm을 사용하는데, 이는 특정 값들이 같은지를 비교하는 방식임
  - JavaScript의 === 연산자와 비슷하게 작동하지만 조금 다르다.

### 동치성 비교의 규칙
- `+0`과 `-0`은 같다고 간주: JavaScript에서 `+0`과 `-0`은 같다고 판단됨.  
  - `map.set(+0, "positive zero")`와 `map.set(-0, "negative zero")`는 같은 키를 사용하고 있다는 의미
    ```js
    const map = new Map();
    map.set(+0, "positive zero");
    map.set(-0, "negative zero"); // 값 덮어쓰기

    console.log(map.get(+0)); // "negative zero"
    ```
- NaN은 자기자신과 같다고 간주 : JavaScript에서 NaN은 다른 모든 값들과 다르다고 간주되지만, Map과 Set에서는 특별히 NaN은 자기 자신과 같다고 판단함. 
  - 즉, Map이나 Set에 NaN을 키로 사용하면 동일한 NaN으로 인식!
  ```js
  const set = new Set();
  set.add(NaN);
  set.add(NaN); // 중복된 값이므로 추가되지 않음!

  console.log(set.size); // 1
  ```