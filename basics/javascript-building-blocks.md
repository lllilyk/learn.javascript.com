- 참고 : 의사 코드(Pseudocode)
    - 의사 코드는 일반적으로 사람에게 일부 코드 구문의 작동 방식을 나타내거나, 코드 아키텍처 항목의 디자인을 설명하는 데 사용되는 코드와 유사한 구문을 나타냄. (코드로 실행시키려고 하면 작동하지 않음)

# 1. 조건문
1. if ... else문 (+ else if)
    ```html
    <body>
        <label for="shopping-check">Has the shopping been done? </label>
        <input type="checkbox" id="shopping-check">

        <p></p>
        
        <script>
            const checkBox = document.querySelector('input');
            const para = document.querySelector('p');
            let shoppingDone = false;

            checkBox.addEventListener('change', () => {
                checkBox.disabled = true;
                shoppingDone = true;
                updateAllowance();
            });

            function updateAllowance() {
                let childAllowance;
                // false, undefined, null, 0, NaN이나 빈 문자열('')이 아닌 값은 조건문으로 테스트되었을 때 실제로는 True를 리턴하므로 명시적으로 === true 를 작성해줄 필요는 없음. 
                // if (shoppingDone) {...}
                if (shoppingDone === true) { 
                    childAllowance = 10;
                } else {
                    childAllowance = 5;
                }

                para.textContent = `Child has earned \$${childAllowance} this week.`; // \$는 달러기호 $를 문자열로 포함시키기 위해 사용됨. 
                // JavaScript에서 템플릿 리터럴(${}) 구문은 변수나 표현식을 문자열에 삽입하는데 사용되는데, 그 안에 $ 기호가 들어가면 혼동을 피하기 위해 이스케이프처리를 해주어야 함. 
                // 따라서 문자열 안에 달러 기호 $와 childAllowance 변수의 값을 함께 표시하기 위해 \$를 사용함!
            }

            updateAllowance();
        </script>
    </body>
    ```
2. 논리 연산자: AND, OR, NOT(!)
    - `&&(AND)` : 두 개의 조건 모두 참이어야 전체 표현식이 참으로 평가됨.
    - `||(OR)` : 두 개의 조건 중 하나라도 참이면 전체 표현식이 참(true)으로 평가됨. 
        ```js
        if (iceCreamVanOutside || houseStatus === "on fire") {
            console.log("you should leave the house quickly");
        } else {
            console.log("probably should just stay in then.");
        }
        ``` 
3. switch 문
    - case 다음에 오는 값은 옵션의 value 속성과 일치해야 함. (mdn 예제에서)
  
4. 삼항(조건)연산자(ternary or conditional operator)
    - true/false 조건 사이를 통해 선택되는 두 가지 선택을 가지고 있는 경우, if...else 블록보다 코드를 훨씬 적게 사용할 수 있음.
    - (condition) ? run this code : run this code instead
        ```html
        <label for="theme">Select Theme: </label>
        <select id="theme">
            <option value="white">White</option>
            <option value="black">Black</option>
        </select>

        <h1>This is my website</h1>
        ```
        ```js
        const select = document.querySelector("select");
        const html = document.querySelector("html");
        document.body.style.padding = "10px";

        function update(bgColor, textColor) {
            html.style.backgroundColor = bgColor;
            html.style.color = textColor;
        }

        select.onchange = function () {
            select.value === "black"
            ? update("black", "white")
            : update("white", "black");
        };
        ```
    - 예제1) 간단한 달력 만들기 (이런 실수 하지 말자..)
        - 31: 1, 3, 5, 7, 8, 10, 12 
        - 30: 4, 6, 9, 11
        - 28: 2
        ```js
        const select = document.querySelector('select');
        const list = document.querySelector('ul');
        const h1 = document.querySelector('h1');

        select.onchange = function() {
        const choice = select.value;

        // ADD CONDITIONAL HERE
        let days = 31;
        if(choice === 'Feburary') {
            days = 28;
        } else if(choice === 'April' || choice === 'June' || choice === 'September' || choice === 'November') {
            days = 30;
        }

        createCalendar(days, choice);
        }

        function createCalendar(days, choice) {
        list.innerHTML = '';
        h1.textContent = choice;
        for (let i = 1; i <= days; i++) {
            const listItem = document.createElement('li');
            listItem.textContent = i;
            list.appendChild(listItem);
        }
        }

        createCalendar(31,'January');
        ```

    - 예제2) 색깔 고르기
        ```js
        const select = document.querySelector('select');
        const html = document.querySelector('.output');

        select.onchange = function() {
            const choice = select.value;

            // ADD SWITCH STATEMENT
            switch (choice) {
                case 'white':
                    update('white', 'black');
                break;

                case 'black':
                    update('black', 'white');
                break;

                case 'purple':
                    update('purple', 'white');
                break;

                case 'yellow':
                    update('yellow', 'black');
                break;

                case 'psychedelic':
                    update('psychedelic', 'black');
                break;
            }
        }

        function update(bgColor, textColor) {
        html.style.backgroundColor = bgColor;
        html.style.color = textColor;
        }
        ```
