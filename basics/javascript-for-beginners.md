# 1. JavaScript가 뭔가요?

### 웹 페이지에서 JavaScript는 어떤 일을 할까?
- JavaScript의 가장 일반적인 용도는 DOM(Document Object Model) API를 통해 HTML과 CSS를 동적으로 수정하여 사용자 인터페이스를 업데이트 하는 것. 
1. 브라우저 보안
    - 각 브라우저 탭에는 코드를 실행할 수 있는 별도의 실행 환경이 있음. 대부분의 경우 각 탭의 코드는 완전히 독립적으로 실행되며, 한 탭의 코드가 다른 탭이나 다른 웹사이트의 코드에 직접적인 영향을 미칠 수 없음. 이런 제약이 없으면 해커들이 다른 웹사이트의 정보를 훔치는 코드를 작성하는 등 나쁜 짓을 할 수 있기 때문에 중요한 보안 절차임!

2. JavaScript 실행 순서
    - 브라우저가 JavaScript 블록을 마주치면, 일반적으로는 순서대로 위에서 아래로 실행하므로, 코드 배치 순서에도 주의를 기울어야 함!
        ```js
        const para = document.querySelector("p");

        para.addEventListener("click", updateName);

        function updateName() {
            const name = prompt("Enter a new name");
            para.textContent = `Player 1: ${name}`;
        }
        ```
        코드의 처음 두 줄의 순서를 바꾸면 더 이상 작동하지 않고 브라우저 개발자 콘솔에 오류 `TypeError: para is undefined`가 나타남. 
        `para` 객체가 아직 존재하지 않으므로 이벤트 리스너를 추가할 수 없기 때문! 
    
3. 인터프리터와 컴파일러
    - `인터프리터`를 사용하는 언어에서는 코드가 위에서 아래로 실행되고 코드 실행 결과가 즉시 반환됨. 브라우저에서 코드를 실행하기 전에 코드를 다른 형태로 변환할 필요가 없음. 
    코드는 프로그래머에게 친숙한 텍스트 형식으로 수신되어 바로 처리됨

    - 반면, `컴파일러`를 사용하는 언어에서는 컴퓨터에서 실행되기 전에 다른 형태로 변환(컴파일)됨. 예를 들어, C/C++에서는 코드를 컴파일러로 기계어로 변환하여, 그 결과를 컴퓨터가 실행함. 
    프로그램은 프로그램의 원본 소스 코드에서 생성된 이진 형식(바이너리)으로부터 실행됨

    - JavaScript는 가볍고, `인터프리터`를 사용하는 프로그래밍 언어!
        - 웹 브라우저는 자바스크립트 코드를 원문 텍스트 형식으로 입력받아 실행함. 기술적인 측면으로 따지자면, 대부분의 모던 자바스크립트 인터프리터들은 실제 성능 향상을 위해 JIT(Just In TIme) 컴파일이라는 기술을 사용하는데, 스크립트의 실행과 동시에 소스 코드를 더 빠르게 실행할 수 있는 이진 형태로 변환하여 최대한 높은 실행 순서를 얻는 방법임.
        - 하지만 컴파일이 미리 처리되는 것이 아니라 런타임에 처리되기 때문에 자바스크립트는 여전히 인터프리터 언어로 분류됨. 

4. 참고
    ```js
    document.addEventListener("DOMContentLoaded", () => {
        function createParagraph() {
            const para = document.createElement("p");
            para.textContent = "You clicked the button!";
            document.body.appendChild(para);
        }

        const buttons = document.querySelectorAll("button");
        // 처음 보는 것
        for (const button of buttons) {
            button.addEventListener("click", createParagraph);
        }
    });
    ```
<br />

- `for (const button of buttons)`는 ES6에서 도입된 for...of 루프의 문법으로, 이 문법은 배열이나 iterable(반복 가능한 객체, 예를 들어 배열, 문자열, NodeList 등)의 요소를 하나씩 순회할 때 사용됨. 
    - `buttons`는 `document.querySelectorAll("button")`로 얻은 버튼 요소들의 `NodeList`이므로 `for...of 루프`를 사용할 수 있음.

