# 숫자와 날짜
## 10진수
```js
// 10진수 리터럴도 영(0)으로 시작될 수 있다! 다만, 영(0) 다음 숫자가 8보다 작으면 그 숫자는 8진법으로 해석됨
0888; // 10진수 888로 해석됨

// 자바스크립트의 non-strict 모드에서는 숫자 앞에 0이 붙으면 8진수로 처리됨.
0777; // non-strict mode에서 10진수 511로 해석됨
```
- strict mode를 사용하면 이런 8진수 표기법은 허용되지 않음. 따라서 `0777`과 같은 표기는 오류가 발생할 수 있다!
- 대신, ES6 이후에는 명시적으로 `0o`를 사용하여 8진수를 나타냄. 

## 2진수
```js
var FLT_SINGBITT = 0b10000000000000000000000000000000; // 2147483648
```
- 2진수 구문은 앞에 오는 0과 소문자 또는 대문자 라틴 문자 B(`0B` 또는 `0b`)를 사용함.
- 0B 다음의 숫자가 0 또는 1이 아니면 `SyntaxError(Missing binary digits after 0b)` 발생.

## 8진수
```js
var n = 0755; // 493
var m = 0644; // 420
```
- 8진수 구문은 앞에 `0`을 사용함. 0 이후의 숫자가 0에서 7까지 범위 밖에 있는 경우, 숫자는 10진수로 해석됨. 
- ECMAScript 5의 Strict 모드는 8진수 구문을 금지함. 즉, 숫자 앞에 `0`을 붙여서 8진수로 표현하는 방식이 ES5 Strict 모드에서는 오류를 발생시킴. 

## 16진수
```js
0xfffffffffffffffff; // 295147905179352830000
0x123456789abcdef; // 81985529216486900
0xa; // 10
```
- 16진수 구문은 앞에 0 다음에 소문자나 대문자 라틴어 문자 `X(0X 또는 0x)`를 사용함. 
- 0x 이후 숫자가 범위(0123456789ABCDEF) 밖에 있는 경우, `SyntaxError`가 발생!

## Number 객체
`Number` 내장 객체에는 최대값, not-a-number, 무한대와 같은 숫자 상수를 위한 속성들이 있음. 이 속성의 값을 변경하는 것은 불가능하다!
```js
var biggestNum = Number.MAX_VALUE; // 표현 가능한 가장 큰 수
var smallestNum = Number.MIN_VALUE; // 표현 가능한 가장 작은 수
var infiniteNum = Number.POSITIVE_INFINITY; // 양의 무한대값, 오버 플로로 반환됨
var negInfiniteNum = Number.NEGATIVE_INFINITY; // 음의 무한대값, 오버 플로로 반환됨
var notANum = Number.NaN; // '숫자가 아닌' 특수값
```

## Date 객체
JavaScript에는 날짜 데이터 타입이 없지만, `Date` 객체와 그 메소드를 사용하여 응용 프로그램에서 날짜와 시간을 처리할 수 있다!
- `Date` 객체 만들기
  ```js
  var dateObjectName = new Date([parameters]); // parameters는 생략 가능하며, 생략 시 현재 날짜와 시간이 사용됨
  ```

- Date 객체 생성 방식
  - 현재 날짜와 시간을 생성:
    ```js
    var today = new Date();
    ```
  - 날짜를 나타내는 문자열을 사용하여 특정 날짜를 생성:
    ```js
    var Xmas95 = new Date("December 25, 1995 13:30:00"); // 시, 분, 초 생략 가능하며, 생략된 부분은 0으로 설정됨
    ```
  - 숫자 값을 사용하여 날짜 지정:
    ```js
    var Xmas95 = new Date(1995, 11, 25); // 0부터 시작하므로 11이 12월을 의미함.
    ```
  - 연도, 월, 일, 시간, 분, 초까지 모두 지정: 
    ```js
    var Xmas95 = new Date(1995, 11, 25, 9, 30, 0);
    ```

- Date 객체의 메서드
  - `get` 메서드로 날짜나 시간을 얻을 수 있음
    - `getFullYear()` : 연도를 반환
    - `getMonth()` : 월을 반환(0부터 시작) 
    - `getDate()` : 일을 반환
    - `getDay()` : 요일을 반환
  - `set` 메서드로 날짜나 시간을 설정할 수 있음
    - `setFullYear(year)` : 연도 설정
    - `setMonth(month)` : 월 설정(0부터 시작)
    - `setDate(day)` : 일 설정

