# 1. 안내서 소개
- World Wide Web이란?
    - 인터넷을 통해 접근 가능한 공용 웹페이지의 상호 연결 시스템. 
    - '웹'이라고 알고 있는 시스템은 다양한 구성요소로 이루어짐
        - HTTP 프로토콜이 서버와 클라이언트 간의 데이터 전송을 관리함.
        - 웹 요소에 접근하기 위해 클라이언트는 URL(Uniform Resource Location)이라는 유일한 보편 식별자를 제공하거나, 
        또는 URI(Uniform Resource Identifier)(공식적으로는 Universal Document Identifier:UDI)를 제공해야 함.
        - HTML(HyperText Markup Language)은 웹 문서를 작성하는데 가장 많이 쓰이는 형식!

- 참고) URL과 URI의 차이!
    - URI(Uniform Resource Identifier)
        - : URI는 리소스를 식별하는 전체적인 개념으로 해당 리소스의 위치 뿐만 아니라, 리소스를 나타내는 다양한 방식으로 사용될 수 있음. 
        - URI는 크게 두 가지로 나뉨
            - URL: 리소스의 위치를 나타내는 경우
            - URN(Uniform Resource Name): 리소스의 이름만을 나타내는 경우
    - URL(Uniform Resource Locator)
        - : URL은 URI의 하위 개념으로, 리소스의 위치를 나타내는 정보. 우리가 흔히 사용하는 웹 주소.
        - 특정한 리소스를 찾기 위해 프로토콜(HTTP, FTP 등)과 위치(도메인, 경로) 정보를 포함함.
    - 정리하자면, 모든 URL은 URI이지만, 모든 URI가 URL은 아님!(URI가 더 넓은 개념이고, URL은 URI 중 위치를 제공하는 특정 방식!)

## JavaScript
- 클라이언트 측 자바스크립트
    - : 브라우저와 문서 객체 모델(DOM)을 제어하는 객체를 제공하여 코어 언어를 확장함. 
    - 예를 들어, 클라이언트 측 확장을 사용하면 애플리케이션이 HTML 양식에 요소를 배치하고 마우스 클릭, 양식 입력, 그리고 페이지 탐색 등과 같은 사용자 이벤트에 응답할 수 있음.
- 서버 측 자바스크립트
    - : 서버에서 JavaScript를 실행하는 것과 관련된 객체를 제공하여 핵심 언어를 확장함. 
    - 예를 들어, 서버 측 확장을 사용하면 애플리케이션이 데이터베이스와 통신하고, 애플리케이션의 한 호출에서 다른 애플리케이션으로 연속적인 정보를 제공하거나, 서버에서 파일을 조작할 수 있음.
- 이것은 브라우저에서 JavaScript가 웹 페이지(DOM)의 모양을 바꿀 수 있음을 의미하며, 서버의 Node.js 자바스크립트는 브라우저에 작성된 코드의 사용자 정의 요청에 응답할 수 있다!

## JavaScript와 Java
- 이 둘은 비슷하지만 근본적으로 다르다!
1. 타입 지정과 타입 검사(type checking):
    - Java는 정적 타입 언어
        - 변수의 자료형을 코드 작성 시 미리 정해야 하고, 엄격한 타입 검사를 거친다. 예를 들어 int형 변수는 숫자만 저장할 수 있고, 다른 타입으로 변환되지 않으면 오류 발생!
    - JavaScript는 동적 타입 언어로
        - 변수에 저장된 값에 따라 자동으로 타입이 결정됨. 같은 변수에 숫자도, 문자열도 저장할 수 있는 것! <- 이 때문에 자바스크립트는 자바에 비해 느슨한 타입 검사를 적용함. 
2. 언어 구문:
    - Java는 코드 작성 전에 미리 클래스를 정의하고, 그 클래스 내에서 메서드와 변수를 선언하는 클래스 기반 객체지향 언어. 
        - 모든 코드가 명확히 선언되고, 메서드나 변수를 public, private, protected로 접근 제어자를 지정해야 함.
    - JavaScript는 프로토타입 기반 객체지향 언어로, 객체의 구조를 명시적으로 선언하지 않아도 되고, 실행 도중에 객체를 동적으로 생성하고 수정할 수 있음.
        - 또한, 클래스 선언 없이도 함수나 객체를 자유롭게 정의할 수 있음!
