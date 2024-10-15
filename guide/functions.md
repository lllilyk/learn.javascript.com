참고)
- JavaScript에서는 조건에 따라 함수를 정의할 수 있음. 
  ```js
  let myFunc;

  // num이 0인 경우에만 myFunc를 정의함.
  if (num === 0) {
    myFunc = function (theObject) {
      theObject.make = "Toyota";
    }
  }
  ```

# 함수
## 함수 호이스팅
- 함수 호이스팅은 함수 선언에만 적용됨!
    ```js
    function square(n) {
      return n*n;
    }

    console.log(square(5));
    ```
- 함수 표현식에서는 함수 호이스팅 불가
    ```js
    console.log(square); // ReferenceError: 초기화되기 전에는 square에 접근 불가

    const square = function (n) {
      return n*n;
    }
    ```

## 클로저
클로저(closure)는 내부 함수가 자신을 둘러싼 외부 함수의 변수에 접근할 수 있는 기능을 의미함. 
- 클로저는 함수가 선언될 때 그 함수의 스코프(유효 범위)를 기억하고, 외부 함수가 종료된 후에도 그 스코프에 있는 변수들에 접근할 수 있도록 해준다!
- `클로저 핵심 개념`:
  - 내부 함수는 외부 함수의 변수에 접근할 수 있따. 
  - 외부 함수가 실행을 마쳐도, 내부 함수는 그 외부함수의 스코프를 계속 기억한다. 
    ```js
    function outside(x) {
      function inside(y) {
        return x + y; // 여기에서 x는 외부 함수의 변수
      }
      return inside;
    }

    const fn_inside = outside(3); // 내부 함수인 inside를 반환함. 즉, inside 함수 자체가 반환되는데, 이 함수는 여전히 x=3을 기억하고 있는 상태! 아직 inside는 호출되지 않았음!
    const fesult = fn_inside(5); // fn_inside()를 호출함으로서 inside 함수가 실행됨 (매개변수 y에 값 5가 전달되고, 기억하고 있던 x=3을 통해 결과 값인 3 + 5 = 8을 반환.)
    ```
    - `outside(3)`을 호출할 때는 단순히 그 함수 자체를 반환하는 것!
    - `fn_inside(5)`로 반환된 `inside 함수를 호출할 때` 그때 비로소 y=5가 전달되고, x는 클로저 덕분에 여전히 기억되고 있어서 x=3을 사용할 수 있게 되는 것!!!!
- 클로저 사용시 주의점
  - 둘러싸인 함수가 외부 스코프의 변수와 동일한 이름을 가진 변수를 정의하면, 외부 스코프의 변수에 다시 참조할 방법이 없다!
      ```js
      const createPet = function(name) {
        return {
          setName(name) {
            name = name;
          }
        }
      }
      ```

## 다중 중첩 함수
- 클로저에는 여러 스코프가 포함될 수 있으며, 이 스코프를 포함하는 함수의 스코프를 재귀적으로 포함함. <- 이것을 `스코프 체이닝`이라 한다.
  ```js
  function A(x) {
    function B(y) {
      function C(z) {
        console.log(x + y + z);
      }
      c(3);
    } 
    B(2);
  }
  A(1);
  ```  
- 여기에서 C는 B의 y와 A의 x에 접근할 수 있다!
  - B는 A를 포함하는 클로저를 형성하므로, B는 A의 인수와 변수를 엑세스 할 수 있음.
  - C는 B를 포함하는 클로저를 형성함.
  - C의 클로저는 B를 포함하고, B의 클로저는 A를 포함하기 때문에 C의 클로저도 A를 포함함. 따라서 C는 A의 인수와 변수에 접근할 수 있다는 것을 의미한다. 따라서! C는 A의 스코프를 체이닝함. 
- 반면, A는 C의 변수를 볼 수 없음. 왜냐하면 스코프 체이닝은 안에서 밖으로만 일어나기 때문!!
  - 클로저의 특성: 내부 함수는 바깥 함수의 스코프에 접근할 수 있지만, 그 반대는 불가능하다.
  - 함수 A는 함수 B와 C가 어떻게 동작하는지 모르고, 그 둘의 변수를 다룰 필요도 없지만, 함수 C는 외부 함수에서 정의된 변수에 의존할 수 있기 때문에
  
## 이름 충돌
클로저의 스코프에서 두 개의 인수 또는 변수의 이름이 같은 경우, `이름 충돌`이 발생하는데, 이 경우에 더 `안쪽` 스코프가 우선순위를 가짐!
- 가장 바깥 스코프는 우선순위가 가장 낮은 반면, 가장 안쪽 스코프는 가장 높은 우선순위를 가짐 
- `스코프 체인(scope chain)` : 체인의 첫 번째가 가장 안쪽 스코프이고, 마지막은 가장 바깥쪽 스코프

## 인수(arguments) 객체 사용하기
함수의 인수는 배열과 비슷한 객체로 처리가 되며, 함수 내에서는 전달된 인수를 이렇게 다룰 수 있음
```js
arguments[i];
```
- arguments 객체를 이용하면, 보통 함수에 정의된 개수보다 많은 인수를 넘겨주면서(`arguments.length`) 함수를 호출할 수 있기 때문에, 얼마나 많은 인수가 함수로 넘겨질지 모르는 상황에서 유용하다!

  ```js
  function myConcat(separator) { 
    let result = "";

    for (let i = 1; i < arguments.length; i++) {
      result += arguments[i] + separator;
    }
    return result;
  }

  myConcat(",", "red", "orange", "blue"); 
  ```
  - arguments객체는 함수가 호출될 때 넘겨받은 모든 인수를 담는다.
  - 근데 `함수의 매개변수로 명시적으로 지정된 값(sepaarator)은 그 값 그대로 해당 변수에 저장`되고, `동시에 arguments 객체에도 저장`됨!!!
    ```js
    function myConcat(seperator) {
      console.log(separator); // 구분자(,) 출력
      console.log(arguments[0]); // 첫 번째 인수 출력(separator와 동일)
      console.log(arguments[1]); // 두 번째 인수 출력(첫 번째 문자열 red)
      console.log(arguments[2]); // 아하
    }
    ```

