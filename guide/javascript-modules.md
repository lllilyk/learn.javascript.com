# 자바스크립트 모듈
자바스크립트 프로그램을 보다 효율적이고 관리하기 쉽게 만들기 위해 모듈화가 필요해졌음.
- 모듈은 각 기능을 분리된 파일에 나누어 필요한 시점에 불러와서 사용할 수 있는 구조를 말한다. 

## 배경: JavaScript 프로그램의 모듈화 필요성
초기의 자바스크립트는 주로 작은 상호작용을 처리하는 독립적인 스크립트로 사용되었지만, 웹 애플리케이션이 커지면서 자바스크립트 프로그램도 커짐.
- 이로 인해 모듈로 나누어 관리할 수 있는 방식이 필요해짐.
- 자바스크립트를 웹 애플리케이션뿐만 아니라 Node.js 같은 환경에서도 사용할 수 있게 되면서 모듈 시스템이 필수적이 되었다!

### 브라우저에서의 모듈 사용
초기에는 Node.js의 CommonJS나 AMD(Asynchronous Module Definition) 같은 시스템을 이용해 모듈을 구현했지만, 최근에는 브라우저 자체가 모듈 기능을 지원하면서 더 효율적으로 모듈을 사용할 수 있게 되었다고 한다. 

### 모듈의 예시 구조
```text
index.html
main.js
modules/
    canvas.js
    square.js
```

### 모듈을 사용하는 이유
모듈을 사용하면 큰 애플리케이션을 작은 기능 단위로 나눌 수 있어서 유지보수성이 좋아지고, 재사용성도 높아진다. 
- 필요할 때만 불러와서 사용할 수 있으므로 성능 면에서도 이점이 있고, 코드의 가독성도 높아져서 협업에도 유리!


## Exporting module features (모듈에서 기능 내보내기)
모듈 기능을 사용하려면 먼저 함수를 export해야 하고, 이 작업은 export문(statement)을 사용하여 수행함

```js
export const name = "square";

export function draw(ctx, length, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, length, length);

  return {
    length: length,
    x: x,
    y: y,
    color: color,
  };
}
```
- export라는 키워드를 사용해서 name이라는 상수와 draw라는 함수를 내보내고 있음. 이렇게 내보낸 항목은 다른 파일에서 import문을 사용해 가져와서 사용할 수 있다.
    - export는 변수, 함수, 클래스 등을 외부로 내보낼 때 사용하고, 최상위 레벨에서만 사용 가능! (함수 내부에서 export 사용 불가능)

- 여러 항목을 한 번에 내보내기
    ```js
    export { name, draw, reportArea, reportPerimeter };
    ```
    - 각각의 항목 앞에 export를 붙이는 대신, 하나의 export문을 사용해서 파일의 끝에서 여러 항목을 한 번에 내보낼 수 있음. 
    - 중괄호{} 안에 내보낼 항목들을 쉼표로 구분해서 나열!

## Importing features (다른 파일에서 모듈 기능 가져오기)
다른 파일에서 내보낸 기능들을 가져오려면 import문을 사용하면 됨!
```js
import { name, draw, reportArea, reportPerimeter } from "./modules/square.js";
```
- import 문법은 가져오려는 항목들을 중괄호 {}안에 쉼표로 나열하고, from 뒤에 해당 모듈 파일의 경로를 적어줌.
    - 경로부분에서 `./`는 현재 파일의 경로에서 상대적으로 `square.js` 파일을 찾겠다는 의미. 
    - main.js 파일이 square.js 파일과 같은 폴더에 있지 않고 다른 폴더에 있기 때문
- 모듈에서 가져온 기능은 같은 파일 내에서 정의된 것처럼 사용할 수 있다!

## HTML에 모듈 적용
모듈을 HTML에 적용하려면 `<script>`태그에 `type="module"` 속성을 추가해야 한다.
```js
<script type="module" src="main.js"></script>
```
- 이 스크립트가 모듈이라는 것을 브라우저에게 알려주기 위함. 모듈에서는 import와 export문을 사용할 수 있지만, 일반적인 스크립트에서는 사용할 수 없기 때문에 브라우저가 이를 인식하게 하는 것이 중요하다. 

## 모듈과 일반 스크립트의 차이점
- Strict Mode: 
    - 모듈은 자동으로 "strict mode"(엄격 모드)에서 실행되는데, 이 모드는 코드 실행을 좀 더 엄격하게 만들어 오류를 미리 잡아내는 데 도움이 됨. 
    - 일반 스크립트에서는 use strict라는 문을 추가해야 엄격 모드를 활성화할 수 있는데, 모듈에서는 자동으로 적용!