# 2. 반복문
## for
- 카운터, 조건, 반복자가 함께 작동하여 반복문을 형성함. 각 요소는 서로 연관되어 있고, 반복문의 흐름을 제어하는 중요한 역할을 한다!
  - 카운터(counter) : 반복문이 실행되는 동안 값을 저장하는 변수로, 주로 숫자로 초기화되며 반복이 진행될 때마다 증가하거나 감소함.
  - 조건(condition) : 반복문이 계속 실행될지, 종료될지를 결정하는 논리적 표현식으로, 주로 참(true) 또는 거짓(false) 값을 반환함.
  - 반복자(iterator) : 반복문이 실행될 때 카운터의 값을 변화시키는 역할을 하는 부분으로, 일반적으로 카운터를 증가시키거나 감소시키는 연산을 포함함.
- for 반복문의 표준
    ```js
    for (초기화식; 종료 조건; 증감식) {
        // 초기화식(initializer or 반복변수 iteration variable) : 보통 숫자로 설정된 변수로, 반복문이 실행될 횟수(count)까지 증가됨. 때때로 카운터 변수(counter variable)라고 불림
        // 조건식(condition) : 언제 반복문이 반복을 멈춰야만 하는지를 정의함. 일반적으로 비교 연산자(comparision operator)를 특징으로 하는 표현식(expression)인데, 이는 종료 조건이 충족되었는지를 확인하는 테스트임.
        // 증감식(final-expression) : 이것은 반복문이 전체 반복을 거칠 때마다 항상 평가(실행)됨. 보통 카운터 변수를 증가(감소)시키기 위해, 조건이 더 이상 true가 아닌 지점에 가까워지게 하기 위해 제공됨. 

        // 실행할 코드
    }
    ```
- 고양이 예제를 for문으로
    ```js
    const cats = ["Bill", "Jeff", "Pete", "Biggles", "Jasmin"];
    let info = "My cats are called ";
    const para = document.querySelector("p");

    for (let i = 0; i < cats.length; i++) {
        if (i === cats.length - 1) {
            info += "and " + cats[i] + ".";
        } else {
            info += cats[i] + ", ";
        }
    }

    para.textContent = info;
    ```

- 또 다른 예제
    ```js
    const contacts = ["Chris:2232322", "Sarah:3453456", "Bill:7654322", "Mary:9998769", "Dianne:9384975"];
    const para = document.querySelector("p");
    const input = document.querySelector("input");
    const btn = document.querySelector("button");

    btn.addEventListener("click", () => {
        const searchName = input.value.toLowerCase();
        input.value = '';
        input.focus();
        para.textContent = '';

        // for (let contact of contacts) {...}
        for (let i = 0; i < contacts.length; i++) {
            // let splitContact = contact.split(":");
            let splitContact = contacts[i].split(":"); // ['Chris', '2232322'], ['Sarah', '3453456'], ...
            if (splitContact[0].toLowerCase() === searchName) {
                para.textContent = splitContact[0] + "'s number is " + splitContact[1] + "."; // '\'s number is '
                break; // break로 반복문 종료
            } else {
                para.textContent = "Contact not found";
            }
        }
    });
    ```