- `getTime()` 메서드를 사용하면 1970년 1월 1일 00:00:00 UTC(Coordinated Universal Time - 전세계 표준 시간대)부터 특정 날짜까지의 밀리초를 반환함. 
  - 이 값을 통해 두 날짜 사이의 차이를 계산할 수 있다!
    ```js
      var today = new Date();
      var endYear = new Date(1995, 11, 31, 23, 59, 59, 999); // 999는 밀리초 - 그 해의 마지막 순간을 의미함.
      endYear.setFullYear(today.getFullYear());  // 올해의 연도로 설정

      var msPerDay = 24 * 60 * 60 * 1000;  // 하루의 밀리초 수
      var daysLeft = (endYear.getTime() - today.getTime()) / msPerDay;  // 남은 일수 계산
      daysLeft = Math.round(daysLeft);  // 소수점 반올림
      console.log(daysLeft);
    ```

# 텍스트 서식
## 이스케이프 시퀀스
이스케이프 시퀀스를 사용해야 하는 이유는 `특정 문자를 문자열 안에 직접적으로 입력할 수 없기 때문!`. 예를 들어, 다음과 같은 경우에 이스케이프 시퀀스를 사용함.
1. 특수 문자: 문자열에 포함되면 의미가 달라질 수 있는 문자(예: 따옴표`'`나 역슬래시`\`)를 표현할 때 이스케이프가 필요함
2. 비ASCII 문자: 일반 키보드로 입력하기 어려운 문자를 표현할 때도 이스케이프 시퀀스를 사용함 
    - 예: `"Hello \u00A9"`는 `"Hello ©"`라는 문자열을 만든다!
3. 유니코드 지원: 다양한 언어와 기호를 지원하기 위해 유니코드 이스케이프를 사용하여 문자를 정의할 수 있으며, 이를 통해 국제화된 애플리케이션을 쉽게 만들 수 있음!
- 이스케이프 시퀀스는 문자 인코딩의 문제를 해결하고, 코드의 가독성을 높이며, 특별한 문자(특수 문자)를 안전하게 사용할 수 있게 도와준다.
- 예)
  - 16진수 이스케이프 시퀀스
    ```js
    // 형식 : \x 뒤에 2자리 16진수 숫자가 온다.
    "\xA9"; // ©
    ```
  - 유니코드 이스케이프 시퀀스
    ```js
    // 형식 : \u 뒤에 4자리 16진수 숫자가 온다.
    "\u00A9"; // ©
    ```
  - 유니코드 코드 포인트 이스케이프(ESMAScript 6 이상)
    ```js
    // 형식 : \u{} 안에 1개 이상의 16진수 숫자가 올 수 있으며, 최대 0x10FFFF까지 사용 가능
    "\u{2F804}"; // 유니코드 코드 포인트를 표현

    // 동일한 결과를 주는 예시
    "\uD87E\uDC04"; // UTF-16 인코딩을 사용한 방법으로, 고급 유니코드 문자 표현을 위해 두 개의 이스케이프 시퀀스를 결합한 것!
    ```

## 문자열 개체
`new String("foo")`와 같이 String 생성자를 사용하여 만든 객체. 이 객체는 문자열을 wrapping한 것으로, 추가적인 메서드와 속성을 가질 수 있음.
  - 이때 생성된 객체는 기본 데이터 형식이 아닌, 객체로 취급되어 `typeof` 연산자를 사용하면 `object`로 반환됨.
    ```js
    var s = new String("foo"); // 문자열 개체 생성
    console.log(s); // Displays: { '0': 'f', '1': 'o', '2': 'o' }
    console.log(typeof s); // Returns 'object'

    ```
- 중요한 점
  - 자동 변환 : 문자열 리터럴을 사용할 때, JavaScript는 필요에 따라 자동으로 임시 문자열 개체로 변환하여 메서드를 호출하고, 이후 이 임시 객체는 사라짐
  - 변경 불가능성 : 문자열은 변경 불가능(immutable)하여, 한 번 생성된 문자열의 내용을 변경할 수 없음.
    - 특별히 String 개체를 사용해야 하는 경우가 아니라면 문자열 리터럴을 사용하는 것이 좋음!
  
## 템플릿 문자열과 Syntactic sugar
syntatcic sugar는 프로그래밍 언어에서 코드의 가독성을 높이고, 더 간단하게 작성할 수 있도록 도와주는 구문을 말함. (문법적 개선)
- JavaScript의 템플릿 문자열이 이런 syntactic sugar의 좋은 예임. 
- 전통적으로는 문자열을 연결할 때 `+ 연산자`를 사용해야 했지만, 템플릿 문자열을 사용하면 `${}` 구문을 통해 변수를 직접 문자열 안에 삽입할 수 있다!
    ```js
    var a = 5;
    var b = 10;
    console.log(`Fifteen is ${a + b} and\nnot ${2 * a + b}.`);
    // Fifteen is 15 and 
    // not 20.
    ```