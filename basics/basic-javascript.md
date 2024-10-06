
# 7. JavaScript 기본
JavaScript란? HTML 문서에 적용될 때, 웹사이트상에서 동적 상호작용성을 제공할 수 있는 완전한 동적 프로그래밍 언어.

- 개발자들이 코어 JavaScript 언어 위에서 동작하는 많은 다양한 도구들을 개발해왔는데, 이를 이용하면 최소한의 수고로 엄청 많은 확장 기능을 사용할 수 있음. 
- `브라우저 응용 프로그래밍 인터페이스(APIs)` 
  <br />
  : 브라우저에 내장된 API로 HTML을 동적으로 생성하고 CSS 스타일을 설정하는 등 다양한 기능을 제공함. 

  * API(Application Programming Interface)
    <br />
    : 소프트웨어 프로그램(애플리케이션) 내부에 존재하는 기능 및 규칙의 집합. <br />
      웹 개발에서 보통 API는 개발자가 앱을 통해 사용자의 웹 브라우저에서 상호작용할 수 있도록 하는 코드 기능들(methods, properties, events, URLs ...), 사용자의 컴퓨터 상에 있는 다른 소프트웨어 및 하드웨어, 또는 서드파티 웹 사이트나 서비스의 집합을 의미함. 
    <br />
    - ex) DOM(Document Object Model) API : HTML 문서의 구조를 동적으로 변경하거나, 요소를 추가/삭제하는 등의 작업을 할 수 있음. 
    - ex2) CSSOM API : 자바스크립트를 사용해 CSS 스타일을 동적으로 조작할 수 있음. 
    
<br />

- `제 3자 (Third-Party) API`
    <br />
    : 서드파티 API는 다른 서비스 제공자들이 제공하는 API로, 이를 통해 외부 서비스의 데이터를 가져오거나, 기능을 통합할 수 있음. 이를 활용하면 해당 서비스의 기능을 직접 구현하지 않아도 특정 기능을 빠르게 웹사이트에 쉽게 추가할 수 있음. 
    ```javascript
    // 트위터 API 예시
    fetch('https://api.twitter.com/2/tweets?ids=1453489038376136711', {
      headers: {
        'Authorization': 'Bearer Your_ACCESS_TOKEN' // 트위터에서 발급받은 토큰
      }
    })

      .then(response => response.json())
      .then(data =>{
        console.log(data);
        // 받아온 데이터를 웹 페이지에 표시하는 로직 추가
      })
      .catch(error => console.error('Error:', error));
    ```


- `third-party 프레임워크와 라이브러리`
  <br />
  : 외부에서 제공되는 코드 모음으로, 특정 기능을 쉽게 구현할 수 있도록 도와줌. 대표적인 예로 jQuery, React, Bootstrap 등이 있음. 
    이러한 프레임워크나 라이브러리를 적용하면 복잡한 기능을 빠르고 간편하게 구현할 수 있음.
  <br />
  - 1. jQuery - 라이브러리(DOM 조작, 이벤트 처리)
    - 라이브러리는 특정 기능을 쉽게 사용할 수 있게 해주는 코드 모음
    - jQuery는 자바스크립트 작업을 간편하게 해주는 DOM 조작, 이벤트 처리, AJAX 기능을 포함한 라이브러리임
  <br />
  - 2. React - 라이브러리(UI 구성 및 렌더링)
    - React는 사용자 인터페이스(UI)를 만들기 위한 라이브러리
    - Component 기반으로 UI를 효율적으로 관리하고 렌더링을 최적화함
    - React UI만 담당하며, 애플리케이션 전체 구조는 제공하지 않기 때문에 프레임워크가 아닌 라이브러리로 간주됨
<br />
  - 3. Bootstrap - 프레임워크(CSS 기반의 웹 디자인 프레임워크)
    - 프레임워크는 애플리케이션을 구축하는 데 필요한 여러 도구와 규칙을 제공하는 더 큰 구조
    - Bootstrap은 CSS 프레임워크로, 미리 만들어진 CSS 스타일과 UI 구성 요소(버튼, 폼, 그리드 시스템 등)를 제공함
    - 레이아웃과 스타일링을 빠르게 적용해 웹사이트를 빠르게 구축할 수 있도록 도움. 