- Continue문은 break와 유사한 방식으로 작동하지만 반복문을 완전히 탈출하는 대신, 반복문의 다음 반복문으로 건너뜀. 
  
## while
- while 반복문의 표준
    ```js
    초기화식
    while (종료 조건) {
        // 실행할 코드

        // 증감식
    }
    ```
- 고양이 예제를 while문으로
    ```js
    const cats = ["Bill", "Jeff", "Pete", "Biggles", "Jasmin"];
    let info = "My cats are called ";
    const para = document.querySelector("p");

    let i = 0;

    while (i < cats.length) {
        if (i === cats.length - 1) {
            info += "and " + cats[i] + ".";
        } else {
            info += cats[i] + ", ";
        }

        i++;
    }

    para.textContent = info;
    ```

## do...while
- do...while 반복문의 표준
    ```js
    초기화식
    do {
        // 실행할 코드

        // 증감식
    } while (종료 조건)
    ```

- 고양이 예제를 do...while문으로
    ```js
    const cats = ["Bill", "Jeff", "Pete", "Biggles", "Jasmin"];
    let info = "My cats are called ";
    const para = document.querySelector("p");

    let i = 0;

    do {
        if(i === cats.length -1) {
            info += "and " + cats[i] + ".";
        } else {
            info += cats[i] + ", ";
        }

        i++;
    } while (i < cats.length);

    para.textContent = info;
    ```

# 3. 함수 
## 익명 함수
```js
// (일반) 함수 선언(function declaration) - 언제나 호이스팅(hoisting)되어서, 함수를 함수 정의 윗줄에서도 호출할 수 있고 정상적으로 동작함!
function myFunction() {
    alert("hello");
}

// 익명 함수
function () {
    alert('hello'); 
}
```
- 익명함수는 스스로 뭘 어쩌지 못하고 주로 이벤트 핸들러와 사용됨. 
    ```js
    var myButton = document.querySelector("button");

    myButton.onclick = function() {
        alert("hello");
    };
    ```
- 변수 속에도 익명함수를 넣을 수 있음. 
    ```js
    // 함수 표현식(function expression) : 아래의 형태의 함수 생성을 의미하며 함수 선언과는 다르게, 함수 표현식은 호이스팅되지 않음.
    var myGreeting = function () {
        alert("hello");
    }

    // 이 함수는 이런 방식으로 호출됨.
    myGreeting();
    ```

## 함수 스코프와 충돌(Conflicts)
- scope란? 
  - 함수를 생성할 때, 변수 및 함수 내 정의된 코드들은 그들만의 분리된 '스코프(scope)' 안에 자리하게 됨. 그 말은, 다른 함수의 내부나 외부 함수의 코드가 접근할 수 없는 그들만의 구획에 갇혀있다는 의미. 
- 전역 스코프(global scope)
  - 함수 바깥에 선언된 가장 상위 레벨의 스코프를 전역 스코프라고 부르며, 전역 스코프 내에 정의된 값들은 어느 코드든 접근이 가능함. 