5. 인라인 JavaScript 처리기 <- 사용하지 않기
    ```js
    function createParagraph() {
        const para = document.createElement("p");
        para.textContent = "You clicked the button!";
        document.body.appendChild(para);
    }
    ```

    ```html
    <button onclick="createParagraph()">Click me!</button>
    ```
    - 이렇게 JavaScript로 HTML 코드를 물들이는 것은 나쁜 방법일 뿐더러 비효율적임! JavaScript를 적용하려는 모든 버튼마다 일일히 `onclick="createParagraph()`를 추가해야하니까
    - 대신, `addEventListener` 사용하기
        - HTML에 JavaScript를 직접 넣는 대신, 순수한 JavaScript 구문 사용!
        ```js
        const buttons = document.querySelectAll("button");

        for (const button of buttons) {
            button.addEventListener("click", createParagraph);
        }
        ```

6. 스크립트 로딩 전략
- JavaScript를 사용해서 페이지 내의 요소(DOM:Document Object Model)를 조작하려고 할 때, 해당 요소를 포함한 HTML 코드보다 JavaScript를 먼저 불러와버리면 코드가 올바르게 동작하지 못함.
    - 이를 방지하기 위해 자바스크립트 코드가 `내부`에 위치하는 경우에는 `DOMContentLoaded`를 이용
        - `DOMContentLoaded` : HTML 본문 전체를 불러와 읽었다는 것을 나타내는 브라우저의 DOMContentLoaded 이벤트를 수신하는 이벤트 수신기로, 이 블록 내부의 자바스크립트는 이벤트가 발생하기 전에는 실행되지 않으므로 로딩 시점으로 인한 오류를 예방할 수 있음. 
    - 자바스크립트 코드가 `외부`에 위치하는 경우에는 `defer` 속성을 이용
        - `defer` 속성은 `<script>` 태그 요소에 도달하면 브라우저에 HTML 콘텐츠를 계속해서 다운로드하도록 지시하는 보다 최신의 JavaScript 기능.
            ```js
            <script src="script.js" defer></script>
            ```
            이 경우 스크립트와 HTML이 동시에 로드되어 코드가 작동함. 
    - 참고 : defer 특성이 오류를 예방하므로, 외부에 자바스크립트 코드가 위치하는 경우에는 DOMContentLoaded 이벤트를 사용하지 않음. (defer는 외부 스크립트에서만 작동.)

<br />