<br />

  - *AJAX(Asynchronous JavaScript and XML)
  <br />
    : 자바스크립트를 사용해 웹 페이지에서 서버와 비동기 방식으로 데이터를 주고받는 기술로, 페이지를 새로고침하지 않고 서버에서 데이터를 가져오거나 서버에 데이터를 전송할 수 있음. 
    <br />
    - 예시)
    - 1. Vanilla JavaScript (Fetch API 사용)
      ```javascript
      // 서버에서 데이터를 가져오는 예시 (GET 요청)
      fetch('/api/data')
        .then(response => response.json())
        .then(data => {
          console.log(data);
          ...
        })
        .catch(error => console.error('Error >> ', error));
      ```
    - 2. jQuery (AJAX 사용)
      ```javascript
      // jQuery의 $.ajax 함수를 사용한 GET 요청
      $.ajax({
        url: '/api/data',
        method: 'GET',
        success: function(data) {
          console.log(data);
          ...
        },
        error: function(xhr, status, error) {
          console.error('Error >> ', error);
        }
      });
      ```
  <br />

  - AJAX : 서버와 비동기적으로 데이터를 주고받는 개념. 이 개념을 구현하는 다양한 기술이 존재함.
    - XMLHttpRequest : AJAX를 구현하는 전통적인 방법
    - fetch API : 현대적인 AJAX 구현 방식 중 하나로, Promise 기반으로 동작하여 XMLHttpRequest 보다 간결하고 사용하기 쉬움
    - AJAX는 개념이고, fetch API와 XMLHttpRequest는 그 개념을 구현하는 도구

    <br />

    - fetch API와 XMLHttpRequest의 차이점
      - fetch API : fetch는 `Promise` 기반이기 때문에, `.then()`이나 `async/await`와 같은 현대적인 비동기 처리 방식을 지원함. 따라서 코드가 간결하고, 비동기 작업을 처리할 때 가독성이 높아짐
      - XMLHttpRequest : 오랜 시간 동안 지원되어 왔고, 오래된 브라우저까지 호환성을 제공함. 하지만 콜백 기반의 비동기 처리이기 때문에 코드가 복잡해질 수 있으며, `fetch`에 비해 문법이 다소 직관적이지 않을 수 있음. 
      ```js
      var xhr = new XMLHttpRequest(); // 서버와의 HTTP 요청을 비동기적으로 처리할 수 있도록 XHLHttpRequest 객체를 새로 생성
      xhr.open('GET', '/api/data', true); // true : 비동기적으로 요청할지 여부를 지정. true는 비동기 방식, false는 동기 방식이며 대부분 true로 설정. 
      xhr.onload = function() { // 요청이 성공적으로 완료되었을 때 실행하는 이벤트 핸들러
        if(xhr.status === 200) { // 서버의 응답 상태 코드가 '성공'일 경우에만 내부 로직을 실행함. 
          console.log(JSON.parse(xhr.responseText)); // 서버로부터 받은 응답 데이터를 JSON 형식으로 변환 후 콘솔에 출력
        }
      };
      xhr.onerror = function() { // 요청이 실패했을 때 실행되는 이벤트 핸들러 - 네트워크 에러 또는 요청 자체가 실패했을 경우에 호출됨
        console.error('Error >> ', xhr.statusText);
      };
      xhr.send(); // 준비된 요청을 서버에 실제로 전송하는 코드. GET 요청에서는 send()에 인자를 넘기지 않지만, POST 요청에서는 여기에 데이터를 포함시킬 수 있음. 
      ```
  <br />
  - 왜 XMLHttpRequest 방식을 아직도 사용하는가?

    - 1. 레거시 코드 및 브라우저 호환성(IE11 이하를 지원해야 하는 프로젝트의 경우 fetchAPI 지원x)

    - 2. fetch의 한계
      - 자동으로 처리되지 않는 타임아웃 : fetchAPI는 타임아웃에 대한 기본적인 지원이 없기 때문에, 이를 설정하려면 수동으로 타이머를 추가해야 함. 반면, XMLHttpRequest는 타임아웃 처리 가능

      - CORS(Cross-Origin Resourse Sharing) 에러 처리 : fetch는 CORS 에러가 발생하면 단순히 실패로 처리할 뿐, 에러 내용을 정확히 반환하지 않음. 반면, XMLHttpRequest는 CORS 에러에 대해 보다 세부적인 제어가 가능함. 
        - CORS(Cross-Origin Resource Sharing)란? (브라우저 보안 정책)
          - CORS는 브라우저가 다른 도메인에서 리소스를 요청할 때 발생하는 보안 정책으로, 기본적으로 브라우저가 다른 출처(origin)에서 데이터를 요청하는 것을 차단함. 
          - 예를 들어, `https://example.com`에서 `https://api.someotherdomain.com`으로 데이터를 요청하면, 브라우저는 이를 '교차 출처 요청'으로 간주하고 차단할 수 있음.
          - 그러나 서버에서 CORS 헤더(예: `Access-Control-Allow-Origin`)을 적절하게 설정하면, 특정 출처로부터의 요청을 허용할 수 있음. 이 헤더를 통해 브라우저는 특정 도메인에서 온 요청을 허용할지 판단하게 됨!!
      <br />
      - Fetch와 CORS 에러 처리 : `fetch API`는 CORS 요청을 보낼 때, CORS 에러가 발생해도 그저 실패로 처리함. 에러에 대한 구체적인 메시지를 반환하지 않기 때문에, 개발자는 단순히 '요청이 실패했다.'는 사실만 알 수 있고, CORS 에러인지 아닌지 구분하기 어려움.

      - XMLHttpRequest와 CORS 에러 처리 : 조금 더 세부적인 CORS 에러 처리 기능을 제공함. 브라우저가 서버로부터 적절한 CORS 헤더를 받지 못했을 때, CORS 요청이 실패하면 응답 상태 코드와 상태 텍스트를 이용해 조금 더 구체적인 오류 정보를 얻을 수 있음.
        ```js
        ...
        xhr.onload = function() {
          if (xhr.status === 200) {
            ...
          } else {
            console.error('Error >> ', xhr.status, xhr.statusText); // 상태 코드와 상태 텍스트 출력
          }
        };
        ...
        ```

        => XMLHttpRequest는 `onload` 핸들러 안에서 HTTP 상태 코드 와 상태 텍스트를 이용해 CORS 요청이 실패했을 때 어떤 문제가 발생했는지 구체적으로 확인할 수 있음. CORS 문제가 있는 경우, status는 0을 반환할 수도 있음

      <br />

        - HTTP 상태 코드<br />

          - 200<br />
          - 401(Unauthorized: 인증 필요)<br />
          - 403(Forbidden: 금지됨 - 권한 문제(인증)로 금지된 경우가 많음)<br />
          - 404(Not Found: 찾을 수 없음 - 클라이언트가 요청한 리소스가 서버에 존재하지 않거나, 잘못된 URL로 접근했을 때 발생함)<br />
          - 500(Internal Server Error: 내부 서버 오류 - 서버에서 요청을 처리하는 중에 예기치 않은 오류가 발생했음을 의미)<br />
        <br />
    - 3. 더 강력한 요청 처리 기능
      - 업로드 진행 상태 : XMLHttpRequest는 업로드 및 다운로드 진행 상태를 모니터링할 수 있는 이벤트를 제공함. 대용량 파일 업로드나 다운로드의 진행 상황을 확인해야 할 때 유용함. 
      - fetch API는 이와 관련된 기능을 제공하지 않기 때문에 이런 기능이 필요한 경우에는 AJAX를 사용하게 됨.
        ```js
        xhr.upload.onprogress = function(event) { // XMLHttpRequest 객체의 upload 속성에서 발생하는 진행 상황 이벤트를 처리함. onprogress는 파일 업로드가 진행될 때마다 호출되는 이벤트 핸들러. 
          if (event.lengthComputable) { // 업로드 중인 데이터의 총 크기가 계산 가능한지 확인 -> 이 값이 true이면 event.loaded와 event.total을 통해 파일 업로드 진행 상황을 추적할 수 있음
            var percentComplete = (event.loaded / event.total) * 100; // 업로드된 바이트 수를 총 바이트 수로 나누고 100을 곱해서 업로드 진행률을 계산함.
            console.log(`Upload progress: ${percentComplete}%`);
          }
        };
        ```