- 왜 이렇게 설정되어 있을까? : 주 이유는 '안정성과 구조'
- 아... 충돌 나는 경우 예시)
  - 예를 들어, 나에게 두 개의 외부 JavaScript 파일을 호출하는 HTML이 있다고 해보자. 이 둘은 같은 이름으로 정의된 변수와 함수를 사용하고 있음. 
    ```HTML
    <script src="first.js"></script>
    <script src="second.js"></script>
    <script>
        greeting();
    </script>    
    ```
    ```js
    // first.js
    var name = "Chris";
    function greeting() {
        alert("Hello " + name + ": welcome to our company.");
    }
    ```
    ```js
    // second.js
    var name = "Myeongheon";
    function greeting() {
        alert("Our company is called " + name + ".");
    }
    ```
    - 이 때 내가 호출하고 싶은 두 함수 모두 `greeting()`이지만, 나는 오직 first.js 파일의 greeting 함수에만 접근할 수 있음. (두 번째 것은 무시됨. )
    - 추가로, second.js 파일에서 let 키워드로 name 변수를 두 번째로 선언하려고 시도하면 오류 발생함
        - 왜?
          1. 변수의 스코프 :
               - var로 선언된 변수는 함수 스코프(function scope) 또는 전역 스코프(global scope)를 가짐. 즉, var로 선언된 변수를 여러 번 선언할 수 있으며, 마지막 선언이 적용됨. 
               - 반면, let은 블록 스코프(block scope)를 가지며, 같은 스코프 내에서 중복 선언이 불가능함.
          2. 중복 선언 :
               - `first.js`에서 `var name="Chris";`로 선언된 name은 전역 스코프에 존재함.
               - `second.js`에서 `let name="Myeongheon"`로 선언하려고 하면, 이미 전역 스코프에 존재하는 name 변수가 있기 때문에 중복 선언 오류가 발생함. 
          3. TDZ(Temporal Dead Zone)
               - TDZ의 개념 : TDZ는 변수가 선언되기 전까지 그 변수에 접근할 수 없는 상태를 의미함. 즉, let이나 const로 선언된 변수는 해당 변수가 선언된 줄보다 위에서는 사용할 수 없음. 이 상태는 변수 선언이 이루어지는 시점까지 지속됨. 
               - 전역 변수와 TDZ : 전역 스코프에서 `var name = "Chris";`가 선언된 후, second.js에서 `let name="Myeongheon";`로 다시 선언하려고 할 때, JavaScript는 let 선언이 이루어지는 순간까지 해당 이름의 변수가 이미 존재하는지를 체크함. 
               - `name`이라는 이름의 변수가 전역 스코프에서 이미 선언되어 있기 때문에, `let`으로 선언하려고 할 때 TDZ에 도달하기 전에 오류가 발생함. 즉, TDZ 상태가 있는 동시에 이미 사용 가능한 `name` 변수가 있기 때문에 JavaScript는 충돌을 감지하게 됨. 
          - 따라서, `let`으로 같은 이름의 변수를 두 번째로 선언하려고 하면 `Identifier 'name' has already been declared`라는 오류가 발생하게 됨. 
- 예시)
    ```js
    <!DOCTYPE html>
    <html>
    <head>
    <title>Function Scope Example</title>
    <script>
        const x = 1; // 전역 변수

        function a() {
        const y = 2; // 함수 a의 지역 변수
        }

        function b() {
        const z = 3; // 함수 b의 지역 변수
        }

        function output(value) {
        const para = document.createElement('p');
        document.body.appendChild(para);
        para.textContent = `Value: ${value}`;
        }
    </script>
    </head>
    <body>
    <p></p>
    </body>
    </html>  
    ```

    - `output(x)` 호출 : x는 전역 스코프에 선언되었으므로, 어떤 함수에서도 접근할 수 있음. // 1
    - `output(y)와 output(z)` 호출 : 이 변수들은 각 함수의 지역 스코프에만 존재하기 때문에, 전역 스코프인 `output()` 함수에서는 접근할 수 없음. 
    - 따라서, `output(y);` 또는 `output(z);`를 호출하면 `"ReferenceError: y is not defined"`라는 오류가 발생함. 
    - 함수 내에서 output 호출하기 
        ```js
        function a() {
            const y = 2;
            output(y); // 이 함수 내에서는 y에 접근할 수 있음
        }
        ```
    - 전역 변수 x에 접근하기 
        ```js
        function a() {
            var y = 2;
            output(x); // 전역 변수 x에 접근 가능 
        }
        ```
        - x는 전역 스코프에 있기 때문에 어떤 함수에서도 접근하여 x값을 출력할 수 있음. 
  
