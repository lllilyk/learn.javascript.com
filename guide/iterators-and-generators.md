# 반복자와 생성자
## 반복 프로토콜(Iterator Protocol)
자바스크립트에서 객체를 반복 가능하게 만들기 위한 규칙 또는 약속. 
- 이 프로토콜을 준수하는 객체는 반복자로 취급될 수 있으며, `for...of` 루프나 전개 연산자`...`와 같은 반복 가능한 문법에서 사용 가능!
- 반복 프로토콜은 두 가지로 나뉨:
    1. 이터러블 프로토콜 : 객체가 `[Symbol.iterator]()` 메서드를 구현해야 하고, 이 메서드는 반복자를 반환해야 함.
        - 이 프로토콜을 준수하는 객체를 이터러블(iterable)이라고 부름. 예를 들어 배열이나 문자열 같은 것들! 
        ```js
        const myIterable = {
            [Symbol.iterator]: function() {
                return myIterator; // next()메서드를 가진 반복자 반환
            }
        }
        ```
    2. 반복자 프로토콜(Iterator Protocol) : 객체가 `next()` 메서드를 가지고 있으며, 이를 호출할 때 `{ value: ..., done: ... }` 형태의 객체를 반환함.
        - `value`는 현재 값을, `done`은 반복이 끝났는지 여부를 나타냄. 
        ```js
        const arr = [1, 2, 3];
        const iterator = arr[Symbol.iterator]();

        console.log(iterator.next()); // { value: 1, done: false }
        console.log(iterator.next()); // { value: 2, done: false }
        console.log(iterator.next()); // { value: 3, done: false }
        console.log(iterator.next()); // { value: undefined, done: true }
        ```


## 반복자(Iterator)란?
반복자는 시퀀스(연속된 값들)를 반복하면서 각 값을 하나씩 반환하는 객체(반복 프로토콜을 구현한 객체)
- `next()` 메서드를 통해 값을 하나씩 반환하고, 반복이 끝나면 `done: true`를 반환함.
```js
function makeRangeIterator(start = 0, end = Infinity, step = 1) {
    var nextIndex = start;
    var n = 0;

    var rangeIterator = {
        next: function () {
            var result;
            if (nextIndex < end) {
                result = { value: nextIndex, done: false }; // 아직 반복 중
            } else if (nextIndex == end) {
                result = { value: n, done: true }; // 마지막 값 반환 후 반복 종료
            } else {
                result = { done: true }; // 반복 종료 
            }
            nextIndex += step;
            n++;
            return result;
        },
    };
    return rangeIterator; 
    // nextIndex: 1, result = {value: 1, done: false}, n: 1
    // nextIndex: 2, result = {value: 2, done: false}, n: 2 
    // nextIndex: 3, result = {value: 3, done: false}, n: 3 
    // nextIndex: 4, result = {value: 3, done: true}, n: 4
}
```
- `makeRangeIterator()` 함수 (커스텀 반복자)
    - 이 함수는 Start부터 End까지 step만큼 증가하는 숫자들을 반환하는 반복자 객체를 생성함.
    - start: 반복이 시작되는 숫자(기본값: 0)
    - end: 반복이 끝나는 숫자(기본값: 무한대)
    - step: 각 반복에서 값을 얼마나 증가시킬지 설정(기본값: 1)
    - nextIndex: 현재 반복하고 있는 인덱스를 추적하는 변수
    - n: 반복 횟수를 추적하는 변수

    ```js
    var it = makeRangeIterator(1, 4);

    var result = it.next();
    while(!result.done) {
        console.log(result.value); // 1 2 3 
        result = it.next;
    }

    console.log("Iterated over sequence of size: ", result.value);  // 3 <- 시퀀스에서 반복이 진행된 총 횟수
    ```


## for...of 루프
`for...of`는 반복 가능한 객체를 순회하는 간단한 방법을 제공함. 배열, 문자열, 맵, 세트 등과 같은 이터러블을 순회할 때 사용할 수 있음.
```js
const arr = [1, 2, 3];

for (const num of arr) {
    console.log(num); // 1, 2, 3
}
```

## function* 및 Generator
Generator 함수는 `function*` 키워드를 사용해 정의됨. 
- 이 함수는 일반 함수와 달리 실행 중간에 멈췄다가 `next()`로 다시 시작할 수 있다.
- Generator 함수는 호출되면 `Iterator` 객체를 반환하며, 그 안에서 `yield`를 통해 값을 반환할 수 있음. 
```js
function* simpleGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

const gen = simpleGenerator();
console.log(gen.next()); // { value: 1, done: false } <- yield 1에서 멈추며, 1 반환.
console.log(gen.next()); // { value: 2, done: false }
console.log(gen.next()); // { value: 3, done: false }
console.log(gen.next()); // { value: undefined, done: true }
```

## yield 및 yield*
### yield의 특징
1. 값 반환: `yield`는 `return`과 비슷하게 값을 외부로 반환함.
2. 실행 중지: `yield`를 만나면 함수 실행이 중단됨. 다시 `next()` 메서드를 호출하면 함수 실행이 재개된다.
3. 재개 시점: 함수가 재개될 때, 중단된 지점에서 다음 코드가 실행됨. 

### yield*
: 다른 Generator 함수나 이터러블을 위임하여 내부적으로 반복하게 할 수 있음.
```js
function* gen1() {
    yield 1;
    yield 2;
}

function* gen2() {
    yield* gen1(); // gen1의 모든 값을 위임받아 출력
    yield 3;
}

const g = gen2();
console.log(g.next()); // { value: 1, done: false }
console.log(g.next()); // { value: 2, done: false }
console.log(g.next()); // { value: 3, done: false }
console.log(g.next()); // { value: undefined, done: true }
```