3. 상속 모델:
    - Java는 클래스를 기반으로 한 클래스 상속을 사용함. 상속 구조가 미리 고정되어 있고, 부모 클래스의 특성을 자식 클래스가 이어받음.
    - JavaScript는 프로토타입 상속을 사용하는데, 객체를 기반으로 다른 객체를 상속받으며, 프로토타입 체인으로 이어짐. 
        - 상속 구조가 유동적이고, 필요에 따라 동적으로 상속 관계를 변경할 수 있음!
4. 코드의 복잡성:
    - Java는 엄격한 타입 지정과 클래스 선언, 접근 제어자 등 여러 규칙이 있어 코드가 상대적으로 복잡해지고, 유지보수할 때에도 신경 써야 할 부분이 많음.
    - JavaScript는 이러한 제약이 적고, 상대적으로 자유롭게 코드를 작성할 수 있어서 코드가 간단하고 유연함. 특히 웹 개발에서는 HTML이나 CSS와 함께 JavaScript가 빠르게 동작할 수 있음!
5. 사용 목적: 
    - Java는 주로 서버 애플리케이션, 안드로이드 앱 개발 등에서 많이 사용되며, 빠른 실행 속도와 시스템 안정성을 중요시함.
    - JavaScript는 주로 웹 브라우저에서 동작하는 스크립트 언어로, 웹 페이지의 동적 요소(버튼 클릭, 폼 제출 등)를 처리하는 데 많이 사용됨.

- 정리)
    ```text   
    |-----------------------------------------------|---------------------------------------------------------|
    |               JavaScript                      |                        Java                             |
    |-----------------------------------------------|---------------------------------------------------------|
    | 객체 지향                                       | 클래스 기반.                                               |
    | 객체의 타입 간에 차이 없음.                         | 객체는 클래스 계층구조를 통한 모든 상속과 함께 클래스와 인스턴스로 나뉨. |
    | 프로토타입 메커니즘을 통한 상속,                      | 클래스와 인스턴스는 동적으로 추가된 속성이나 메서드를 가질 수 없음.     |
    | 그리고 속성과 메서드는 어떤 객체든 동적으로 추가될 수 있음. |                                                         |
    |-----------------------------------------------|---------------------------------------------------------|
    | 변수 자료형이 선언되지 않음(동적 형 지정, 느슨한 형 지정). | 변수 자료형은 반드시 선언되어야 함(정적 형 지정, 강한 형 지정).       |
    |-----------------------------------------------|---------------------------------------------------------|
    | 하드 디스크에 자동으로 작성 불가.                     | 하드 디스크에 자동으로 작성 가능.                               |
    |-----------------------------------------------|---------------------------------------------------------|
    ```

## JavaScript와 ECMAScript 명세서
- JavaScript : 브라우저에서 실행되는 프로그래밍 언어. 우리가 웹 페이지를 상호작용 가능하게 만들 때 사용하는 언어!
- ECMAScript : JavaScript의 `표준화`된 버전. JavaScript는 처음에는 특정 회사(Netscape)에 의해 개발되었지만, 다양한 회사들이 이 언어를 사용하고 구현할 수 있도록 국제 표준으로 만들 필요가 있었음. 그래서 ECMA International이라는 단체에서 JavaScript의 공식 명세를 만들었고, 이 명세를 ECMAScript라고 부른다. 
- `ECMAScript는 JavaScript의 기반이 되는 표준`!

### 중요한 차이점!
- ECMAScript 명세서는 언어의 동작을 규정하는 기술적이고 표준적인 규칙의 모음. 즉, ECMAScript는 언어의 핵심 기능을 설명한 설명서라고 할 수 있음. 
    - 즉, ECMAScript는 JavaScript가 어떻게 동작해야 하는지를 정의하는 표준이고, 
    - 모든 브라우저의 JavaScript엔진 (예: V8 in Chrome, SpiderMonkey in Firefox)은 ECMAScript 표준을 따른다! 
    - 따라서 ECMAScript 명세서는 브라우저가 JavaScript를 어떻게 이해하고 처리하는지를 결정함.
    - but! DOM 같은 부분은 ECMAScript 명세에 포함되지 않고, 따로 W3C나 WHATWG에서 관리한다.