# 4. 이벤트 입문
- 이벤트(event)란? : 내가 프로그래밍하고 있는 시스템에서 일어나는 사건(action) 혹은 발생(occurrence)인데, 이는 내가 원한다면 그것에 어떠한 방식으로 응답할 수 있도록 시스템이 말해주는 것.
  - 시스템은 이벤트가 발생될 때 몇몇 종류의 신호를 생산(produce) 또는 발생(fire)시키고, 이벤트가 발생되었을 때 사건이 자동적으로 취해질 수 있는 메커니즘(즉, 코드의 실행)을 제공함. 
- 이벤트 핸들러(event handler 또는 event Listener)란? 
  - 각각의 이용가능한 이벤트들은 이벤트 핸들러를 가지고 있는데, 이는 이벤트가 발생되면 실행되는 코드블럭(JavaScript함수)임
  - 이러한 코드 블럭이 이벤트에 응답해서 실행되기 위해 정의되었을 때, 이것을 `이벤트 핸들러를 등록(Register)`했다고 말함.
  - 이벤트 리스너는 발생되는 이벤트에 대해 듣고, 이벤트 핸들러는 발생되는 이벤트에 응답해서 실행되는 코드. 

## 이벤트 핸들러 프로퍼티
```js
const btn = document.querySelector("button");

btn.onclick = function() {...}
```
기명 함수 이름과 같은 핸들러 프로퍼티를 설정할 수 있음
```js
const btn = document.querySelector("button");

function bgChange() {...}

btn.onclick = bgChange;
```

- 각양각색의 이벤트 핸들러 프로퍼티들
  - `btn.onfocus` & `btn.onblur` : 버튼이 포커스되고 포커스가 해제되었을 때 바뀜. 
    - `btn.onmouseover`랑 다르게 버튼이 키보드에서 선택되었을 때 발생함. 즉, 사용자가 tab 키를 눌러서 버튼에 커서를 위치시킬 때!
  - `window.onkeydown` & `window.onkeyup` : 키보드에서 키가 눌렸을 때 바뀜. <- 이 이벤트 핸들러는 버튼 자체에 등록하면 작동하지 않으므로 전체 브라우저를 나타내는 window에 등록해야 함. 
  - `btn.onmouseover` & `btn.onmouseout` : 각각 마우스 포인터가 버튼 위에 올라가 있을 때, 혹은 포인터가 버튼에서 벗어났을 때 바뀜.

## 인라인 이벤트 핸들러 - 나쁜 습관
- 이벤트 핸들러 HTML 어트리뷰트(인라인 이벤트 핸들러)는 나쁜 습관으로 여겨짐. 
```js
<button onclick="alert('Hello, this is my old-fashioned event handler');">
    Press me
</button>
```
- HTML과 JavaScript를 뒤죽박죽으로 만들면 분석(parse)하기 어려워지기 때문에 좋은 방법이 아니며, 분리해야 여러 HTML 문서에 적용할 수 있으므로 유지보수를 위해 인라인 이벤트 핸들러는 지양하기.

```js
const buttons = document.querySelectorAll("button");

for (let i = 0; i < buttons.length; i++) {
    buttons[i].onclick = bgChange;
}

// NodeList 객체에서 사용 가능한 forEach() 내장 메서드 사용
buttons.forEach(function (button) {
    button.onclick = bgChange;
});
```

## addEventListener() 메서드
```js
btn.addEventListener("click", bgChange);
```
- addEventListner() 함수 내 2개의 매개변수(parameter)를 명시함. 
  1. 핸들러에 등록하고자 하는 이벤트의 이름
  2. 그것에 응답하여 실행시키고자 하는 햄들러 함수를 구성하는 코드

    ```js
    // 이벤트 핸들러 제거
    removeEventListener("click", bgChange);
    ```

- `abortSignal`을 소유하고 있는 컨트롤러에서 `abort()`를 호출하여 이벤트 핸들러를 제거하는 것도 가능함.
  ```js
  const controller = new AbortController();
  btn.addEventListener(
    "click",
    function () {...},
    { signal: controller.signal },
  ); // 이 핸들러에 AbortSignal을 전달
  ```

  ```js
  controller.abort(); // 이 컨트롤러와 연관된 모든 이벤트 핸들러를 제거
  ```
