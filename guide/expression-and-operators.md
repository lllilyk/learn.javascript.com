# 표현식과 연산자
## 할당 연산자

|             이름           | 단축 연산자 |           뜻            |
|----------------------------|------------|------------------------ |
| 할당                       | `x = y`    | `y`의 값을 `x`에 할당     |
| 더하기 할당                 | `x += y`   | `x = x + y`             |
| 빼기 할당                   | `x -= y`   | `x = x - y`             |
| 곱하기 할당                 | `x *= y`   | `x = x * y`             |
| 나누기 할당                 | `x /= y`   | `x = x / y`             |
| 나머지 할당                 | `x %= y`   | `x = x % y`             |
| 거듭제곱 할당               | `x **= y`  | `x = x ** y`            |
| 왼쪽 시프트 할당            | `x <<= y`  | `x = x << y`            |
| 오른쪽 시프트 할당          | `x >>= y`  | `x = x >> y`            |
| 부호 없는 오른쪽 시프트 할당 | `x >>>= y` | `x = x >>> y`           |
| 비트 AND 할당               | `x &= y`   | `x = x & y`             |
| 비트 XOR 할당               | `x ^= y`   | `x = x ^ y`             |
| 비트 OR 할당                | `x |= y`   | `x = x | y`             |
| 논리 AND 할당               | `x &&= y`  | `x && (x = y)`          |
| 논리 OR 할당                | `x ||= y`  | `x || (x = y)`          |
| 널 병합 할당                | `x ??= y`  | `x ?? (x = y)`          |


## 구조 분해
구조 분해 할당은 JavaScript 표현식 중 하나로, 객체나 배열을 생성할 때와 비슷한 구문으로 사용해서 어떤 객체나 배열에서 데이터를 추출할 수 있음.
```js
var foo = ["one", "two", "three"];

// 구조 분해 없음
var one = foo[0];
var two = foo[1];
var three = foo[2];

// 구조 분해 사용
var [one, two, three] = foo;

```

## 반환 값과 체이닝
- 할당 표현식을 체이닝하거나 중첩함으로써 할당의 결과를 다시 다른 변수에 할당할 수 있음.
  ```js
  let x; 
  const y = (x=f());  
  console.log(y); // x=f() 할당의 반환 값을 기록

  console.log((x=f())); // 반환 값을 직접 기록

  // 할당 표현식은 보통 표현식을 기대하는 곳이라면 어디에나 중첩해 사용할 수 있음
  // 배열 리터럴의 요소나 함수의 매개변수도 그런 곳 중 일부!
  console.log([0, (x=f()), 0]);
  console.log(f(0, (x=f()), 0));
  ```
- 평가 결과와 우측 결합
  - 할당 표현식의 결과:
    - `x = f()`의 평과 결과는 `f()`의 반환값과 동일함. 즉, `x`에는 `f()`가 반환한 값이 할당됨.
    - 비슷하게, `x += f()`의 결과는 `x +f()`의 결과와 같음. 이는 각 연산자가 오른쪽의 표현식을 계산한 후, 그 결과를 왼쪽 변수에 할당하기 때문!
  - 논리 할당: 
    - `x &&= y`, `x ||= y`, `x ??= y`의 경우, 할당 연산자 부분을 제외한 논리 연산의 결과를 반환함. 
    - 예를 들어, `x &&= y`는 `x && y`의 결과를 반환함. 즉, x가 falsy일 경우 y를 평가하지 않고 x의 현재 값을 반환! 나머지도 마찬가지. 

- 체이닝과 평가 순서
  - 할당 표현식이 괄호나 배열 리터럴 같은 그룹 연산자 없이 체이닝되면, 할당 표현식은 오른쪽에서 왼쪽으로 묶이지만(우측 결합), 실제 평가는 왼쪽에서 오른쪽으로 이루어짐. 
  - 예를 들어, `y = x = f()`는 `y = (x = f())`와 같은 의미지만, 평가할 때는 x가 먼저 계산되고 그 결과가 y에 할당됨.