<br />

```js
// main.js

let myHeading = document.querySelector("h1");
myHeading.textContent = "Hello World";
```
<br />

- Node.textContent : 노드의 `textContent`를 설정하면, 노드의 모든 자식을 주어진 문자열로 이루어진 하나의 텍스트 노드로 대치함. (자식이 없는 경우 빈 문자열)
- innerText와의 차이점 
    - `textContent`는 `<script>`와 `<style>` 요소를 포함한 모든 요소의 콘텐츠를 가져옴. 
        - 반면, `innerText`는 사람이 읽을 수 있는 요소만 처리함. 
    - `textContent`는 노드의 모든 요소를 반환함. 그에 비해 `innerText`는 스타일링을 고려하며, 숨겨진 요소의 텍스트는 반환하지 않음.
        - 이게 무슨말이냐, 
            <br />
            예를 들어, CSS에서 `display: none;, visibility: hidden;, opacity: 0;`처럼 스타일을 적용해 '보이지 않게' 설정한 요소가 있으면, 그 요소의 텍스트는 `innerText`를 사용했을 때 반환되지 않음. 
- innerHTML과의 차이점
    - `Element.innerHTML`은 이름 그대로 HTML을 반환함. 간혹 innerHTML을 사용해 요소의 텍스트를 가져오거나 쓰는 경우가 있지만, HTML로 분석할 필요가 없다는 점에서 `textContent`의 성능이 더 좋음.
