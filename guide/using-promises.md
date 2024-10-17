# Promise란?
Promise는 비동기 작업의 결과를 나타내는 객체. 

## 기본적인 콜백 사용법
Promise가 등장하기 전, 비동기 작업을 처리하는 일반적인 방법이었던 `콜백 함수`를 살펴보자
- 예를 들어, 음성 파일을 생성하는 함수인 `createAudioFileAsync()`가 있다고 가정. 이 함수는 두 개의 콜백 함수를 인수로 받음.
  - 성공 콜백 : 작업이 성공적으로 완료되었을 때 호출됨
  - 실패 콜백 : 작업 중 오류가 발생했을 때 호출됨
  ```js
    function successCallback(result) {
      console.log("Audio file ready at URL: " + result);
    }

    function failureCallback(error) {
      console.log("Error generating audio file: " + error); 
    }

    // 함수 호출
    createAudioFileAsync(audioSettings, successCallback, failureCallback);
  ```
    - 콜백이란? 
      - 다른 함수에 인수로 전달되는 함수. 즉, 하나의 함수가 다른 함수를 호출할 때, 호출되는 함수 안에서 특정 작업이 완료되면 호출되는 함수를 콜백 함수라고 함!
        ```js
        function greet(name, callback) {
          console.log("Hello, " + name + "!");
          callback();
        }

        function afterGreeting() {
          console.log("Greeting has been sent.");
        }

        greet("Alice", afterGreeting); 
        ```
      - 비동기 작업에서의 콜백 사용
        ```js
        function fetchData(callback) {
          setTimeout(() => {
            const data = "Some data";
            callback(data); // 데이터를 콜백으로 전달
          }, 2000); // 2초 후에 데이터 가져옴
        }

        function handleData(result) {
          console.log("Fetched Data: " + result);
        }

        fetchData(handleData); // Fetched Data: Some data
        ```
## Promise를 사용한 비동기 작업
Promise를 사용하면 콜백 대신 `.then()` 메서드를 사용하여 비동기 작업의 결과를 처리할 수 있다!
  - `createAudioFileAsync()` 함수가 Promise를 반환하도록 수정한다고 가정한다면 코드는 아래와 같이 바뀜
    ```js
    createAudioFileAsync(audioSettings).then(successCallback, failureCallback);
    // createAudioFileAsync()가 Promise를 반환하고, 그 결과를 .then() 메서드를 통해 처리!
    ```
  - 더 간단하게
    ```js
    const promise = createAudioFileAsync(audioSettings);
    promise.then(successCallback, failureCallback);
    ```

## Guarantees
콜백 함수를 전달해주는 고전적인 방식과는 달리, Promise는 아래와 같은 특징을 보장함.
- 콜백은 JavaScript Event Loop가 현재 실행 중인 콜 스택을 완료하기 이전에는 절대! 호출되지 않음.
- 비동기 작업이 성공하거나 실패한 뒤에 `then()`을 이용하여 추가한 콜백의 경우에도 동일함.
- `then()`을 여러 번 사용하여 여러 개의 콜백을 추가할 수 있고, 각각의 콜백은 주어진 순서대로 하나하나 실행된다!

## Promise의 가장 뛰어난 장점 중의 하나가 바로 Chaining!
기본적으로, 각각의 Promise는 체인 안에서 서로 다른 비동기 단계의 완료를 나타냄.
```js
doSomething()
  .then(function (result) {
    return doSomethingElse(result);
  })
  .then(function (newResult) {
    return doThirdThing(newResult);
  })
  .then(function (finalResult) {
    console.log("Got the final result: " + finalResult);
  })
  .catch(failureCallback);
```
- 이렇게 콜백 함수들을 반환된 Promise에 Promise chain을 형성하도록 추가할 수 있다!
- then()에 넘겨지는 인자는 선택적(Optional).
- 화살표 함수로 나타내면 아래와 같음
  ```js
  doSomething()
    .then((result) => doSomethingElse(result))
    .then((newResult) => doThirdThing(newResult))
    .then((finalResult) => {console.log(`Got the final result: ${finalResult}`);
    })
    .catch(failureCallback);
  ```
  - 중요!!!! 반환값이 반드시 있어야 함. 만약 반환 값이 없으면 콜백 함수가 이전의 promise의 결과를 받지 못하기 때문!
  - 화살표 함수 `() => x`는 `() => {return x;}`와 같음