- `async`와 `defer`
    - `async` 특성을 지정하면 스크립트를 가져오는 동안 페이지 로딩을 중단하지 않음. 
        - 그러나, 다운로드가 끝나면 스크립트가 바로 실행되는데, 실행 도중에는 페이지 렌더링이 중단되며, 스크립트의 실행 순서를 보장할 방법이 없음.
    따라서 `async`는 스크립트가 서로 독립적으로 실행되고, 다른 스크립트에 의존하지 않는 경우에 사용하는 것이 가장 좋다!

            ```html
            <script async src="js/vender/jquery.js"></script>
            <script async src="js/script2.js"></script>
            <script async src="js/script3.js"></script>
            ```
            이 코드로는 스크립트가 HTML의 순서대로 불러와질 것이라고 확실하게 예측할 수가 없음. jquery.js가 script2.js 또는 script3.js의 앞이나 뒤에 로드될 수 있으며, 이 경우 스크립트가 실행될 때 jquery가 정의되지 않았기 때문에 jquery에 따라 해당 스크립트의 모든 함수가 오류를 발생시킬 수 있음. 

            따라서, `async`는 로드할 백그라운드 스크립트가 많고 가능한 빨리 제자리에 배치하고 싶을 때 사용해야 함. 예를 들어 실제로 게임이 시작될 때 필요한 게임 데이터 파일을 로드해야 하지만, 지금은 스크립트 로딩으로 인해 차단되지 않고 게임 인트로, 제목, 로비만 표시하고 싶다고 가정 아아...

    - `defer` 속성으로 로드된 스크립트는 페이지에 표시되는 순서대로 로드됨.
        - 또한, 페이지 콘텐츠를 모두 불러오기 전까지는 실행하지 않으므로, 스크립트가 DOM 위치에 의존하는 경우(예: 페이지에서 하나 이상의 요소를 수정하는 경우) 유용함.
            ```html
            <script defer src="js/vender/jquery.js"></script>
            <script defer src="js/script2.js"></script>
            <script defer src="js/script3.js"></script>
            ```
            이 코드에서는 jquery.js가 script2.js와 script3.js 보다 먼저 로드됨. 페이지 콘텐츠가 모두 로드될 때까지 실행되지 않으므로, 스크립트가 DOM의 위치에 의존하는 경우 유용!

    - 정리)
        - `async`와 `defer` 모두 브라우저가 페이지의 다른 내용을 불러오는 동안 스크립트를 별도 스레드에서 불러오게 만드므로, 스크립트를 가져오는 동안 페이지 로딩이 중단되지 않음.
        - `async` 속성을 지정한 스크립트는 다운로드가 끝나는 즉시 실행하므로 현재 페이지의 렌더링을 중단하며,특정 실행 순서가 보장되지 않음.
            - 스크립트를 즉시 실행해야 하고 종속성이 없는 경우에는 `async`
        - `defer` 속성을 지정한 스크립트는 순서를 유지한 채로 가져오며 모든 콘텐츠를 다 불러온 이후에 실행함. 
            - 다른 스크립트에 의존하거나 DOM 로딩이 필요한 스크립트에는 `defer`


# 3. JavaScript 문제 해결
- 오류의 종류
    - 일반적으로, 내 코드에서 뭔가 잘못됐다면 마주하게 될 오류에는 크게 두 종류가 있음
    - 구문 오류
        - 코드에 잘못된 철자가 있으면 발생하는 오류로, 프로그램이 아예 구동하지 못하거나 중간에 멈춰버리는 현상을 일으키며, 모종의 오류 메시지도 나타남. 
    - 논리 오류
        - 구문은 올바르지만 의도한 동작과 실제 코드에 차이가 있는 경우. 따라서 프로그램은 성공적으로 돌아가지만 잘못된 결과를 낳음. 보통 오류를 직접 가리키는 메시지가 없기 때문에 구문 오류보다도 고치기 어려운 편

# 4. JavaScript의 변수
- JavaScript는 동적 타입 언어로, 다른 언어와 달리 변수에 포함될 데이터의 유형(숫자, 문자열, 배열 등)을 지정할 필요가 없음. 
    - 예를 들어, 변수를 선언하고 따옴표로 묶은 값을 지정하면 브라우저는 변수의 값을 문자열로 인식함. 
        ```js
        let myString = "Hi";
        ```
- JavaScript의 상수
    - 상수는 선언할 때 초기화해야 하며, 상수를 초기화한 후에는 새 값을 할당할 수 없음!
        ```js
        // let
        let count; // 변수를 초기화하지 않고 선언 가능

        // const
        const count; // Uncaught SyntaxError: Missing initializer in const declaration
        
        // let
        let count = 1;
        count = 2; // 변수를 초기화한 후에도 새 값을 할당할 수 있음 (변수 재할당)
        
        // const
        const count = 1;
        count = 2; // Uncaught TypeError: Assignment to constant variable.
        ```
    - but, const를 사용하여 선언된 객체의 속성을 업데이트, 추가 또는 제거할 수 있는데, 이는 객체의 내용이 변경되더라도 상수가 여전히 동일한 객체를 가리키고 있기 때문!
        ```js
        const bird = { species: "kestrel" };
        console.log(bird.species); //kestrel

        bird.species = "Striated Caracara";
        console.log(bird.species); //Striated Caracara
        ```