- JavaScript 문서는 실제 개발자들이 JavaScript를 어떻게 사용할지에 대한 정보를 제공함. 예를 들어, 이 문서에는 브라우저에서 자주 사용하는 API, DOM(문서 객체 모델) 같은 부분이 포함됨
- 요약하면 ECMAScript는 자바스크립트의 표준 명세로, 브라우저가 자바스크립트를 처리하는 방법을 규정하고, JavaScript 문서는 개발자가 실제로 코딩할 때 참고하는 자료임!


# 2. 문법과 자료형
## 변수
변수명은 식별자(identifiers)라고 불리며 특정 규칙을 따름. 
- JavaScript 식별자는 문자, 밑줄(_) 혹은 달러 기호($)로 시작해야 하며 첫 번째 자리 제외하고 숫자도 올 수 있음(0-9)
- 자바스크립트는 대소문자를 구별한다. 
- 적절한 변수명 예시) `Number_hits`, `temp99`, `$credit`, `_name`

## 변수 선언
1. 구조 분해 할당(Destructuring Assignment)
   - 구조분해 할당은 배열이나 객체의 값을 쉽게 추출해 변수에 할당하는 방법으로, 복잡한 데이터 구조에서 필요한 부분만 간편하게 꺼내 쓸 수 있는 기능.
   - 배열 구조 분해 : 배열에서 필요한 요소만 뽑아 변수에 할당
        ```js
        let arr = [1, 2, 3];
        let [a, b] = arr; // a= 1, b = 2 

        // let [a, b] = arr;은 구조 분해 할당을 통해 배열의 첫 번째와 두 번째 값을 각각 변수 a와 b에 할당하는 방식
        // 즉, a = arr[0]; a = 1
        // b = arr[1]; b = 2

        let colors = ['red', 'green', 'blue'];
        let [firstColor, secondColor] = colors;

        console.log(firstColor); // red
        console.log(secondColor); // green
        ```
    - 객체 구조 분해 : 객체의 속성 값을 쉽게 변수로 할당 
      - 중요한 점! 객체 구조 분해 시 `변수 이름`과 `객체의 키 이름`이 일치해야 한다는 것!
        ```js
        let obj = { name: 'Alice', age: 25 };
        let { name, age } = obj; // name = 'Alice', age = 25

        // 만약 변수명을 바꾸고 싶은 경우
        let { name: userName, age: userAge } = obj; // userName = 'Alice', userAge = 25
        ```