- 또한, `textContent`는 XSS 공격의 위험이 없음. 
- 예제)
    ```html
    <div id="divA">This is <span>some</span> text!</div>
    ```
    이렇게 `textContent`를 사용해서 요소의 텍스트 콘텐츠를 가져오거나, 
    ```js
    let text = document.getElementById("divA").textContent; //This is some text!
    ```
    텍스트 내용을 설정할 수 있음
    ```js
    document.getElementById("divA").textContent = "This text is different!";
    ```
<br />

- 참고 1 : `<script>` 요소를 HTML 파일의 맨 아래쪽 근처에 둔 이유는 HTML은 파일 내에 나타나는 순서대로 브라우저에 로드되기 때문!
- 참고 2 : `querySelector()`와 `textContent` 이 두 기능은 모두 문서를 조작할 때 사용하는 문서 객체 모델(Document Object Model:DOM) API의 일부임.

    - DOM(Document Object Model)이란?
    <br />
    : HTML, XML 문서의 구조화된 표현을 제공하는 프로그래밍 인터페이스. 
      웹 페이지가 로드되면 브라우저는 해당 페이지의 구조를 트리 형태로 표현하는 DOM 트리를 만드는데, 이 트리는 각 요소를 노드로 표현하며 웹 개발자가 자바스크립트 등을 통해 페이지의 요소들을 동적으로 조작할 수 있게 해 줌. 

      <br />

      DOM을 통해 개발자는 다음과 같은 작업을 할 수 있음:
      1. 문서 구조 탐색 : 웹 페이지의 각 요소를 선택하거나 찾아낼 수 있음. 
        예) document.querySelector(), document.getElementById()
      2. 요소 조작 : 페이지의 내용, 속성, 스타일 등을 동적으로 변경할 수 있음.
        예) element.textContent, element.style
      3. 이벤트 처리 : 버튼 클릭, 입력, 마우스 이동 같은 사용자 상호작용에 대해 응답하는 코드를 작성할 수 있음. 
        예) element.addEventListenr()
    => DOM은 웹 페이지의 '프로그래밍 가능한' 구조를 제공하여, 페이지의 내용을 실시간으로 업데이트하거나 변경할 수 있게 함.