- const를 사용하는 경우와 let을 사용하는 경우
    - 왜 let 대신 const를 사용할까? const를 사용하여 값의 이름을 지정하면 코드를 보는 모든 사람에게 이 이름이 다른 값에 할당되지 않음을 알리 수 있고, 이 이름을 볼 때마다 무엇을 가리키는지도 명확히 알 수 있기 때문!

    - 따라서 가능하면 `const`를 사용하고 꼭 필요한 경우 `let`을 사용해라~!

    
# 5. JavaScript의 기본적인 연산
- 숫자 체계에도 다양한 유형이 있음
    - 10진수 : 10을 기본으로 함(각 자리수에 0-9를 사용)
    - 2진수 : 10진수를 0과 1을 이용해 나타내는 데이터 타입
    - 8진수 : 10진수를 0부터 7까지의 수를 이용해 나타내는 데이터 타입
    - 16진수 : 10진수를 0부터 15까지의 수 (1~10, A~F)를 이용해 나타내는 데이터 타입 (CSS의 색상을 지정할 때 쉽게 볼 수 있음.)

- 다른 프로그래밍 언어와 달리 JavaScript는 실수와 정수 모두 Number라는 하나의 데이터 타입만 사용함. (근데 BigInt라는 또 다른 숫자 타입이 있음 : Number 워닛 값이 안정적으로 나타낼 수 있는 최대값보다도 큰 정수를 표현할 수 있는 내장 객체.)
    - 차이점 : `BigInt`는 내장 `Math` 객체의 메서드와 함께 사용할 수 없고, 연산에서 `Number`와 혼합해 사용할 수 없음. 사용하려면 먼저 같은 자료형으로 변환해야 하는데 이 경우(BigInt가 Number로 바뀌면) 정확성을 잃을 수 있으므로 주의해야 함.

- 유용한 Number 메서드들
    - `toFixed()` : 숫자를 고정된 소수점 자리수로 반올림
        ```js
        const lotsOfDecimal = 1.7665840339383;

        const twoDecimalPlaces = lotsOfDecimal.toFixed(2);
        twoDecimalPlaces;
        ```
- 산술 연산자
    - 참고로 연산에 관계된 수를 '피연산자'라고 부름
    - `**`(지수) : 왼쪽의 숫자를 오른쪽 숫자만큼 제곱함 ex) 5 ** 2 : 5의 제곱이므로 25를 반환함
        - `Math.pow()` 메서드를 사용해도 됨. ex) `Math.pow(7, 3)` 이랑 `7**3`의 결과는 같음.

# 6. 문자열 다루기
- 템플릿 리터럴 : 백틱을 사용하여 선언된 문자열
    - 특징 1 : 여러 줄로 템플릿 리터럴을 선언할 수 있음.
        ```js
        const newline = `Ond day you finally knew
        what you had to do, and began, `;
        console.log(newline);

        /*
        One day you finally knew 
        what you had to do, and began,
        */
        ```
        - 일반 문자열을 사용하여 동일한 결과를 얻으려면 문자열에 줄 바꿈 문자(`\n`)를 포함해야 함.
    - 특징 2 : JavaScript 삽입(embedding) 가능
        ```js
        const name = "Ppyong";
        const greeting = `Hello, ${name}`;
        console.log(greeting); // Hello, Ppyong
        ```

        동일한 기법을 사용하여 두 변수를 결합할 수 있음. (이렇게 문자열을 서로 연결하는 것을 concatenation(연결)이라 함)
        ```js
        const one = "Hello, ";
        const two = "my name is chris";

        const joined = `${one}${two}`;
        console.log(joined); // Hello, my name is chris
        ```
        - 템플릿 리터럴에만 `${}`를 사용할 수 있으며 일반 문자열에는 사용할 수 없음. 대신 `+` 문자열을 사용하여 일반 문자열을 연결할 수 있음.
            ```js
            const one = "Hello";
            const two = "my name is chris";
            
            console.log(one + ", " + two); // Hello, my name is chris
            ```

    - 특징 3 : JavaScript 표현식 포함 가능
        ```js
        const song = "Titanium";
        const score = 9;
        const highestScore = 10;
        const output = `I like the song ${song}. I gave it a score of ${
            (score / highestScore) * 100
        }%.`;
        console.log(output); // I like the song Titanium. I gave it a score of 90%.
        ```