2. 객체 리터럴(Object Literals)
    - 객체 리터럴은 중괄호`{}` 안에 key-value 쌍을 사용하여 객체를 만드는 방법으로, javascript에서 매우 기본적이고 유용하게 사용되는 데이터 구조!
    ```js
    let person = {
        name: 'Bob',
        age: 30,
        job: 'developer'
    };
    // key(속성-property): name, age, job
    // value : Bob, 30, developer
    ```
  
    - 객체 리터럴의 단축 구문(Shorthand Property Names)
        - ES6에서 새롭게 추가된 기능으로, 객체의 키(key)와 값(value)이 같은 이름일 때, 더 짧게 쓸 수 있도록 해주는 구문
        - 기본적인 객체 생성 방법
            ```js
            let name = 'Charlie';

            let person = {
                name: name // 키는 name, 값도 name 변수에 저장된 'Charlie'
            };
            ```
        - 단축 구문 적용
            ```js
            // ES6에서는 키와 값이 같은 이름일 경우, 키를 따로 명시하지 않고, 한 번만 적어도 자동으로 객체에 같은 이름의 키와 값을 할당할 수 있음
            let name = 'Charlie';

            let person = { name }; // { name: 'Charlie' }
            ```
        - 정리
            ```js
            let age = 30;
            let city = 'New York';

            // 단축 구문 사용 전
            let person = {
                age: age,
                city: city
            };

            // 단축 구문 사용 후
            let person = { age, city }; // { age: 30, city: 'New York' }
            ```

    - 객체 리터럴의 메서드 : ES6에서는 객체에 메서드를 정의할 때 함수 표현식 없이 간단히 작성 가능!
        ```js
        let person = {
            name: 'David',
            greet() {
                console.log(`Hello, I'm ${this.name}`);
            }
        }
        ```

3. 변수 스코프(Variable Scope)
   - 스코프(Scope)는 변수가 어디에서 유효하고 접근 가능한지를 결정하는 범위.
   - 전역 스코프(Global Scope) : 프로그램 어디에서든 접근 가능한 변수를 말한다. 전역 스코프에서 선언한 `var`, `let`, `const` 모두 전역 변수가 됨. (선언되지 않은 변수(`x=42`)는 전역 스코프에 속함.)
        ```js
        var globalVar = 'I am global';
        ```

    - 함수 스코프(Function Scope) : 함수 내에서만 유효한 변수로 `var` 키워드로 선언된 변수는 함수 스코프를 가짐. 함수 안에서 선언된 변수는 함수 밖에서는 접근할 수 없음!
        ```js
        function myFunction() {
            var localVar = 'I am local';
        }

        // console.log(localVar); // 에러 발생: 함수 밖에서 접근 불가
        ```
    
    - 블록 스코프(Block Scope) : `let`과 `const`는 블록 스코프를 가지며, 중괄호{}로 감싸진 블록 내에서만 유효함.
        ```js
        if (true) {
            let blockVar = 'I exist only in this block';
            const anotherBlockVar = 'Me too';
        }

        // console.log(blockVar); // 에러 발생: 블록 밖에서 접근 불가
        ```

    - 함수 스코프랑 블록 스코프 헷갈려서 다시 정리
      - 함수 스코프
        - `var`로 선언한 변수는 함수 스코프를 따른다. 즉, `var`로 선언된 변수는 함수 내부에서만 유효함. 
        - 하지만 블록 스코프(예: if, for 등의 중괄호`{}`)는 무시함. 그래서 블록 내에서 `var`로 선언된 변수도 블록 바깥에서 접근할 수 있음.
      - 블록 스코프
        - `let`과 `const`는 블록 스코프를 따르므로 `{}`로 감싸진 블록 안에서만 유효하며, 블록 바깥에서는 접근할 수 없음. 
      - ex)
        ```js
        if (true) {
            var x = 5; // var는 블록 스코프를 무시
        }
        console.log(x); //5
        ```
        - `var`는 블록 스코프가 아니라 `함수 스코프`를 따르므로, 블록 안에서 선언해도 블록 바깥에서도 접근 가능!

      - ex2 - 함수 스코프가 동작하는 방식)
        ```js
        function myFunction() {
            var x = 10; // x는 myFunction 안에서만 유효한 변수(함수 스코프)
            if (true) {
                var y = 20; // y도 함수 스코프를 따름. 즉, myFunction 내부 어디서나 사용 가능
            }
            console.log(y); // 20 // if블록 바깥에서도 y 사용 가능
        }
        console.log(x); // ReferenceError : x is not defined(함수 밖에서는 x에 접근 불가)
        ```

## 호이스팅(Hoisting)
- JavaScript에서 호이스팅이란, 변수나 함수 선언이 코드 실행 전에 해당 스코프의 최상단으로 끌어올려지는 동작을 말함. 
- 즉, 변수나 함수 선언부는 코드 상에서 선언된 위치와 상관없이 코드의 맨 위에서 미리 처리된다는 의미.

### 함수 선언(Function Declaration)
```js
function foo() {
    console.log("Bar");
}
```
- 함수 선언은 호이스팅에 의해 코드의 최상단으로 끌어올려지므로, 함수 선언은 코드의 어디에서든 호출할 수 있다!

    ```js
    foo(); // Bar
    function foo() {
        console.log("Bar");
    }
    ```
    - `foo()` 함수 호출이 함수 선언부의 위에 있지만, 함수 선언이 호이스팅되기 때문에 문제 없이 정상적으로 작동함.
    - 즉, 함수가 선언되기 전에 호출할 수 있다는 특징이 있음.

### 함수 표현식(Function Expression)
  - 변수를 이용하여 익명 함수를 할당하는 방식
    ```js
    var baz = function() {
        console.log("Bar2");
    };
    ```
    - 중요한 점은, 함수 표현식은 호이스팅되지 않는다! 
    - 실제로는 `변수 선언만 호이스팅`되고, `함수 자체는 호이스팅되지 않음`. 함수 표현식은 실행 흐름이 해당 코드 줄에 도달했을 때 정의됨
        ```js
        baz(); // TypeError: baz is not a function

        var baz = function() {
            console.log("Bar2");
        }
        ```
    - 내부적 동작 방식
        ```js
        var baz; // 변수 선언만 호이스팅됨
        baz(); // TypeError 발생, baz는 아직 함수가 아님

        baz = function() {
            console.log("Bar2");
        }
        ```
        - 변수 `baz`는 호이스팅되었지만, 이 시점에서 `baz`는 `undefined` 상태임
        - 함수 표현식이 실행되지 않았기 때문에, `baz()`를 호출하려고 하면 TypeError가 발생!


## 데이터 타입
### Primitive Types : 
  - undefined, null, boolean, number, string, symbol(인스턴스가 고유하고 불변인 데이터 타입(ES6부터))

### Object types: 
  - 객체는 여러 값을 키-값 쌍으로 저장할 수 있는 복합 데이터 타입.

1. 숫자와 + 연산자
   - 숫자와 문자열 값 사이에 + 연산자를 포함한 식에서, JavaScript는 숫자 값을 문자열로 반환함. 
        ```js
        x = "The answer is " + 42; // "The answer is 42"
        ```
2. 문자열을 숫자로 변환하기
   - `parseInt()` 함수는 문자열 인자를 파싱하여 특정 진수의 정수를 반환함.
     - `parseInt(string, radix);` 또는 `parseInt(string);`
     - 잘 사용하기 위해서는 항상 진법(Radix) 매개변수를 포함해야 하며, `parseInt`는 오직 정수만 반환하므로, 소수에서는 사용성이 떨어짐. 
        ```js
        console.log(parseInt('123')); // 123 - 기본은 10진수
        console.log(parseInt('123', 10)); // 123 - 명시적으로 10진수 지정
        console.log(parseInt('    123   ')); // 123 - 공백은 무시됨
        console.log(parseInt('077')); // 77 - 0은 무시됨
        console.log(parseInt('1.9')); // 1 - 소수 부분이 잘려 나감
        console.log(parseInt('ff', 16)); // 255 - 소문자 16진수
        console.log(parseInt('0xFF', 16)); // 255 - 대문자 16진수와 Ox 접두사
        console.log(parseInt('xyz')); // NaN - 입력을 정수로 변환할 수 없음
        ```
       - 16진수 : 0부터 9까지의 숫자와 A부터 F(a~f)까지의 알파벳을 사용하여 수를 표현함. 
       - 16진수 기본 개념 : 16진수는 0에서 15까지의 수를 표현하는 숫자 체계로, 10부터 15는 각각 다음과 같은 알파벳으로 표현됨.
         - 10: A(a), 11: B(b), 12: C(c), 13: D(d), 14: E(e), 15: F(f) 
       - 소문자와 대문자
         - 소문자 16진수 : a, b, c, d, e, f를 사용하여 16진수를 표현
           - 예: ff는 16진수 255를 나타낸다. (15 * 16^1 + 15 * 16^0 = 255).
         - 대문자 16진수 : A, B, C, D, E, F를 사용하여 16진수를 표현
           - 예: 0xFF는 16진수 255를 나타내며, 0x는 16진수라는 것을 명시하는 접두사!
   - `parseFloat()` 함수는 주어진 값을 필요할 경우 문자열로 변환한 후 부동소수점 실수로 파싱해 반환함.
     - 부동 소수점 : 수를 지수 형태로 표현하는 방식. 
        ```js
        function circumference(r) {
        return parseFloat(r) * 2.0 * Math.PI;
        }

        console.log(circumference(4.567));
        // 예상 출력: 28.695307297889173

        console.log(circumference('4.567abcdefgh')); // 숫자 부분인 4.567만을 읽어 변환하고 나머지 문자는 무시함
        // 예상 출력: 28.695307297889173

        console.log(circumference('abcdefgh')); // 숫자가 전혀 없으므로 NaN을 반환
        // 예상 출력: NaN
        ```
## 리터럴
### 배열 리터럴
  - 0개 이상의 식(expression) 목록으로, 각 식은 배열 요소를 나타내고 대괄호[]로 묶임. 
  - 모든 요소를 지정할 필요는 없다!
  - `let fisth = ["Lion", , "Angel"];` 이런식으로 잇달아 두 개의 쉼표를 두면, 배열은 지정되지 않은 요소를 `undefined`로 채움
  - 요소 목록을 후행 쉼표로 끝내면, 그 쉼표는 무시되지만 구 버전 브라우저에서는 오류를 유발할 수 있다고 하므로 제거하는게 제일 좋음!
### 정수 리터럴
  - 10진수, 16진수, 8진수 및 2진수로 표현될 수 있다.
  - 10진수: 0으로 시작하지 않는 숫자열로 구성됨
    - 예: 0, 117, 123456789123456789`n (BigInt)`
  - 8진수: 0으로 시작하거나 0o(또는 0O)로 시작하며, 숫자 0-7만 포함할 수 있음
    - 예: 015, 0001, 0o777777777777`n`
  - 16진수: 0x(또는 0X)로 시작하며, 숫자(0-9) 및 문자(a-f, A-F)를 포함할 수 있음
    - 예: 0x1123, 0x00111, 0x123456789ABCDEF`n`
  - 2진수: 0b(또는 0B)로 시작하며, 숫자 0과 1만 포함할 수 있음
    - 예: 0b11, 0b0011, 0b11101001010101010101`n` // n으로 끝나는 숫자열은 `Bigint` 리터럴임을 나타냄 <- 큰 정수를 나타내기 위해 사용하는 데이터 타입
### 향상된 객체 리터럴(ES2015-ES6)
   1. 프로토타입 설정
      - `__proto__` 속성: 이 속성을 사용하여 객체의 프로토타입을 설정할 수 있음. 객체는 다른 객체로부터 속성과 메서드를 상속받을 수 있는데, 이를 위해 프로토타입 체인을 설정하는 것이 중요하다!

        ```js
        const theProtoObj = {
        greet() {
            return "Hello!";
        }
        };

        const obj = {
        __proto__: theProtoObj, // 프로토타입 설정
        showGreeting() {
            return this.greet(); // 프로토타입에서 상속받은 메서드 호출
        }
        };

        console.log(obj.showGreeting()); // Hello!
        ```
      - `obj`는 theProtoObj를 프로토타입으로 설정하여 greet 메서드를 사용할 수 있게 됨

   2.  단축 표기
       - 속성명과 변수명이 동일한 경우: 속성과 변수가 동일한 이름을 가질 때, foo: foo 대신 그냥 foo로 간략하게 작성할 수 있다!
            ```js
            const foo = "bar";

            const obj = {
            foo // 속성명과 변수명이 동일하므로 간략하게 작성 가능
            };

            console.log(obj.foo); // bar
            ```
          - 이 경우 foo 속성의 값은 변수 foo의 값으로 설정됨

   3. 메서드 정의
       - 간단한 메서드 정의: 객체 내에 메서드를 정의할 때, 전통적인 방식인 methodName: function() {...} 대신 methodName() {...}와 같은 간단한 구문을 사용할 수 있음
            ```js
            const obj = {
            greet() {
                return "Hello!";
            }
            };

            console.log(obj.greet()); // Hello!
            ```

   4. 동적 속성명 계산
      - 동적 속성명: `대괄호([])`를 사용하여 객체의 속성명을 코드 실행 시점에 계산하여 생성하는 것을 의미함. 이 방식은 속성명을 문자열 표현식으로 동적으로 생성할 수 있게 해 줌.

            ```js
            const dynamicKey = "prop";
            const obj = {
            [dynamicKey + "_1"]: "value1", // "prop_1": "value1"
            [dynamicKey + "_2"]: "value2"  // "prop_2": "value2"
            };

            console.log(obj.prop_1); // value1
            console.log(obj.prop_2); // value2

            //아래는 더 복잡한 동적 속성명 계산의 예입니다.

            var obj = {
            ["prop_" + (() => 42)()]: 42 // "prop_42": 42
            };

            console.log(obj.prop_42); // 42
            ```
        - 여기서 `(() => 42)()`는 화살표 함수로, 이 함수는 42라는 값을 반환함. `()`를 붙이면 함수가 즉시 실행됨. 이 결과가 `prop_`과 결합되어 `prop_42`라는 속성명이 만들어진다!
### 정규식 리터럴(regular expression literal)
- 정규 표현식을 직접 코드에서 정의하는 방식으로, 슬래시(/)로 감싸서 표현됨. 코드에서 간단하게 패턴을 정의할 때 사용됨!
    ```js
    let regex = /abc/;
    console.log(regex.test("abc")); // true <- /abc/가 정규식 리터럴로, 문자열 "abc"가 이 패턴에 일치하는지를 확인함
    ```

### 정규 표현식(regular expression)
- https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_expressions
- 문자열에서 패턴을 찾기 위한 규칙을 정의한 객체로, 리터럴 방식 외에도 `RegExp` 생성자를 사용해 동적으로 만들 수 있음. 
    ```js
    let regex = new RegExp("abc");
    console.log(regex.test("abc")); // true
    ```
- 정규 표현식 생성자 `RegExp`는 패턴을 동적으로 만들 때 유용함. 예를 들어, 검색어를 사용자로부터 입력받아 그 값으로 정규식을 만들고 싶을 때 사용할 수 있음!
    ```js
    let input = "abc";
    let legex = new RegExp(input); // RegExp 생성자는 input 변수의 값을 동적으로 패턴으로 변환함.
    console.log(regex.test("abc")); // true
    ```
    - 이 방식은 정규식 리터럴 `/abc/`를 사용할 수 없는 경우, 즉 사용자 입력 등의 경우에 유연하게 패턴을 만들 때 사용됨!


### 참고.
`리터럴`이 붙은 것과 안 붙은 것의 차이가 뭘까
- 문자열 vs 문자열 리터럴
  - 문자열 : 일반적인 텍스트 데이터를 의미하며, 자바스크립트에서 큰 따옴표 또는 작은 따옴표로 묶어서 표현함.
  - 문자열 리터럴 : 특정한 구문 규칙을 따르는 형태의 문자열 표현으로, 자바스크립트에서는 큰 따옴표, 작은 따옴표, 또는 백틱(```)을 사용한 텍스트를 문자열 리터럴이라 함.