## Chaining after a catch
```js
new Promise((resolve, reject) => {
  console.log("Initial");

  resolve();
})
  .then(() => {
    throw new Error("Something failed");

    console.log("Do this");
  })
  .catch(() => {
    console.log("Do that");
  })
  .then(() => {
    console.log("Do this, whatever happened before");
  });
```
- `resolve()`: Promise가 성공적으로 완료되었음을 알리는 함수. 
  - `Promise`가 생성될 때, `executor`라는 함수가 첫 번째 인수로 받는 두 개의 콜백 함수 중 하나가 바로 resolve.
  - 이 함수는 자바스크립트가 자동으로 제공하므로, 우리가 따로 정의하지 않고도 사용 가능하다. 
  ```js
  new Promise((resolve, reject) => {
    resolve(); // Promise를 성공적으로 완료
  });
  ```

### 왜 resolve()가 then()으로 넘어가?
1. Promise의 생성:
     - `resolve()`가 호출되면 `Promise`는 `이행(resolved) 상태`로 전환됨.
     - `Promise`는 처음에는 `대기 상태(pending)`인데, `resolve()가 호출`되면 `이행 상태`로 바뀌면서, 연결된 `then() 함수`가 실행됨. 
2. then() 실행:
     - `resolve()`가 호출되면 첫 번째 `then()`이 실행됨.
     - 이 `then()` 블록 안에서 `throw new Error("Something failed")`가 발생하면, `Promise`는 `거부(rejected) 상태`로 바뀌고, 다음에 연결된 `catch() 블록`으로 넘어감. 
3. catch() 실행
4. 두 번째 then() 실행:
     - `catch()` 블록이 에러를 처리했으므로, 그 다음 `then()`이 실행됨. 이 `then()`은 `catch()`가 성공적으로 실행된 이후 실행됨!    

## Error Propagation
Promise Chain에서는 에러가 발생한 시점에서 즉시 체인이 멈추고, catch()로 넘어감. 
- 즉, 여러 개의 `then()` 중 하나에서 에러가 발생하면, 그 뒤에 있는 모든 `then()`은 건너뛰고 `catch()`에서 에러를 처리함.

1. 콜백 지옥과의 차이
     - Promise 체인은 이렇게 한 번의 `catch()`로 모든 에러를 처리할 수 있는 반면, 콜백 방식에서는 각 단계마다 에러를 처리해야 해서 코드가 복잡하다!

2. 동기 코드와의 비교
     - Promise chain은 비동기 코드이지만, 에러 처리 방식은 동기 코드의 `try-catch`와 매우 유사함. 밑에서 이어서.


## Async/Await
ECMAScript 2017(ES8)에서 `async/await`을 도입해서, 비동기 작업을 마치 동기 작업처럼 보이게 작성할 수 있게 되었다.
```js
async function foo() {
  try {
    const result = await doSomething();
    const newResult = await doSomethingElse(result);
    const finalResult = await doThirdThing(newResult);
    console.log(`Got the final result: ${finalResult}`);
  } catch (error) {
    failureCallback(error);
  }
}
```
  - `await` : Promise가 완료될 때까지 기다렸다가 그 결과를 변수에 저장함. 마치 동기 함수처럼 코드를 작성할 수 있음.
  - `try-catch` : 동기 코드에서처럼 `try-catch 블록`을 사용하여 에러를 처리! 만약 `await`으로 기다리는 작업 중에 에러가 발생하면, `catch`로 넘어가 에러를 처리함.

## Promise Rejection Event
Promise가 실패(reject)할 때 발생하는 두 가지 이벤트가 있다:
1. `rejectionhandled`: Promise가 실패한 후, 그 실패를 처리하는 핸들러가 있는 경우 발생. 즉, `catch()`로 에러를 처리하면 이 이벤트가 발생됨
2. `unhandledrejection`: Promise가 실패했는데, 이를 처리할 `catch()`같은 핸들러가 없는 경우 발생.
  - 핸들러 없이 에러가 남아있으면, 이 이벤트가 발생하여 해당 상황을 알려준다.