- 문자열에 따옴표가 포함되는 경우의 해결방법
    - 다른 문자 중 하나를 사용하여 문자열을 선언
        ```js
        const goodQuotes2 = `She said "I'm not going in there!"`;
        ```
    - 문제가 있는 따옴표를 이스케이프하는 것. (문자를 이스케이프 처리한다는 것은 문자가 코드의 일부가 아닌 텍스트로 인식되도록 문자에 어떤 조치를 취한다는 뜻.)
        - 자바스크립트에서는 문자 바로 앞에 백슬래시를 넣어 이 작업을 수행함
        ```js
        const bigmouth = 'I\'ve got no right to take my place...';
        console.log(bigmouth); // I've got no right to take my place...
        ```
# 7. 문자열 제대로 다루기
1. 특정 문자열 찾기
    ```js
    var browserType = "mozilla";

    browserType[browserType.length -1]; // a
    ```

2. 문자열 내부의 하위 문자열 찾기 및 추출
    ```js
    var search = "mdnwebdocs";

    search.indexOf("web"); // 3
    search.indexOf("mozi"); // -1 : 발견되지 않으면 -1을 반환함
    ```

3. slice()
    ```js
    var sliceEx = "sliceCheese";
    sliceEx.slice(5, 6); // 첫 번째 파라미터는 추출을 시작할 인덱스, 두 번째 파라미터는 추출이 멈출 인덱스(포함되지 않음)을 의미함. // C

    sliceEx.slice(1); // liceCheese : 특정 인덱스 뒤의 나머지 문자를 모두 추출
    ```

# 8. 배열(Arrays)
1. split() 메서드
    - `split()` 메서드는 사용자가 원하는 매개변수로 문자열을 분리하여 배열로 표현해줌.
    ```js
    var myData = "hyeoncheol, woosung, myeongheon, dongwoo";

    var myArray = myData.split(",");
    myArray; // ['hyeoncheol', 'woosung', 'myeongheon', 'dongwoo']
    ```
2. join() 메서드
    - 배열을 다시 문자열로 만들 수 있음
    ```js
    var myNewString = myArray.join(",");
    myNewString; // 'hyeoncheol, woosung, myeongheon, dongwoo'
    ```
3. toString() 메서드
    - 배열을 문자열로 변환하는 또 다른 방법
    - join()과 달리 매개변수가 필요없어서 더 간단하지만, 대신 제약이 많음. join()을 사용하면 다른 구분자를 지정할 수 있지만, toString()은 항상 콤마를 사용함. 
    ```js
    var dogNames = ["Rocket", "Flash", "Bella", "Slugger"];
    dogNames.toString(); //Rocket,Flash,Bella,Slugger
    ```
4. push() 메서드 / pop() 메서드
    - 배열의 맨 끝에 원소를 추가 / 배열의 마지막 원소를 제거 

5. unshift() 메서드 / shift() 메서드
    - 배열의 맨 처음 부분의 원소를 추가하거나 제거
    ```js
    var myArray = [
        "hyeoncheol", 
        "woosung", 
        "myeongheon", 
        "dongwoo",
    ];

    myArray.unshift("taewoong");
    myArray; // ['taewoong', 'hyeoncheol', 'woosung', 'myeongheon', 'dongwoo']

    var removedItem = myArray.shift();
    myArray; // ['hyeoncheol', 'woosung', 'myeongheon', 'dongwoo']
    removedItem; // 'taewoong'
    ```