- 같은 리스너에 대해 다수의 핸들러를 등록할 수 있다는 장점이 있음
  ```js
  myElement.addEventListener("click", functionA);
  myElement.addEventListener("click", functionB); // B가 A onclick의 값을 덮어쓰지만 동작함
  ```

## 이벤트 객체
이벤트 핸들러 함수 내부에서 `event`, `evt`, `e`와 같은 이름으로 명명된 매개변수(parameter) 이것들을 `이벤트 객체`라고 부르며, 추가적인 기능과 정보를 제공하기 위해 이벤트 핸들러에 자동으로 전달됨. 
```js
function bgChange(e) {
    const rndCol = "rgb(" + random(255) + "," + random(255) + "," + random(255) + ")";
    e.target.style.backgroundColor = rndCol;
    console.log(e);
}

btn.addEventListener("click", bgChange);
```
- 위의 코드를 보면, 이벤트 객체 `e`를 함수에 포함하고, 함수에서 배경 스타일을 `e.target`(버튼 그 자체)에 설정한 것을 볼 수 있음. 
  - 이벤트 객체의 `target` 프로퍼티는 항상 이벤트가 발생된 요소에 대한 참조!
  - 이벤트 객체에는 내가 좋아하는 어떤 이름이든 사용할 수 있지만, 일관성을 위해서 일반적으로 많이 사용되는 `e/evt/event`를 사용하는 것이 좋음. 

## 기본 행동 방지하기
- `e.preventDefault()` : JavaScript의 이벤트 핸들러에서 사용되는 메서드로, 특정 이벤트의 기본 동작을 막는 역할을 함.
  - 예를 들어 폼을 제출했을 때 (양식을 모두 입력하지 않고!) 페이지가 새로고침 되는 것을 방지할 수 있음.
    ```js
    <body>
        <form id="myForm">
            <input type="text" id="name" placeholder="이름을 입력하세요" required>
            <button type="submit">제출</button>
        </form>

        <script>
            const form = document.getElementById("myForm");

            form.addEventListener('submit', function(e) {
                const nameInput = document.getElementById('name');
                if (nameInput.value.trim() === '') {
                    e.preventDefault(); // 기본 폼 제출 동작 방지
                    alert('이름을 입력해야 합니다!');
                }
            });
        </script>
    </body>
    ```

## 이벤트 버블링과 이벤트 캡처링
1. 이벤트 버블링(Event Bubbling)
    - 이벤트 버블링은 안쪽에서 바깥쪽으로 이벤트가 전파되는 방식. 즉, 특정 요소에서 발생한 이벤트가 가장 안쪽의 요소부터 시작해서 점차 그 요소를 포함하고 있는 부모 요소들로 전파됨.

    - 예를 들어, 버튼 요소를 클릭하면, 이벤트는 먼저 button 요소에서 발생하고, 그 후 div(부모 요소)로 전파됨. 이를 `이벤트 버블링`이라 부름.
        ```html
        <div id="parent">
            <button id="child">Click me</button>
        </div>
        ```
    - 이벤트가 전파되면서 상위요소들도 이 이벤트를 감지할 수 있게 되는 것!

2. 이벤트 캡처링(Event Capturing)
    - 이벤트 캡처링은 바깥쪽에서 안쪽으로 이벤트가 전파되는 방식. 즉, 이벤트가 발생할 때 가장 바깥쪽의 부모 요소에서부터 이벤트가 전파되며, 점점 더 안쪽으로 내려가서 결국 이벤트가 발생한 그 요소에 도달함. 
    - 위의 예시와 같은 HTML 구조에서 이벤트 캡처링이 일어나면, div(부모 요소)에서 먼저 이벤트가 시작되어 button으로 내려가면서 전파됨!

