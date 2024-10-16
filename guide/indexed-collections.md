# 인데스 기반의 컬렉션
## 배열 생성
값이 하나인 요소만을 가지는 배열을 생성하고자 할 경우, 반드시 대괄호 문법을 사용해야 함. 
- 하나의 숫자 값을 Array() 생성자에게 전달할 경우, 그 숫자값은 해당 배열의 요소가 아니라 arrayLength로 해석됨!
```js
const arr = [42]; // 숫자 42라는 하나의 요소를 가진 배열 생성

const arr2 = Array(42); // arr2.length가 42이면서 요소가 없는 배열 생성

const arr3 = []; // arr2와 마찬가지
arr3.length = 42;
```
- Array()의 동작과 문제점
    - Array() 생성자를 호출할 때, 그 안에 전달되는 값이 배열의 길이로 해석될 수 있는데, 배열의 길이는 항상 정수여야 한다.
    - 따라서 소수나 부동소수점 숫자를 넣으면 오류가 발생함. 
    ```js
    const arr = Array(9.3); //RangeError: Invalid array length
    ```
- 요소가 하나인 배열을 만들려면!?
    - 9.3처럼 특정 숫자나 값을 배열의 길이로 쓰려는 게 아니라, 그 값 자체를 배열의 요소로 만들고 싶다면, `Array.of()`를 사용하는 게 안전!
    - `Array.of()`는 전달된 값을 배열의 요소로 간주하고, 그 값을 담은 배열을 생성함. 
    ```js
    const wirenArray = Array.of(9.3); // 9.3이라는 값을 배열의 첫 번째 요소로 가진 wirenArray 배열을 만듬
    ```

### 안전한 배열 생성 방법들
1. 배열 리터럴을 사용
```js
const arr = [9.3]; 
```

2. 빈 배열을 생성하고 값을 추가
```js
const arr = [];
arr.push(9.3); 
```

3. Array.of()를 사용
```js
const arr = Array.of(9.3);
```

- 참고
    ```js
    const emp = [];
    emp[0] = "Casey Jones";
    emp[1] = "Phil Lesh";
    emp[2] = "August West";
    ```
    - 이 예시에서 배열 연산자에 정수가 아닌 값을 제공하면 배열 요소 대신 배열을 나타내는 객체에 속성이 생성됨
    - 예를 들어,
        ```js
        emp[3.4] = "Casey Danes";
        console.log(emp.length); // 3 <- 객체 속성은 배열의 길이에 영향을 미치지 않음.
        console.log(Object.hasOwn(emp, 3.4)); //true <- 배열 객체(emp)가 3.4라는 속성을 가지고 있다!
        ```

- length 속성에 값 할당이 가능하다.
    - 저장된 항목 수보다 작은 값을 쓰면 배열이 잘리고, 0을 쓰면 배열이 완전히 비워짐
        ```js
        const cats = ["Dusty", "Misty", "Twiggy"];
        console.log(cats.length); // 3

        cats.length = 2;
        console.log(cats); // ['Dusty', 'Misty']

        cats.length = 0;
        console.log(cats); // []; cats 배열이 비워짐
        ```

