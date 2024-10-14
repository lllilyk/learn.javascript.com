# 루프와 반복
1. for문
    ```js
    for ([초기문]; [조건문]; [증감문])
        문장
    ```

2. do...while문
    ```js
    do
        문장
    while (조건문);
    ```
    예시
    ```js
    do {
        i += 1; 
        console.log(i);
    } while (i < 5); // do 반복문은 최소 한 번은 반복되고, i가 5보다 같거나 커지기 전까지 계속 반복됨.
    ```

3. while문
    ```js
    while (조건문)
        문장
    ```
    - 조건문은 반복문 안의 문장이 실행되기 전에 확인됨. 
    - 따라서, 만약 조건문이 참으로 리턴된다면 문장은 실행되고, 조건문이 거짓으로 리턴된다면 실행을 멈추고 while문 바로 다음의 문장으로 넘어가게 됨. 
    - 참고: 무한 루프 피하기!
        ```js
        while (true) {
            console.log("Hello, world");
        }
        ```

4. label문
    ```js
    label : 
        statement
    ```
    - 레이블 값은 임의의 JavaScript 식별자일 수 있음. 
    ```js
    // markLoop 레이블은 while (theMark == true) 루프를 가리키는 이름으로 사용됨.(while 루프를 식별함)
    // 이 레이블을 사용해서, break markLoop;처럼 특정 루프나 블록을 명확하게 종료할 수 있다!
    markLoop: while (theMark == true) {
        doSomething();
    }
    ```

5. break문
    - break문은 반복문, switch문, label문과 결합한 문장을 빠져나올 때 사용함. 
    - 레이블 없이 break문을 쓸 때:
        - 가장 가까운 while, do-while, for 또는 switch문을 종료하고 다음 명령어로 넘어감 `break;`
    - 레이블 문을 쓸 때:
        - 특정 레이블 문에서 끝남 `break [레이블];`

6. continue문
    - continue문은 while, do-whiel, for, lable문을 다시 시작하기 위해 사용될 수 있음.
    - 레이블 없이 continue를 사용하는 경우: `continue;`
        - 가장 안쪽의 while, do-while, for문을 둘러싼 `현재 반복을 종료`하고, `다음 반복으로 루프의 실행을 계속`함. 
        - break문과는 달리, continue문은 전체 루프의 실행을 종료하지 않음. 
            - while 루프에서는 다시 조건으로 이동하고, for 루프에서는 증가 표현으로 이동함.
    - 레이블과 함께 continue를 사용하는 경우: `continue label;`
        - continue는 그 레이블로 식별되는 루프문에 적용됨. continue가 발생하면 프로그램은 현재 반복을 종료하고, 다음 반복을 시작함.
        - 그 조건이 false를 반환할 때까지!

7. for...in문
    - 객체의 열거 속성을 통해 지정된 변수(배열의 인덱스)를 반복함. `각각의 고유한 속성(Properties)`(객체의 모든 열거 가능한 속성)을 순회하며, 배열의 인덱스를 순회한다.
    - 반환 값 : 속성 이름(객체) 또는 인덱스(배열)
    ```js
    for (variable in object) {
        statements
    }
    ```
    예시
    ```js
    const person = { name: "Alice", age: 25, city: "Seoul" };

    for (let key in person) { // person객체의 속성 이름을 순회함.
        console.log(key); // name, age, city
        console.log(person[key]); // Alice, 25, Seoul
    }
    ```
    - 배열에서도 `for...in`은 인덱스만 반환하기 때문에, 값을 출력하려면 `arr[index]`로 접근해야 함.
    ```js
    const arr = [10, 20, 30];

    for (let index in arr) {
        console.log(index); // 0, 1, 2
        console.log(arr[index]); // 10, 20, 30
    }
    ```

8. for...of문
    - 대상 : 이터러블 객체(iterable objects) - 예: 배열, 문자열, Map, Set, arguments 객체 등
    - 반환 값 : 값 자체
    예시
    ```js
    // 배열의 값을 직접 반환하므로 인덱스를 사용할 필요 없음
    const arr = [10, 20, 30];

    for (let value of arr) {
        console.log(value); // 10, 20, 30
    }

    // 문자열에서 사용
    const str = "hello";

    for (let char of str) {
        console.log(char); //h, e, l, l, o <- 문자도 이터러블이기 때문에 for...of로 순회가능
    }
    ```
- 참고(이터러블)
    - 이터러블은 `for..of`나 스프레드 연산자`...`처럼 반복(iteration)할 수 있는 객체를 말한다.
    - 이터러블은 `Symbol.iterator` 메서드를 구현한 객체로, 이 메서드가 이터레이터를 반환해서 반복할 수 있게 해줌
    - 예: 배열, 문자열, Map 객체, Set 객체, arguments 객체, DOM 컬렉션(NodeList, HTMLCollection) 등