## 화살표 함수
ES6에서 도입된 화살표 함수는 기존의 함수 선언 방식보다 문법이 간결함.
- 특히 화살표 함수는 `function` 키워드를 사용하지 않고, 인수와 화살표(`=>`), 그리고 함수 본문을 간단히 정의할 수 있음.
  ```js
  let sum = (a, b) => a + b;
  ```
  - 이렇게 작성하면 함수의 길이가 줄어들 뿐만 아니라, this 바인딩 방식도 기존 함수와 다르게 동작함.
  - 화살표 함수는 this 값을 정적으로 가져와서, 선언된 위치의 this를 참조하는데 이게 특히 콜백 함수에서 유용함!
    - 이게 무슨 말이냐면, `화살표 함수 내부의 this는 함수가 정의된 순간에 결정되고 바뀌지 않는다`는 것을 의미함. 
    - 일반 함수의 경우:
      - 일반적인 함수(`function`)에서는 this가 함수가 호출되는 방법에 따라 달라짐. 
      - 예를 들어, 객체 메서드로 호출되면 this는 그 객체를 가리키지만, 독립적으로 호출되면(`예: setInterval 같은 타이머 함수나 콜백 함수 안에서`) 전역 객체(브라우저에서는 `window`, `Node.js`에서는 `global`)를 가리키거나 `strict mode`에서는 `undefined`를 가리킴
        ```js
        function Person() {
          this.age = 0;

          setInterval(function growUP() {
            // console.log(this.age); // undefined를 출력함.
            this.age++; // 'this'는 전역 객체를 가리킴 (age는 증가하지 않음)
          }, 1000);
        }
        var p = new Person();
        ```
        - 여기에서 `growUp` 함수는 전역 객체를 가리키므로 `this.age`는 증가하지 않음. 
          - 왜...?
          - this가 전역 객체를 가리킬 때 age가 증가하지 않는 이유는, 전역 객체와 Person 객체가 서로 다른 스코프를 가지고 있기 때문!
          - 전역 객체와 `this`:
            - 전역 객체(window 또는 global)의 속성에 접근하려고 할 때 this는 전역 객체를 가리킴. 즉, 전역 스코프에서는 `this.age`가 전역 객체의 `age` 속성을 참조하게 됨. 
            - 예를 들어, 브라우저에서 window.age를 사용하게 되면, this가 window를 가리키므로 age는 전역 객체의 age가 됨.
            - `setInterval` 내의 `growUp` 함수는 전역 객체의 메서드로 호출되기 때문에, `this`는 `window`를 가리키고 따라서 `window.age`를 증가시키려 함.
            - 만약, 전역 객체에 `age`가 정의되어 있지 않으면, `this.age`는 증가하더라도 보이지 않게 됨. `Person` 객체의 `age`는 `this`가 `person객체`를 갈리킬 때만 접근할 수 있다!!!
        - 이 문제를 해결하기 위해, `this` 값을 고정시키는 방법을 사용했는데, 그 중 하나가 `self 패턴`임
          ```js
          function Person() {
            var self = this; // self 대신 that을 사용하기도 한다
            this.age = 0; 

            setInterval(function growUp() {
              self.age++; // self는 Person을 가리킴
            }, 1000);
          }
          ```
        - 정리) `일반 함수`는 호출될때마다 this가 바뀔 수 있으며, `호출되는 방법에 따라 동적으로 결정`됨.
  
    - 화살표 함수의 경우:
      - 화살표 함수는 선언된 위치에서 this가 무엇인지를 결정함. 
      - 선언된 시점의 this를 기억하고, 이후 그 함수가 어디서 호출되든 간에 항상 그 this를 사용함!
      - 예1)
        ```js
        function Person() {
          this.age = 0;

          setInterval(() => {
            this.age++; // 화살표 함수는 'Person'의 this를 그대로 사용
          }, 1000);
        }
        var p = new Person();
        ```
      - 예2) 
        ```js
        const obj = {
          name: "Alice",
          greet: function() {
            const arrowFunc = () => {
              console.log(this.name); // this는 obj 객체를 가리킴
            };
            arrowFunc();
          }
        };

        obj.greet(); // Alice
        ```
        - 이 코드에서 화살표 함수는 obj.greet 함수가 정의된 시점의 this를 기억한다!
        - 따라서 this는 obj를 가리키고, arrowFunc 내부에서 this.name은 obj.name인 Alice를 출력함.
        - 정리) `화살표 함수`는 this를 `함수가 선언된 시점의 컨텍스트에서 고정`하고, 그 이후 `호출 방식에 상관 없이 같은 this를 유지`함. 
          - 함수 호출 방식에 의해 this가 바뀌는 혼란 방지 가능!

  - function으로 선언한 함수는 자신의 this를 갖지만, 화살표 함수는 상위 스코프의 this를 유지함!