- 참고 3 : JavaScript의 세미콜론에 대한 가이드
    - 세미콜론은 언제 필요할까? 
        - 필수 : 두 문장이 같은 줄에 있는 경우 / 선택 : 문장 이후
            - JavaScript에서 세미콜론은 코드의 구문을 끝내는 데 사용되지만, 구문 뒤에 줄 바꿈이 오는 경우(또는 블록에 문장이 하나만 있는 경우) 생략할 수 있음. 
            ```js
            var i = 0; 1++ // 세미콜론 필수 (새로운 라인 이전에는 선택 사항)
                        
            var i = 0 // 세미콜론은 선택
                i++ // 세미콜론은 선택
            ```
        <br />
    
    - 세미콜론을 사용하지 않는 경우는?
        - 1. 닫는 중괄호`}` 뒤에는 세미콜론을 쓰지 않는다. 자바스크립트가 중괄호로 묶인 블록을 하나의 구문으로 간주하기 때문!
            ```js
            // 세미콜론을 쓰지 않는 경우:
            if (condition) { /* 코드 */ }
            for (let i=0; i<10; i++) { /* 반복문 */ }
            while (condition) { /* 코드 */ }
            
            // 세미콜론이 필요한 예외:
            var obj = {}; // 객체를 변수에 할당했기 때문에 여기서는 세미콜론이 필요함
            ```

            예외: `do... while`문에서는 세미콜론이 필요함
            ```js
            do {
                /* 코드 */
            } while (condition); // 여기에는 세미콜론이 있어야 함
            ```
        - 2. if, for, while, switch 문의 괄호 뒤에는 세미콜론을 쓰지 않는다. 
            조건문(if, for, while, switch)의 괄호 뒤에 세미콜론을 붙이면 자바스크립트는 괄호 안의 조건문을 무시하고 그 뒤에 나오는 코드를 독립적인 구문으로 간주하기 때문!
            잘못된 예)
            ```js
            if (0 === 1); {
                alert("hi"); // 세미콜론이 조건문을 끊어버림
            }
            ```
        - 3. for 루프 내에서는 두 개의 세미콜론만 사용한다. 
            for 루프의 괄호 안에서는 초기화, 조건, 증감 부분에만 세미콜론을 사용해야 한다. (세 번째 부분 뒤에는 세미콜론을 쓰지 않음!)
            잘못된 예)
            ```js
            for (let i=0; i<10; i++;) { // 세 번째 부분 뒤에는 세미콜론 X!
                /* 코드 */ 
            }
            ```
- 참고 4 : 변수 이름에 대한 규칙
    - 일반적으로 `라틴 문자(0-9, a-z, A-Z)`와 `밑줄 문자`를 사용해야 함.
    - 변수 이름의 맨 앞에 밑줄(_)을 사용하면 안됨. JavaScript 구조에서 특별한 의미를 나타내는데 사용되므로 혼동될 수 있음. 
        - 무슨 특별한 의미?<br />
            코딩 관례 <br />
            1. 프라이빗 변수 또는 메서드로 사용
            JavaScript는 기본적으로 프라이빗 변수를 지원하지 않지만, 개발자들이 변수나 메서드의 앞에 밑줄을 붙여 해당 요소가 내부에서만 사용해야 한다는 의도를 표현하는 관례가 있음.
            예를 들어, 클래스나 객체의 내부에서만 사용되어야 하는 변수나 메서드에 밑줄을 붙이는 경우가 많음. 
                ```js
                class User {
                    constructor(name) {
                        this._name = name; // _name은 내부에서만 사용되기를 기대하는 변수
                    }

                    getName() {
                        return this._name; // 외부에서 접근 가능하긴 하지만, 밑줄로 내부용임을 암시
                    }
                }
                ```
                이러한 방식은 암묵적인 규칙으로, 변수나 메서드가 외부에서 직접 접근되지 않기를 바라지만, 실제로는 접근이 가능함.
                JavaScript에서 프라이빗 멤버를 명시적으로 만드는 기능은 ES6 이후 도입된 `#` 문법을 통해 가능함:
                ```js
                class User {
                    #name;

                    constructor(name) {
                        this.#name = name; // 이제 _ 없이 프라이빗 변수로 만듦
                    }

                    getName() {
                        return this.#name;
                    }
                }
                ```
            2. 라이브러리 및 프레임워크에서의 규칙
            많은 JavaScript 라이브러리나 프레임워크에서도 밑줄(_)을 사용해 내부 전용 함수나 변수를 나타내는 방식으로 사용함. 예를 들어, 프레임워크에서 `_init`과 같은 메서드는 내부적으로만 사용되며, 외부에서 호출하거나 사용하지 않도록 권장됨. 
                ```js
                class SomeFrameworkClass {
                    _internalFunction() {
                        // 이 함수는 라이브러리 내부에서만 호출하기 위한 함수
                    }
                }
                ```
            3. 이름 충돌 방지
            코드가 커지거나, 여러 라이브러리나 모듈이 함께 사용될 때 `전역 변수 이름 충돌`을 피하기 위해 변수나 함수 앞에 밑줄을 붙이는 경우가 있음. 특히, 전역 네임 스페이스를 오염시키지 않기 위해 변수나 함수의 이름을 고유하게 만들려고 할 때 유용함. 
                ```js
                var _mySpecialVar = "global var but marked as internal use";
                ```
    - 변수 이름의 맨 앞에 숫자를 사용하면 안됨. 이는 허용되지 않으며 오류가 발생함. 
    - 안전한 명명법은 `소문자 카멜 케이스(lower camel case)` : 여러 단어를 함께 붙일 때 첫 단어 전체에 소문자를 사용하고 그 다음 단어는 대문자로 시작하는 방식. 
        - 전체 구문의 첫 글자가 대문자인 경우, 이를 `대문자 카멜 케이스` 또는 `파스칼 케이스(Pascal case)`라고 함. 
    - JavaScript는 대소문자를 구분하므로 `myVariable`과 `myvariable`은 다른 변수임. 
    - JavaScript 예약어(for, var, let, function ...)를 변수 이름으로 사용하면 안됨. 
    - 변수명에 대해 확신이 없으면 이 사이트에서 자바스크립트 변수명으로 적절한지 확인할 수 있음 : https://mothereff.in/js-variables