## 배열의 요소 반복처리하기
1. for
    ```js
    const colors = ["red", "green", "blue"];
    for (let i = 0; i < colors.length; i++) {
        console.log(colors[i]);
    }
    ```

    - 배열의 요소가 불리언 컨텍스트에서 false로 평가되지 않는 경우
        - 배열의 요소들은 불리언 컨텍스트에서 평가될 때 `null`, `undefined`, `false`, `0`, `NaN`, `""` 등이 아닌 이상 true로 평가됨. 
        - 즉, `div` 요소들이 배열 안에 들어있는 경우, 그 어떤 요소도 `false`로 평가되지 않음. 
    - 배열의 길이를 확인하는 오버헤드 회피
        ```js
        // 일반적으로 for 루프에서 배열을 순회할 때, 배열의 길이를 확인하기 위해 이렇게 작성 가능
        // 아래의 예시에서는 DOM 노드(HTML div요소)로만 구성된 배열을 대상으로 하므로, 모든 요소가 항상 true로 평가된다고 가정.
        // 배열 안의 div 요소들은 모두 존재하는 값이므로 null, undefined같은 값이 없다는 전제!
        const divs = document.getElementByTagName("div");
        for (let i=0; i <divs.length; i++) {
            // ...
        }
        ```
        - 여기서 divs.length는 루프가 매번 돌 때마다 배열의 길이를 확인함. 매우 큰 배열일 경우에는 반복적으로 length를 조회하는 것이 성능에 약간 영향을 줄 수 있음.
    - 더 효율적인 코드 관용구
        ```js
        // 배열의 길이를 매번 확인하지 않고, 루프가 돌면서 배열의 요소 자체가 null 또는 undefined가 되는 시점에 루프를 멈추도록 함
        const divs = document.getElementByTagName("div");
        for (let i=0, div; (div = divs[i]); i++) {
            // ...
        }
        ```
        - 초기화문에 변수를 여러 개 선언하거나 초기화하는 것이 가능하다! 각각의 변수를 콤마(,)로 구분해서 한 줄에 선언하면 됨. 
        - div는 divs[i] 값을 할당받고, i는 반복을 위한 변수로 선언.
            - 예) 초기화문에 여러 변수를 선언하는 다른 예시
                ```js
                for (let x = 1, y = 2; x < 10; x++, y++) {
                    console.log(x, y);
                }
                ```
2. forEach()
    ```js
    const colors = ["red", "green", "blue"];
    colors.forEach((color) => console.log(color));
    // red
    // green
    // blue
    ```

## 배열의 메서드
- `at()` : 배열의 지정된 인덱스에 있는 요소를 반환하거나, 인덱스가 범위를 벗어난 경우 `undefined`를 반환함. 
  - 특히 배열의 끝에서 요소에 접근하는 `음수 인덱스`에 사용됨. 
    ```js
    const myArray = ["a", "b", "c", "d", "e"];
    myArray.at(-2); // "d"
    ```
- `splice()` : 배열에서 요소를 제거한 후 (선택적으로) 대체하며, 배열에서 제거된 항목을 반환함.
    ```js
    const myArr = ["1", "2", "3", "4", "5"];
    myArr.splice(1, 3, "a", "b", "c", "d"); // 1: 배열의 변경을 시작할 인덱스, 3: 배열에서 제거할 요소의 수, a&b&c&d: 배열에 추가할 요소
    // 1, a, b, c, d, 5
    ```
- `flat()` : 지정된 깊이까지 재귀적으로 연결된 모든 하위 배열 요소가 포함된 새 배열을 반환함.
    ```js
    let myArray = [1, 2, [3, 4]];
    myArray = myArray.flat(); // [1, 2, 3, 4]
    ```
- `sort()` : 배열의 요소를 새로운 배열이 아닌 주어진 배열 내에서 정렬하고 배열에 대한 참조를 반환함.
  - 내부적으로 배열의 요소들을 쌍으로 비교하는 과정에서 내가 따로 a와 b에 값을 지정해주지 않아도, `sort()`가 알아서 배열의 각 요소들을 순차적으로 넘겨주기 때문에 명시할 필요 없음!
    ```js
    const myArray = ['Wind', 'Fire', 'Rain'];

    const sortFn = (a, b) => {
        console.log(`Comparing: ${a} and ${b}`);
        if (a[a.length -1] < b[b.length -1]) { // 각 문자열에서 마지막 문자를 기준으로 비교 
            return -1; 
        } else if (a[a.length -1] > b[b.length -1]) {
            return 1;
        }
        return 0;
    };

    myArray.sort(sortFn);
    console.log(myArray); // ["Wind", "Fire", "Rain"]
    ```
    - `sort()` 메서드에서는 `return` 값이 배열의 정렬 순서를 결정함. 
    - 반환 값의 의미:
      - 음수(-1): 첫 번째 인수 a가 두 번째 인수 b보다 작다고 판단되는 경우. 결과적으로 배열에서 a가 b보다 앞에 위치하게 됨. 
      - 양수(1) : 첫 번째 인수 a가 두 번째 인수 b보다 크다고 판단되는 경우. 배열에서 b가 a보다 앞에 위치하게 됨.
      - 0 : 첫 번째 인수 a와 두 번째 인수 b가 같다고 판단되는 경우. 배열의 기존 순서를 그대로 유지함. 
