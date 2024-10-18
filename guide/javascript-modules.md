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

## 모듈을 깔끔하고 효율적으로 관리하기 위한 두 가지 방법
### 1. Creating a Module Object (모듈 객체 생성)
기존의 import 문에서 각각의 함수나 변수를 따로 가져오는 방법은 복잡하고 지저분할 수 있기 때문에 이를 개선하기 위해 모듈 전체를 객체로 가져올 수 있음.
- 이렇게 하면 모듈 안에 있는 함수들이 객체의 멤버로 취급되며, 네임스페이스처럼 활용할 수 있다!

- 방법
  - 모듈을 가져올 때 다음 구문을 사용하여 모든 export를 한 번에 가져옴:
    ```js
    import * as Module from "./modules/module.js";
    ```
  - module.js 내의 모든 export된 항목들을 Module 객체 안에 포함시키고, 그 후 객체를 통해 함수나 변수를 호출할 수 있음.
    ```js
    Module.function1()
    Module.function2()
    ```
- 예시
  ```js
  // module.js 안에서 export
  export { name, draw, reportArea, reportPerimeter };

  // main.js에서는 각 모듈을 객체로 가져와서 사용
  import * as Square from "./modules/square.js";
  import * as Circle from "./modules/circle.js";
  import * as Triangle from "./modules/triangle.js";

  // Square, Circle, Triangle 객체를 통해 각 도형의 기능에 접근 가능
  let square1 = Square.draw(myCanvas.ctx, 50, 50, 100, "blue");
  Square.reportArea(square1.length, reportList);
  Square.reportPerimeter(square1.length, reportList); 
  ```
  - 이렇게 하면 import문을 간소화하고 모듈 내의 함수들을 명확하게 구분할 수 있는 장점이 있다!
  
### 2. Modules and Classes (모듈과 클래스)
모듈을 클래스로 구성하는 것도 이름 충돌을 피하고 모듈을 더 구조적으로 관리하는 또 다른 방법!
- 특히 코드가 객체 지향 스타일로 작성되어 있거나, 도형 그리기와 같은 작업을 할 때 유용하다. 
  
- 클래스 사용 방법 예시
  ```js
  // square.js 파일
  class Square {
    constructor(ctx, listId, length, x, y, color) {
      // 클래스 생성자
    }

    draw() {
      // 사각형을 그리는 메서드
    }

    reportArea() {
      // 사각형의 면적을 보고하는 메서드
    }

    reportPerimeter() {
      // 사각형의 둘레를 보고하는 메서드
    }
  }
  export { Square };


  // main.js 파일에서 클래스 import:
  import { Square } from "./modules/square.js";

  // 이제 클래스 인스턴스를 생성하고 메서드를 호출하여 사각형을 그릴 수 있음
  let square1 = new Square(myCanvas.ctx, myCanvas.listId, 50, 50, 100, "blue");
  square1.draw();
  square1.reportArea();
  square1.reportPerimeter();
  ```

 ### 클래스 사용의 장점
 1. 캡슐화 : 모든 기능이 클래스로 묶여 있어 관리가 용이함
 2. 코드 재사용성: 클래스를 이용하면 다른 도형도 쉽게 확장 가능하고, 재사용성이 높아짐
 3. 구조적인 코드: 객체 지향 프로그래밍의 장점을 살려, 더 체계적인 코드 구성이 가능!


## 모듈 집합(Aggregating Modules)
때로는 여러 모듈을 상위 모듈에서 결합하고, 이를 통해 여러 서브 모듈의 기능을 상위 모듈로 가져올 수 있음
- 이 방법은 프로젝트 구조가 복잡해질 때 특히 유용하며, 이를 통해 중앙화된 관리가 가능하다!
- 방법:
  - 상위 모듈에서 여러 모듈을 집합하기 위해 `export * from` 혹은 `export { name } from` 구문을 사용함:
    ```js
    export * from "x.js";  // x.js의 모든 export 항목을 다시 export
    export { name } from "x.js"; // x.js에서 특정 항목만 다시 export
    ```
- 예시:
  - 모듈 구조
    ```text
    modules/
      canvas.js
      shapes.js
      shapes/
        circle.js
        square.js
        triangle.js
    ```
    - 여러 서브 모듈(circle, square, triangle)을 shapes.js라는 상위 모듈로 묶고, 각 하위모듈에서는 필요한 클래스나 함수를 export함
      ```js
      export { Square }
      ```
    - shapes.js에서 각 모듈의 export를 집합함
      ```js
      export { Square } from "./shapes/square.js";
      export { Triangle } from "./shapes/triangle.js";
      export { Circle } from "./shapes/circle.js";
      ```
    - shapes.js 모듈을 통해 모든 도형 관련 기능을 import 할 수 있게 됨  
      ```js
      import { Square, Circle, Triangle } from "/js-examples/modules/module-aggregation/modules/shapes.js";
      ```
      - 개별적으로 여러 모듈을 import 하는 것보다 훨씬 깔끔하고 효율적!

## 동적 모듈 로딩(Dynamic Module Loading)
필요할 때만 모듈을 로드하는 방식으로, 성능 최적화에 매우 유리함. 특히 브라우저에서 사용하는 JavaScript에서는 페이지 로딩 속도를 개선할 수 있다!

- 방법:
  - JavaScript의 import() 함수를 사용하면 Promise를 반환하여 동적으로 모듈을 가져올 수 있음.
    ```js
    import("/modules/myModule.js").then((module) => {
      // 모듈을 사용한 작업 수행
    });
    ```
    - 이렇게 하면 모든 모듈을 초기 로드 시에 불러오는 것이 아니라, 필요한 순간에만 모듈을 로드할 수 있어 성능 이점이 크다.
- 예시: 
  - index.html에 도형을 그릴 버튼 추가
    ```html
    <button class="square">Square</button>
    <button class="circle">Circle</button>
    <button class="triangle">Triangle</button>
    ```
  - main.js에서 각 버튼에 대한 참조를 가져오고, 클릭할 때마다 모듈을 로드함
    ```js
    let squareBtn = document.querySelector(".square");

    squareBtn.addEventListener("click", () => {
      import("/js-examples/modules/dynamic-module-imports/modules/square.js").then(
        (Module) => {
          let square1 = new Module.Square(
            myCanvas.ctx,
            myCanvas.listId,
            50,
            50,
            100,
            "blue"
          );
          square1.draw();
          square1.reportArea();
          square1.reportPerimeter();
        }
      );
    });
    ```
- 동적 로딩의 장점
  - 성능 최적화: 초기 로딩 속도를 개선하고, 필요할 때만 모듈을 로드하므로 메모리 효율이 좋아짐
  - 유연성: 사용자가 특정 작업을 요청할 때 해당 모듈을 불러오므로 유연하게 대응 가능