- 참고 5: var와 let의 차이
    - 스코프(Scope)
        - var : 함수 스코프(Function Scope)
            var로 선언된 변수는 선언된 함수 안에서만 유효함. 함수 내부가 아닌 블록{} 내부에서 선언하더라도 블록을 벗어나면 여전히 접근이 가능함. 이 때문에 의도치 않은 변수 접근이 일어날 수 있음. 
            ```js
            function testVar() {
                if (true) {
                    var x = 10;
                }
                console.log(x); // 10 (if 블록 바깥에서도 x에 접근 가능)
            }
            ```
        - let : 블록 스코프(Block Scope)
            let으로 선언된 변수는 해당 블록{} 안에서만 유효함. 이 말은, 변수 선언이 블록을 벗어나면 더 이상 그 변수에 접근할 수 없다는 뜻. let은 블록 단위로 변수의 범위를 제한하기 때문에 var보다 안전하게 사용할 수 있음.
            ```js
            function testLet() {
                if (true) {
                    let y = 10;
                }
                console.log(y); // ReferenceError: y is not defined (블록 밖에서는 y에 접근 불가)
            }
            ```
    - 호이스팅(Hoisting)
        - var의 호이스팅
            var로 선언된 변수는 호이스팅되어 함수 또는 전역 스코프의 최상단으로 끌어올려짐. 그러나 변수가 실제로 선언된 위치에서 값이 할당되기 전까지는 undefined를 가짐
            ```js
            console.log(a); // undefined (호이스팅으로 선언은 올라가지만 값은 아직 할당되지 않음) 
            var a = 10;
            console.log(a); // 10
            ``` 
        - let의 호이스팅
            let으로 선언된 변수도 호이스팅되지만, 선언 전에 변수를 사용할 수 없음. 이를 `일시적 사각지대(TDZ, Temporal Dead Zone)`라고 함. 이 구간에서는 변수가 선언되기 전까지는 접근이 불가능하고, 접근하면 ReferenceError가 발생함.
            ```js
            console.log(b); // ReferenceError: Cannot access 'b' before initialization
            let b = 10;
            console.log(b); // 10
            ```
    - 재선언(Redeclaration)
        - var의 재선언
            var는 같은 스코프 내에서 여러 번 재선언할 수 있음. 하지만 이렇게하면 기존에 있던 값에 덮어씌워지기 때문에 실수로 변수 값을 변경하는 상황이 발생할 수 있음.
            ```js
            var x = 10;
            var x = 20;
            console.log(x); // 20
            ```
        - let의 재선언
            let은 동일한 스코프에서 동일한 변수 이름으로 재선언하는 것을 허용하지 않음. 따라서 코드의 명확성을 높이고, 의도치 않은 변수 덮어쓰기를 방지함. 
            ```js
            let y = 10;
            let y = 20; // SyntaxError: Identifier 'y' has already been declared
            ```
            나중에 변경은 가능
            ```js
            let myVariable = 'Bob';
            myVariable = 'phoenix';
            ```
    - 초기화(Initialization)
        - var의 초기화
            var로 선언된 변수는 초기화하지 않더라도 선언과 동시에 자동으로 undefined로 초기화됨
            ```js
            var z;
            console.log(z); // undefined (초기화가 되지 않았지만 접근 가능)
            ```
        - let의 초기화
            let은 선언된 이후 명시적으로 초기화가 이루어져야 함. 초기화 전에 변수를 참조하려고 하면 에러가 발생함. 
            ```js
            let w;
            console.log(w); // undefined (초기화되지 않았지만 접근 가능)
            w = 5;
            console.log(w); //5

            // 에러가 발생하는 상황
            console.log(a); // ReferenceError: Cannot access 'a' before initialization
            let a = 10;
            ```
    - 전역 객체(Global Obejct)와의 관계
        - var의 전역 객체 속성화 
            var로 전역 스코프에 변수를 선언하면 해당 변수는 전역 객체(window)의 속성으로 추가됨
            ```js
            var globalVar = 'hello';
            console.log(window.globalVar); // 'hello'
            ```
        - let의 전역 객체 비속성화
            let은 전역 스코프에 선언하더라도 전역 객체의 속성으로 추가되지 않음
            ```js
            let globalLet = 'world';
            console.log(window.globalLet); // undefined
            ```
    - 헷갈림. 정리)
        - 호이스팅과 초기화의 차이
            - var는 선언과 동시에 초기화가 이루어짐. 즉, 스코프의 최상단으로 호이스팅되며, 변수는 undefined로 초기화됨. 따라서, 변수를 선언하기 전에 접근하면 undefined가 출력됨
            - let도 호이스팅되지만, 초기화는 나중에 이루어짐. 이때 변수가 선언되기 전까지는 `일시적 사각지대(TDZ)`에 놓여있어서, 초기화되기 전에 접근하면 에러(ReferenceError)가 발생함
        - 즉, let은 초기화 시점이 다르기 때문에 var와 달리 선언 전에 참조할 수 없고 에러가 발생함!