- `map()` : 배열의 모든 요소에 대해 `callback` 함수를 실행하고 이 결과를 새로운 배열에 담아 반환함.
    ```js
    const a1 = ["a", "b", "c"];
    const a2 = a1.map((item) => item.toUpperCase());
    console.log(a2); // ['A', 'B', 'C']
    ```
- `filter()` : `callback` 함수가 `true`를 반환하는 요소를 새로운 배열에 담아 반환함.
    ```js
    const a1 = ["a", 10, "b", 20, "c", 30];
    const a2 = a1.filter((item) => typeof item === "number");
    console.log(a2); // [10, 20, 30]
    ```
- `find()` : `callback`이 `true`를 반환하는 `첫 번째 항목`을 반환함 / `findLast()` : callback이 true를 반환하는 `마지막 항목`을 반환함
    ```js
    const a1 = ["a", 10, "b", 20, "c", 30];
    const i = a1.find((item) => typeof item === "number");
    console.log(i); // 10
    ```
- `every()` : `callback`이 배열의 모든 항목에 대해 `true`를 반환하면 `true`를 반환함. / `some()` : `callback`이 `true`를 한 번이라도 반환하면 `true`를 반환함
    ```js
    function isNumber(value) {
        return typeof value === "number";
    }

    const a1 = [1, 2, 3];
    console.log(a1.every(isNumber)); //true
    const a2 = [1, "2", 3];
    console.log(a2.every(isNumber)); //false

    const a3 = [1, "2", 3];
    console.log(a2.some(isNumber)); // true
    const a4 = ["1", "2", "3"];
    console.log(a3.some(isNumber)); // false
    ``` 
- `reduce()` : 배열의 요소를 하나의 값으로 줄이기 위해 사용함. 
  - 이 메서드는 배열의 각 요소를 순차적으로 순회하면서, 누적값(accumulator)과 현재값(currentValue)을 계속 더하거나 계산해서 최종적으로 하나의 값을 반환함.
  - `reduce()`는 배열의 모든 요소를 하나의 값으로 줄이는 과정에서 콜백 함수를 반복해서 호출하고, 이 콜백 함수는 두 가지 매개변수(누적값, 현재값)를 받음
    ```js
    const numbers = [10, 20, 30];

    // 배열 요소들을 모두 더하는 예시
    const total = numbers.reduce((accumulator, currentValue) => {
        console.log(`accumulator: ${accumulator}, currentValue: ${currentValue}`);
        return accumulator + currentValue;
    }, 0); // 옵션으로 초깃값을 설정할 수 있음(여기에서 0). 초기 값이 있다면 그 값으로 시작하고, 없다면 배열의 첫 번째 요소가 누적값이 된다. 
    console.log(`최종 결과: ${total}`);  // 60
    ```
    - 초기 단계: accumulator(누적값)은 초깃값인 0, currentValue(현재값)은 배열의 첫 번째 요소인 10.
      - accumulator + currentValue = 0 + 10 = 10 <- 다음 호출에서 누적값은 10이 됨 아하
    - 만약, initialValue가 없다면?
      - 배열의 첫 번째 요소가 accumulator가 되고, 두 번째 요소부터 currentValue로 처리됨.
- `reduceRight(0)` : `reduce(0)`와 거의 동일하게 동작하지만, 배열의 마지막 요소부터 시작!