### Promise Rejection Event 속성
두 이벤트에는 두 가지 중요한 속성이 있음:
1. `promise`: 실패한 Promise 객체를 참조하여 어떤 Promise가 실패했는지 알려줌
2. `reason`: Promise가 왜 실패했는지 그 이유를 담고 있음. 
  - 예를 들어, `throw new Error('Error message')`로 에러를 던졌다면 그 에러 메시지가 `reason`에 들어감.

### 유용한 이유!
이 이벤트들은 Promise 실패를 전역적으로 다루기 때문에, 특정한 코드에서 Promise 실패를 직접 처리하지 않더라도, 전체적으로 에러를 다루거나 디버깅할 수 있음.
- 디버깅: 프로젝트에서 사용하는 모듈이나 코드가 실패한 Promise를 처리하지 않은 경우, 이 이벤트를 활용하여 실패한 Promise를 잡아내고 이유 분석 가능
- Node.js: Node.js 환경에서는 모듈들이 실패한 Promise를 그냥 두는 경우가 많은데, 이를 해결하기 위해 `unhandledrejection` 이벤트를 활용하여 에러가 콘솔에 남지 않게 할 수 있음.
  - 무슨 말인지 설명
    ```js
    window.addEventListener(
      "unhandledrejection",
      (event) => {
        console.log("Promise가 실패했습니다!", event.reason); // 에러 메시지 출력
        event.preventDefault(); // 기본 동작(콘솔에 에러 자동 출력)을 막음
      }
    );
    ```

## 오래된 콜백 API를 사용하여 Promise 만들기
옛날 방식의 비동기 함수들, 예를 들어 `setTimeout()` 같은 함수들은 일정 시간이 지나면 콜백 함수가 호출되는 방식인데, 이렇게 콜백을 사용하는 방식에는 몇 가지 단점이 있다:
- 콜백이 실패했을 때 그 오류를 쉽게 처리할 방법이 없거나, 오류를 잡지 못할 수 있음.
- 코드가 복잡해지고 가독성이 떨어질 수 있음(콜백 지옥 문제)

### 문제점: `setTimeout()`은 콜백을 사용
```js
// setTimeout이 받는 두 가지 인자: 1. 특정 시간이 지나면 실행할 콜백 함수, 2. 그 시간이 얼마나 지나는지(ms 밀리초)
setTimeout(() => saySomething("10 seconds passed"), 10000);
```
- 근데 이 방식에는 오류 처리가 없음. `saySomethind()`이 실패하거나 예외가 발생해도 어떤 오류처리도 불가능

### 해결 방법: `Promise`로 감싸기
```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 위의 코드는 아래와 같음
function wait(ms) {
  return new Promise(function(resolve) {
    setTimeout(function() {
      resolve();
    }, ms);
  });
}
```
- 여기서 `wait()` 함수는 특정 시간(`ms`밀리초) 동안 기다렸다가, 그 시간이 지나면 `Promise`를 해결(resolve)하는 함수. 
- 이 함수는 `Promise`를 반환하는데, 그 안에서 `setTimeout()`을 사용해서 지정한 시간이 지나면 `resolve`를 호출됨. 즉, 시간이 지나면 `Promise`가 성공적으로 해결(`resolve`) 되는것!

```js
wait(10000) // 10초 동안 기다림
  .then(() => saySomething("10 seconds")) // 기다린 후에 saySomething 호출
  .catch(failureCallback); // 만약 오류가 발생하면 처리
```