- 할당 체이닝을 피해야하는 이유
    1. 예상치 못한 동작 : 할당 체이닝은 여러 변수를 동시에 할당하려고 할 때 예상하지 못한 동작을 초래할 수 있음.
      - 예: `let z = (y = x = f());`라는 코드에서 얼핏 보면 z, x, y 모두 선언하는 것 같지만 실제로는 z만 선언되고 y와 x는 선언되지 않았음!
    2. 변수의 범위 문제 : 이 코드가 strict 모드에서 실행되면 y와 x는 존재하지 않는 변수를 참조하게 되어 에러를 발생시킴. 
      - 반면, sloppy mode에서는 y와 x가 암묵적으로 전역 변수가 되어 의도치 않은 결과를 초래할 수 있음.
    3. 코드 가독성 저하 : 체이닝된 할당은 코드를 읽고 이해하기 어렵게 만든다. 명확하게 변수를 한 줄씩 선언하는 것이 더 직관적이며 오류를 줄이는데 도움이 됨!

## 비교 연산자
|      연산자      |                     설명                                     |                true를 반환하는 예제                |
|------------------|-------------------------------------------------------------|---------------------------------------------------|
| 동등 (`==`)        | 피연산자가 서로 같으면 true를 반환합니다.                      | `3 == var1`, `"3" == var1`, `3 == '3'`            |
| 부등 (`!=`)        | 피연산자가 서로 다르면 true를 반환합니다.                      | `var1 != 4`, `var2 != "3"`                        |
| 일치 (`===`)       | 두 피연산자의 값과 타입이 모두 같은 경우 true를 반환합니다.      | `3 === var1`                                     |
| 불일치 (`!==`)     | 피연산자의 값 또는 타입이 서로 다를 경우 true를 반환합니다.      | `var1 !== "3"`, `3 !== '3'`                      |
| 큼 (`>`)           | 왼쪽 피연산자가 오른쪽 피연산자보다 크면 true를 반환합니다.      | `var2 > var1`, `"12" > 2`                        |
| 크거나 같음 (`>=`) | 왼쪽 피연산자가 오른쪽 피연산자와 같거나 크면 true를 반환합니다.  | `var2 >= var1`, `var1 >= 3`                      |
| 작음 (`<`)         | 왼쪽 피연산자가 오른쪽 피연산자보다 작으면 true를 반환합니다.    | `var1 < var2`, `"2" < 12`                        |
| 작거나 같음 (`<=`) | 왼쪽 피연산자가 오른쪽 피연산자와 같거나 작으면 true를 반환합니다.| `var1 <= var2`, `var2 <= 5`                      |

## 비트 연산자
|     연산자            |      사용법     |                        설명                                                                    |
|-----------------------|---------------- |-----------------------------------------------------------------------------------------------|
| 비트 AND              | `a & b`         | 두 피연산자의 각 자리 비트의 값이 모두 1인 위치에 1을 반환합니다.                                  |
| 비트 OR               | `a | b`         | 두 피연산자의 각 자리 비트의 값이 모두 0인 위치에 0을 반환합니다.                                  |
| 비트 XOR              | `a ^ b`         | 두 피연산자의 각 자리 비트의 값이 서로 같은 위치에 0을 반환하고, 서로 다른 위치에 1을 반환합니다.    |
| 비트 NOT              | `~ a`           | 피연산자의 각 자리의 비트를 뒤집습니다.                                                          |
| 왼쪽 시프트            | `a << b`        | a의 이진 표현을 b만큼 왼쪽으로 이동하고, 오른쪽은 0으로 채웁니다.                                 |
| 오른쪽 시프트          | `a >> b`        | a의 이진 표현을 b만큼 오른쪽으로 이동하고, 1 미만으로 이동한 비트는 버립니다.                      |
| 부호 없는 오른쪽 시프트 | `a >>> b`       | a의 이진 표현을 b만큼 오른쪽으로 이동하고, 1 미만으로 이동한 비트는 버립니다. 왼쪽은 0으로 채웁니다.|

## 단항 연산자
- 오직 하나의 피연산자만 사용하는 연산을 의미함

1. `delete 연산자` : 객체의 속성을 삭제함.
  ```js
  delete object.property;
  delete object[propertyKey];
  delete objectName[index];
  ```
  - `delete` 연산자가 속성을 성공적으로 삭제한 이후, 해당 속성에 접근하려고 하면 `undefined`가 반환됨. 
  - `delete`는 속성을 제거할 수 있는 경우에는 `true`를 반환하고, 제거할 수 없을 땐 `false`를 반환함.
    ```js
    delete Math.PI; // false - 설정 불가한 속성 삭제 불가

    const myObj = { h:4 };
    delete myObj.h; // true - 사용자 정의 속성 삭제 가능 
    ```