- 객체 vs 객체 리터럴
  - 객체 : 자바스크립트의 자료 구조
  - 객체 리터럴 : 중괄호{}를 사용하여 직접 객체를 정의하는 구문 `let obj = { name :"John" }`
음
```js
// 문자열 리터럴
const strLiteral = "Hello, world!";

// 비리터럴(String 객체)
const strObject = new String("Hello, world!"); 

// 숫자 리터럴
const numLiteral = 42;

// 비리터럴(Number 객체)
const numObject = new Number(42); 

// 배열 리터럴
const arrLiteral = [1, 2, 3]; 

// 비리터럴(Array 객체)
const arrObject = new Array(1, 2, 3);

// 객체 리터럴
const objLiteral = { name: "John", age: 30 };

// 비리터럴(Object 객체)
const objObject = new Object({ name: "John", age: 30 });
```
- 리터럴은 해당 타입의 값이 직접적으로 나타나는 경우, 비리터럴은 객체를 생성하는 생성자 함수`new Object()`를 사용할 때를 의미함. 

### 문자열에서 특수 문자 사용
```text
    |----------|------------------------|
    | 특수문자  |         설명           |
    |----------|------------------------|
    | \0       | Null Byte              |
    | \b       | Backspace              |
    | \f       | Form feed              |
    | \n       | New line               |
    | \r       | Carriage return        |
    | \t       | Tab                    |
    | \v       | Vertical tab           |
    | \'       | Apostrophe             |
    | \"       | 큰 따옴표               |
    | \\       | 백슬래시                |
    |----------|------------------------|
```
  - `Backspace(\b)`는 문자열에서 마지막 문자를 제거하는 기능으로, 주로 콘솔 출력에서 사용됨. 
  - `Form feed(\f)`는 인쇄에서 다음 페이지로 넘어가는 명령을 의미하며, 더 이상 사용되지 않는다고 함! 첨봤다
  - `Carriage return(\r)`은 커서를 줄의 시작으로 이동시키는 것으로, `Windows` 시스템에서 줄바꿈을 나타내는 데 사용됨.
  - 현재는 줄바꿈에 주로 `\n(new line)`만 사용되며, 그 외에는 주로 레거시 시스템에서 사용되는 개념
  - 문자 이스케이프
    - `\'` : 작은 따옴표를 문자열에 포함할 수 있게 해줌 
    - `\"` : 큰 따옴표를 문자열에 포함할 수 있게 해줌
        ```js
        var quote = "He read \"The Cremation of Sam McGee\" by R.W. Service.";
        console.log(quote); // He read "The Cremation of Sam McGee" by R.W. Service.
        ```
    - `\\` : 문자열 내에서 백슬래시를 포함할 수 있게 해줌