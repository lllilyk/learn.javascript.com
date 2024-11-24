## 제너릭(Generic)이란?
TypeScript에서 타입을 함수, 클래스, 인터페이스 등과 함께 재사용 가능하게 만드는 강력한 도구!
- 제너릭을 사용하면, 코드 작성 시 타입을 고정하지 않고, 나중에 사용할 때 타입을 명시하도록 설계할 수 있음. 


## 1. 제너릭의 기본 개념
제너릭은 유연하고 타입 안전한 코드를 작성하는 데 도움을 줌. 제너릭 변수 타입을 사용하여 다양한 타입을 처리할 수 있음
- 기본 문법
    ```ts
    function identity<T>(arg: T): T {
        return arg;
    }
    ```
    - `<T>`: 제너릭 타입 변수. 관례적으로 `T(Type)`로 표현하지만, 자유롭게 이름 지정 가능
    - `arg: T`: 함수의 매개변수 타입은 제너릭 `T`
    - `: T`: 함수의 반환값 타입도 제너릭 `T`
- 사용 예시
    ```ts
    identity<number>(42); // T가 number로 결정됨
    identity<string>("Hello"); // T가 string으로 결정됨
    ```


## 2. 제너릭의 필요성
- 제너릭 없이 작성한 함수:
    ```ts
    function identity(arg: any): any {
        return arg;
    }
    ```
    - 문제점: arg의 타입이 any라서 타입 안정성이 없음
    - 예)
        ```ts
        const result = identity("Hello"); 
        // result가 any 타입으로 처리되므로, 문자열로 반환된다는 타입 정보가 없음.
        ```
- 제너릭을 사용한 함수:
    ```ts
    function identity<T>(arg: T): T {
        return arg;
    }
    ```
    - 장점: 제너릭을 사용하면 타입 정보를 유지할 수 있음
    - 예)
        ```ts
        const result = identity("Hello"); 
        // result는 자동으로 string 타입으로 추론됨
        ```
        

## 3. Props 타입과 제너릭의 차이점

| **구분**            | **Props 타입 명시**             | **제너릭**                            |
|--------------------|-------------------------------|-------------------------------------|
| **사용 목적**        | Props의 구조(타입)를 명시          | 함수, 클래스, 인터페이스에서 동적 타입 정의   |
| **타입 고정 여부**    | 인터페이스나 타입으로 고정           | 제너릭 변수(T, U 등)로 유연하게 정의        |
| **문법 차이**        | `{ name }: Info`              | `<T>(arg: T): T`                     |


## 4. 실전 예제
- 배열의 요소를 반환하는 함수
    ```ts
    function getFirstElement<T>(array: T[]): T {
        return array[0];
    }

    // 사용 예
    const firstNumber = getFirstElement<number>([1, 2, 3]); // T = number
    const firstString = getFirstElement<string>(["a", "b", "c"]); // T = string
    ```
- React의 useState에서 제너릭 사용
    - useState는 TypeScript에서 내부적으로 제너릭을 사용함
        ```ts
        const [count, setCount] = useState<number>(0); // T = number
        ```

- 와 헷갈린다.

## 제너릭 함수에서 <T>, array: T[], return: T는 한 함수 내에서 모두 동일한 타입이어야 함!
### 1. 이유: 제너릭에서 T는 하나의 타입으로 고정
제너릭에서 T는 타입 변수로, 함수 호출 시 단일 타입으로 대체됨. 함수 내부에서 T는 일관성을 유지하며, 다른 타입으로 바뀌지 않음. 
```ts
function getFirstElement<T>(array: T[]): T {
    return array[0];
}
```
- 이 함수에서 :
    1. `<T>`: 함수 호출 시 결정되는 타입 변수
    2. `array: T[]`: 배열 요소의 타입은 반드시 T여야 함
    3. `return: T`: 반환값의 타입도 반드시 T여야 함
즉, 배열의 요소 타입과 반환값 타입은 항상 동일해야 하며, 다른 타입으로 바꿀 수 없음!

### 2. 함수 호출 시 T는 단일 타입으로 고정
함수를 호출할 때, 제너릭의 타입 변수 T는 함수 호출 시점에 단일 타입으로 고정됨(반복이지만 헷갈리니까 한 번 더 봐)
```ts
const firstNumber = getFirstElement<number>([1, 2, 3]); // T = number
```
1. `<number>`: 함수 호출 시 T를 number로 지정
2. `array: T[] -> array: number[]`: 배열 요소 타입이 number[]로 지정
3. `return: T -> return: number`: 반환 타입도 number로 고정

- 오류 예)
    - 만약, array의 타입과 반환 타입이 다르면 오류가 발생함
        ```ts
        const firstElement = getFirstElement<number>(["a", "b", "c"]); // error
        ```
    - 배열 요소의 타입은 string인데, T를 number로 지정했기 때문!

### 3. 함수의 타입 변수는 함수 호출 시의 "계약"
함수 호출 시, 타입 변수 T는 배열 요소와 반환값 타입 사이의 "계약" 역할을 함
```ts
function identity<T>(value: T): T {
    return value;
}

const result = identity<string>("Hello"); // T = string
```
- 호출 시 T가 string으로 설정되면:
    - 매개변수 value의 타입: string
    - 반환값의 타입: string
- T는 함수의 매개변수와 반환값 사이의 타입 일관성을 보장함!

### 4. 반환값이 없는 함수와 비교
- 반환값이 없는 함수 (void):
    ```ts
    function logMessage(message: string): void {
        console.log(message);
    }

    const result = logMessage("Hello"); // result의 타입은 void이며, 아무 값도 반환하지 않음
    ```

- 반환값이 있는 함수 (T): 
    ```ts
    function identity<T>(value: T): T {
        return value; // 반환값 존재: 반환값 타입이 T로 명시되었으므로, 함수가 반드시 T 타입의 값을 반환해야 함
    }
    ```

### 5. T는 동일한 타입이어야 하는 이유
제너릭 함수에서 T는 다음을 보장함:
- 매개변수와 반환값 사이의 타입 일관성
- 타입 안정성(Type Safety)을 유지
- 컴파일 타임에 타입 오류를 방지
    ```ts
    function combine<T>(array: T[], item: T): T[] {
        return [...array, item];
    }

    const result = combine<number>([1, 2, 3], 4); // T = number
    ```
    - 여기서 만약 array와 item의 타입이 다르면 타입 오류가 발생함
        ```ts
        const result = combine<number>([1, 2, 3], "hello"); // error
        ```

### 6. 제너릭의 자동 추론
- 명시적으로 타입 지정:
    ```ts
    const result = identity<string>("Hello"); // T = string
    ```
    - T를 명시적으로 string으로 지정, 반환값 타입도 string으로 고정

- 타입 자동 추론:
    ```ts
    const result = identity("Hello"); // T = string으로 추론
    ```
    - identity("Hello") 호출 시, TypeScript가 매개변수 value의 타입(string)을 자동으로 추론하여 T를 결정
    - 반환값 타입도 자동으로 String으로 설정