3. 이벤트 버블링과 캡처링을 제어하기
    - JavaScript에서는 `addEventListener` 함수의 세 번째 인자로 `true`를 전달하면 `캡처링` 단계에서 이벤트를 감지할 수 있음. 
    - `기본`적으로는 `false`로 설정되어 있어 `버블링` 단계에서 이벤트를 감지함.
        ```js
        document.getElementById('parent').addEventListener('click', () => {
            console.log('Parent clicked');
        }, true); // 캡처링 단계에서 이벤트 처리

        document.getElementById('child').addEventListener('click', () => {
            console.log('Child clicked');
        }); // 기본 - 버블링 단계에서 이벤트 처리
        ```
    - 참고 : 버블링과 캡처링 두 타입의 이벤트가 모두 존재하는 경우, `캡처링` 단계가 먼저 실행되고, 이어서 `버블링` 단계가 실행됨.

## 이벤트 위임(Event Delegation)
이벤트 버블링 덕분에 부모 요소에 하나의 이벤트 리스너만 설정해도, 자식 요소에서 발생한 이벤트를 처리할 수 있는 방식을 의미함. 
- 예를 들어, 리스트 아이템이 여러 개 있을 때, 각 아이템에 클릭 이벤트를 붙이고 싶다! -> 일반적로는 각 li태그마다 일일이 이벤트 리스너를 붙임. 
    ```html
    <ul id="list">
        <li>Item1</li>
        <li>Item2</li>
        <li>Item3</li>
    </ul>
    ```
- 근데, 이벤트 위임을 사용하면 부모인 ul 태그에 한 번만 이벤트 리스너를 설정하면 자식 li태그들에서 발생한 클릭 이벤트를 처리할 수 있음. 
    - 이벤트가 발생하면 버블링 단계에서 부모 요소인 `<ul>`로 전파되기 때문!
    ```js
    document.getElementById('list').addEventListener('click', function(event) {
        if (event.target.tagName === 'LI') { // event.target.tagName은 항상 대문자로 반환된다
            alert(event.target.textContent + 'clicked');
        }
    });
    ```

- stopPropagation()
    - 이벤트 위임처럼 `버블링`을 이용한 처리가 있을 때, 특정 상황에서는 자식 요소에서 부모까지 이벤트가 전파되지 않도록 막고 싶을 수 있음. 
    이럴때 `stopPropagation()`을 사용하면, 이벤트가 더 이상 부모로 전파되지 않게 할 수 있음.
    ```js
    video.addEventListener('click', (event) => {
        event.stopPropagation();
        video.play();
    });
    ```

# 5. 이벤트 버블링
캡처링을 활성화 하는 방법은 정해져있으니까(`addEventListener`의 세 번째 인자로 `true`넣기, `window.addEventListener`에서 캡처링, 옵션 객체에서 capture: true 설정.) 그 밖의 것은 버블링으로 볼 수 있을 듯.

```html
<!-- 이벤트 캡처링 -->
<body>
    <div id="container" style="border: 2px solid blue; padding: 20px;">
        <button id="button">Click Here!</button>
    </div>
    <pre id="output"></pre> 
    <!-- pre : preformatted text를 표시하는데 사용되는 태그 
        주요 특징 1 : <pre> 태그 내부의 텍스트는 HTML에서 입력한 그대로 공백과 줄 바꿈이 유지됨
        주요 특징 2 : <pre> 태그로 감싼 텍스트는 일반적으로 모노스페이스 폰트로 표시됨. 이는 코드 등 고정 폭 텍스트를 표현할 때 유용함.
        주요 특징 3 : 자동 줄 바꿈 없음. 텍스트가 <pre> 태그의 너비를 초과해도 자동으로 줄 바꿈되지 않음. 그 대신 사용자가 명시적으로 줄 바꿈 추가 필요! -->
    <script>
        const output = document.querySelector("#output");

        function handleClick(e) {
            output.textContent += `${e.currentTarget.tagName} 요소를 클릭했습닏다.\n`;
        }

        const container = document.querySelector("#container");

        //캡처링 활성화
        container.addEventListener("click", handleClick, { capture: true});

        const button = document.querySelector("#button");
        button.addEventListener("click", handleClick);
    </script>
</body>

```