2. `typeof 연산자` 
  ```js
  var myFun = new Function("5 + 2");
  typeof myFun; // function

  typeof true; // boolean
  typeof null; // object

  // 사전 정의된 객체에 대해선 아래와 같은 결과를 반환함
  typeof Date; // function
  typeof Math; // object
  typeof Option; // function
  typeof String; // function
  ```

3. `void 연산자`
  - void 연산자는 표현식을 평가하지만, 그 결과값을 반환하지 않음. 이 경우 표현식은 실행되지만, undefined를 반환함. 
  - void는 주로 불필요한 반환값을 무시하거나, 특정 행동을 방지할 때 유용하게 쓰임!!
    ```js
    void (function() {
      console.log('THis will run, but the result is ignored.');
    })();
    ```
    - `void`는 표현식을 평가하더라도 결과값이 필요하지 않은 상황에서 주로 사용됨! 반환값은 항상 `undefined`
    - 예) 링크 클릭 시 페이지 리로드 방지
      ```js
      <a href="javascript:void(0)">Click me!</a> // void(0)은 아무 값도 반환하지 않으므로 클릭해도 페이지 리로드나 다른 동작이 발생하지 않는다!
      ```
    - 예2) IIFE(즉시 실행 함수 표현식)에서 반환값 무시
      ```js
      void (function(){
        console.log("Executed, but no result!");
      })();
      ```
      - Immediately Invoked Function Expression : 함수 선언과 동시에 실행되기 때문에 코드의 스코프를 분리하고, 변수의 충돌을 피하거나 한 번만 실행해야 하는 코드를 캡슐화할 때 자주 사용됨.
      - IIFE는 함수 선언을 표현식으로 변환하기 위해 소괄호로 감싸서 사용함. 그 뒤에 나오는 `()`가 함수를 즉시 실행시키는 부분!
      - IIFE의 장점:
        - 전역 변수 오염 방지 : IIFE는 함수 안에 정의된 모든 변수를 지역 변수로 만들어 전역 변수를 오염시키지 않음.
        - 캡슐화 : IIFE 내부의 코드는 외부에서 접근할 수 없으므로 코드의 프라이버시를 유지할 수 있음.
        - 한 번만 실행되는 코드 : 한 번 실행되고 끝나는 초기화 코드나 설정 로직을 구현할 때 유용함.
      - 예)
        ```js
        const result = (function() {
          const name = "IIFE Example";
          return name;
        })();
        console.log(result); // IIFE Example <- name 변수는 IIFE 내부에서만 사용되며 외부에서 접근 불가
        ```
      - 예2) 화살표 함수로 작성!  
        ```js
        (() => {
          console.log("IIFE with arrow function");
        })();
        ```
      - 대표적 사례:
        - jQuery 플러그인 초기화 : jQuery 코드에서 DOM이 준비되자마자 바로 실행되도록 할 때 IIFE를 사용함
          ```js
          (function($) {
            // jQuery 플러그인 초기화 코드
            $(document).ready(function() {
              console.log("DOM이 준비되었습니다. jQuery 플러그인 실행.");
              // 플러그인 관련 초기화 작업
            });
          })(jQuery);
          ```
        - 모듈 패턴 : JavaScript에서 스코프를 분리하고, 외부에서는 접근하지 못하는 비공개 변수와 메서드를 만들 때 사용됨. 
          ```js
          const myModule = (function() {
            // 비공개 변수
            let privateVariable = "This is private";

            // 비공개 메서드
            function privateMethod() {
              console.log(privateVariable);
            }

            // 공개적으로 접근 가능한 메서드 반환
            return {
              publicMethod: function() {
                privateMethod(); // 비공개 메서드에 접근 가능
                console.log("This is a public method.");
              }
            };
          })();

          // 외부에서 비공개 변수나 메서드에 직접 접근할 수 없음
          // 하지만 공개 메서드를 통해 비공개 메서드 호출 가능
          myModule.publicMethod();
          // This is private
          // This is a public method.
          ```