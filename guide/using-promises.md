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
     - Promise chain은 비동기 코드이지만, 에러 처리 방식은 동기 코드의 `try-catch`와 매우 유사함. 


## Async/Await
ECMAScript 2017(ES8)에서 `async/await`을 도입해서, 비동기 작업을 마치 동기 작업처럼 보이게 작성할 수 있게 되었음!
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