## Composition
### Promise.resolve()와 Promise.reject()
두 함수는 이미 해결된(resolved) 또는 거부된(rejected) Promise를 직접 생성하는 바로 가기!
1. `Promise.resolve(value)` : 주어진 값으로 즉시 해결된 Promise를 생성함
2. `Promise.reject(error)`: 주어진 에러로 즉시 거부된 Promise를 생성함
  ```js
  const resolvedPromise = Promise.resolve('Success');
  resolvedPromise.then(value => console.log(value)); //Success

  const rejectedPromise = Promise.reject('Error');
  rejectedPromise.catch(error => console.log(error)); //Error
  ```
  - 장점. 주로 비동기 작업을 명시적으로 처리하거나 함수의 반환값을 일관되게 Promise로 만들고 싶을 때 유용하다고 한다!
    1. 비동기 작업으로 명확하게 만들기
      - 일반적인 함수는 값을 즉시 반환하지만, 비동기 함수는 Promise를 반환함. 함수가 항상 Promise를 반환하도록 만들면 동기와 비동기 작업을 통일해서 처리 가능!
        ```js
        function getData() {
          return Promise.resolve('data');
        }

        getData().then(data => console.log(data));
        // getData()는 즉시 값을 반환하지만, Promise.resolve()로 감싸서 항상 Promise를 반환하게 만들면, 비동기처럼 취급할 수 있음.
        ```
    2. 이미 있는 값을 Promise로 감싸기
      - 이미 알고 있는 값이나 즉시 사용 가능한 값을 비동기로 다루는 상황에서, `Promise.resolve()`는 그 값을 즉시 해결된 Promise로 감싸는 방법!
      ```js
      function getUserName(userId) {
        if (!userId) {
          return Promise.resolve('Guest'); // 즉시 해결된 Promise 반환
        }
        return fetch(`/user/${userId}`).then(response => response.json());
      }

      getUserName().then(name => console.log(name)); //Guest
      // userId가 없으면 바로 Guest를 반환하고 싶지만, 비동기적으로 데이터를 가져오는 다른 코드랑 처리 방식을 일관적으로 맞추기 위해?
      // Promise.resolve()로 값을 감싸서 반환.
      ```
      - 아.. `Promise.resolve()`를 사용해서 첫 번째 경우에도 즉시 해결된 Promise를 반환하는 이유는,
      - 외부에서 `getUserName()`을 호출할 때 결과가 동기인지 비동기인지 신경 쓰지 않고 항상 `.then()`을 사용할 수 있게 만들기 위함!
      - 만약, 첫 번째 경우에 Promise를 반환하지 않았다면 then()을 쓸 수 없어서 코드가 일관되지 않게 된다!

### Promise.all()와 Promise.race()
이 두 가지는 여러 비동기 작업을 병렬로 실행하는데 유용!
1. `Promise.all()` : 여러 Promise를 배열로 받아서 모든 Promise가 완료된 후 결과를 배열로 반환함. 만약 하나라도 실패하면 그 즉시 catch로 넘어간다.
  ```js
  Promise.all([func1(), func2(), func3()])
    .then(([result1, result2, result3]) => {
      console.log(result1, result2, result3); // 모두 완료된 후 결과 사용
    })
    .catch(error => console.error('Error', error)); // 하나라도 실패하면 실행
  ```
2. `Promise.race()` : 여러 Promise 중 가장 먼저 완료된 Promise의 결과만 반환함.
  ```js
  Promise.race([func1(), func2(), func3()])
    .then(result => {
      console.log('First completed:', result); // 가장 먼저 완료된 결과만 출력
    });
  ```

### 순차적 구성(Sequential Composition)
`Promise.all()`은 병렬로 작업을 실행하지만, 순차적으로 비동기 작업을 실행해야 할 때가 있음. 
- 이를 위해서 `reduce`를 사용해 각 비동기 함수를 Promise 체인으로 줄일 수 있다!
  ```js
  [func1, func2, func3]
    .reduce((p, f) => p.then(f), Promise.resolve()) // func1 -> func2 -> func3 순서로
    .then(result3 => {
      console.log('Last result:', result3); // 마지막 결과 사용
    });
  ```
  - 처음에는 `Promise.resolve()`로 시작해서, 각 함수를 순차적으로 호출하면서 다음 함수가 then 체인으로 이어짐.
  - `reduce` 함수는 배열을 하나씩 줄여나가며, 각 `Promise`가 완료되면 다음 함수를 호출하는 방식!