- Defer 속성: 
    - `type="module"`을 사용하면 `defer` 속성을 따로 추가할 필요가 없다. 
    - 모듈은 기본적으로 페이지의 나머지 HTML이 모두 로드된 후 실행되기 때문에, 일반 스크립트처럼 `<script defer>`를 추가할 필요가 없음.
    - `defer 속성`은 HTML의 `<script>` 태그에 사용되어 브라우저가 스크립트를 HTML 문서가 완전히 파싱될 때까지 실행하지 않도록 지시함.
        - 즉, 스크립트가 페이지 렌더링을 막지 않으며, 스크립트를 불러오는 동안 브라우저는 페이지의 다른 부분을 계속 처리할 수 있음

- 로컬 테스트 주의사항: 
    - HTML 파일을 로컬 파일(즉, file://로 시작하는 경로)로 열어서 모듈을 실행하면 CORS(Cross-Origin Resource Sharing) 문제로 오류가 발생할 수 있다.
    - 그래서 모듈을 사용한 스크립트를 제대로 테스트하려면 live server와 같은 간단한 로컬 서버에서 실행하는 게 좋음

## 모듈의 스코프
모듈에서 가져온 함수나 변수는 전역 스코프에서 사용할 수 없음.
- 즉, 모듈에서 import한 것은 그 모듈 파일 안에서만 사용할 수 있고, 브라우저의 개발자 도구 콘솔에서 바로 접근 불가. 

## default exports와 named exports 차이
### Named exports
지금까지는 `export { functionName }` 같은 `Named exports` 방식만 다룸
- 이름을 지정해서 export하고, import할 때에도 그 이름을 정확히 일치시켜서 사용해야 하는 방식. 

### Default exports
Default export는 모듈에서 하나의 기본 기능을 내보내는 방법으로 이름 없이 내보낼 수 있고, import할 때도 중괄호 {} 없이 가져올 수 있음

- 예를 들어, square.js에서 randomSquare라는 함수를 default export로 내보내려면 아래와 같이 작성함:
```js
export default randomSquare;

// 그런 다음, main.js에서 이 모듈을 가져올 때는 이렇게 가져옴:
import randomSquare from './modules/square.js';
```
- 중괄호 없이 randomSquare를 가져오는 게 포인트! 이건 모듈에서 단 하나의 기본 기능을 내보내기 때문에 가능하다.

## 이름 충돌
예를 들어, `square.js`, `circle.js`, `triangle.js` 같은 모듈에 모두 `draw()`, `reportArea()`, `reportPerimeter()`라는 함수가 있다고 가정. 이 함수를 동일한 이름으로 한 파일 (main.js)에 import하려고 하면, `"이름 재정의"` 문제가 발생한다.

### 해결방법 1: import시 이름 변경(Renaming)
: 각각의 모듈에서 가져오는 함수의 이름을 다르게 지정하는 방법
```js
import {
  name as squareName, // as키워드를 사용하여 이름을 변경함으로써 충돌 방지
  draw as drawSquare,
  reportArea as reportSquareArea,
  reportPerimeter as reportSquarePerimeter,
} from "./modules/square.js";

import {
  name as circleName,
  draw as drawCircle,
  reportArea as reportCircleArea,
  reportPerimeter as reportCirclePerimeter,
} from "./modules/circle.js";

import {
  name as triangleName,
  draw as drawTriangle,
  reportArea as reportTriangleArea,
  reportPerimeter as reportTrianglePerimeter,
} from "./modules/triangle.js";
```

### 해결방법 2: export시 이름 변경
각 모듈 (square.js, circle.js, triangle.js)에서 export 할 때 이미 이름을 변경해버리는 방법 
- 즉, 각 모듈 자체에서 함수를 내보낼 때 이름을 변경하는 방법
```js
// square.js
export {
  name as squareName,
  draw as drawSquare,
  reportArea as reportSquareArea,
  reportPerimeter as reportSquarePerimeter,
};
```
이렇게 하면 main.js에서 import할 때 이름을 변경할 필요 없이 모듈에서 이미 고유한 이름으로 함수들이 제공되므로 더 간결하게 코드 작성 가능
```js
import {
  squareName,
  drawSquare,
  reportSquareArea,
  reportSquarePerimeter,
} from "./modules/square.js";
```

### import에서 이름을 변경하는 것이 일반적. 
대부분의 경우 모듈의 코드에 직접 수정할 권한이 없기 때문에! import시 이름을 변경하는 것이 더 유연하다. 