- 참고 6 : `return` 문은 브라우저에게 함수로부터 나오는 `result` 변수(예시 내)를 반환하게 함으로써 그 변수를 사용할 수 있게 함. 함수 안에서 정의된 변수는 오직 그 함수 내부에서만 사용 가능하기 때문에 return은 필수적임!(이걸 변수 scoping이라고 함.)
    ```js
    function multiply(num1, num2) {
        let result = num1 * num2;
        return result;
    }
    ```
<br />

# 9. 웹의 동작 방식
1. 내가 브라우저에 웹 주소를 입력함
2. 브라우저가 DNS 서버록 가서 웹사이트가 있는 서버의 진짜 주소를 찾음
3. 브라우저가 서버에게 웹사이트의 사본을 클라이언트에게 보내달라는 HTTP 요청 메시지를 서버로 전송함. 이 메시지와 클라이언트 & 서버 사이에 전송된 모든 데이터는 TCP/IP 연결을 통해서 전송됨
4. 이 메시지를 받은 서버는 클라이언트의 요청을 승인하고, `200 OK` 메시지를 클라이언트에게 전송. 그 후 서버는 웹사이트의 파일들을 데이터 패킷이라 불리는 작은 일련의 덩어리들로 브라우저에 전송하기 시작!
5. 브라우저는 이 패킷들을 완전한 웹 사이트로 조립하고 나에게 보여줌! 