### 함수형 프로그래밍을 통한 재사용 가능 함수
`composeAsync` 함수를 통해 패턴을 반복해서 사용할 수 있도록, 재사용 가능한 함수로 만들 수 있음.
```js
const applyAsync = (acc, val) => acc.then(val);
const composeAsync = (...funcs) => (x) => funcs.reduce(applyAsync, Promise.resolve(x));
```
  - applyAsync : 각 함수를 Promise 체인으로 연결하는 함수 즉, 이전 비동기 작업이 끝나면 다음 작업을 실행함.
    - acc : 누적된 Promise / var : 실행하려는 함수
    - acc.then(val) : 이전 작업(promise)이 끝난 후에 현재 작업(val)을 실행한다.
  - composeAsync : 여러 개의 함수를 받아서, 그 함수들을 차례대로 실행하는 새로운 함수를 만들어주는 함수.
    - ...funcs: 여러 개의 함수를 배열로 받음 / (x) : 그 함수들에 전달할 첫 번째 값
    - 그 함수들이 차례로 실행되면서, 하나의 Promise 체인이 만들어지도록 해 준다!

```js
const transformData = composeAsync(func1, func2, func3);
transformData(data).then(result3 => console.log(result3)); 
```

### ECMAScript 2017의 async/await으로 구성하기
`async/await`를 사용하면, 위의 Promise 체인 코드를 훨씬 간단하게 만들 수 있음. 
  ```js
  let result;
  for (const f of [func1, func2, func3]) {
    result = await f(result); // 함수들을 순차적으로 실행하고 결과를 전달
  }
  console.log('Final result: ', result); // 마지막 결과 사용
  ```
  - await은 promise가 해결될 때까지 기다리기 때문에 각 함수가 순차적으로 실행됨. 

## Timing
`Promise.resolve()`처럼 이미 해결된 Promise라도, 그에 .then(0)으로 전달된 함수는 동기적으로 바로 실행되지 않고, 마이크로 태스크 대기열(Microtask Queue)에 저장된다는 점이 핵심!
```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

wait().then(() => console.log(4));
Promise.resolve()
  .then(() => console.log(2));
  .then(() => console.log(3));
console.log(1);
// 1, 2, 3, 4
```
  - 실행 순서
    1. `Promise.resolve()`는 즉시 해결되고, `.then()`에 있는 함수들이 마이크로 태스크 대기열에 들어감
    2. `console.log(1)`은 동기적으로 실행되므로 1로 출력됨.
    3. 이벤트 루프가 마이크로 태스크 대기열에 있는 `console.log(2)`를 실행해서 2가 출력됨
    4. 그 다음 `.then(() => console.log(3))`이 실행되어서 3이 출력됨
    5. 마지막으로 `wait()`은 비동기 함수 `setTimeout`을 사용하므로, 이벤트 루프가 이 작업을 처리하게 되고, 일정시간이 지난 후에 4가 출력됨.

## Nesting (중첩된 Promise 체인)
Promise 체인을 평평하게 유지하는 게 좋긴 하지만, 에러 핸들링을 위해 중첩이 필요한 경우가 있다.
```js
doSomethingCritical() 
  .then((result) => 
    doSomethingOptional(result)
      .then((optionalResult) => doSomethingExtraNice(optionalResult))
      .catch((e) => {}),
    )
    .then(() => moreCriticalStuff())
    .catch((e) => console.log("Critical failure: " + e.message));
```
- 흐름
  1. `doSomethingCritical()`: 중요한 작업으로, 만약 실패하면 가장 마지막의 catch 블록에서 이 에러가 잡힘
  2. 그 후에 선택적인 작업인 `doSomethingOptional()`과 `doSomethingExtraNice()`가 실행되는데, 이 작업들은 필수적인 작업은 아니기 때문에 실패해도 무시할 수 있음.
    - 그래서 그 안에 `catch((e) => {})`로 에러를 잡고 아무런 에러 처리를 하지 않아서, 에러가 발생해도 무시하고 다음 작업으로 넘어감.
  3. 마지막으로 `moreCriticalStuff()`는 다시 중요한 작업이고, 여기서 에러가 발생하면 마지막 catch블록에서 에러가 처리됨!

- 중요 포인트!
  - 중첩된 catch는 중첩된 범위 안에서 발생한 에러만 처리한다는 것!