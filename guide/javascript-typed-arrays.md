# 형식화 배열(Typed Array)
형식화 배열이란? JavaScript에서 원시 이진 데이터(raw binary data)를 보다 효율적으로 다룰 수 있도록 하는 기능이다.

## 일반 배열과의 차이점
일반 Array 객체는 매우 유연해서 다양한 JavaScript 값을 넣을 수 있고, 크기도 동적으로 조절되기 때문에 쉽게 데이터를 추가하거나 삭제할 수 있다. 
- 근데 이 유연성 때문에 처리 성능이 떨어질 수 있음. 특히 영상 처리나 오디오 처리와 같이 많은 양의 데이터를 다룰 때는 이런 일반 배열로는 부족할 때가 있음.

- 그래서 형식화 배열이 등장하게 됨. 
    - 형식화 배열은 고정된 크기를 가지고 특정한 데이터 형식만을 저장할 수 있다는 점이 배열과 가장 큰 차이점!
    - 때문에 영상, 오디오, 네트워크 데이터 등을 빠르고 효율적으로 처리할 때 유용하다. 
    - `Array.isArray(형식화 배열)`은 `false`를 반환함. 즉, 형식화 배열은 일반 배열과 다르다!
    - `push`, `pop` 같은 메서드도 사용할 수 없음

## ArrayBuffer와 뷰(view) 구조
형식화 배열은 유연성과 효율성을 위해 버퍼와 뷰로 나뉘어 있음.
- ArrayBuffer: 고정된 크기의 이진 데이터 덩어리(chunk)를 나타냄. 그냥 원시 데이터만을 저장하는 저장소 같은 역할!
    - 이 버퍼 자체로는 아무 의미가 없고, 데이터를 읽고 쓰기 위해선 뷰가 필요하다.
- View: 데이터의 형식을 정의함. (이 데이터가 8비트 정수인지, 32비트 부동 소수점인지 등)
    - 뷰를 통해 버퍼에 저장된 데이터를 우리가 이해할 수 있는 형식으로 다룰 수 있게 된다.

## 형식화 배열의 종류
- `Int8Array` : -128에서 127까지의 8비트 부호 있는 정수(signed integer)를 저장
- `Unit8Array` : 0에서 255까지의 8비트 부호 없는 정수(unsigned integer)를 저장
- `Float32Array` : 32비트 부동 소수점 수를 저장
- `BigInt64Array` : 매우 큰 64비트 정수를 저장
등 다양한 형식화 배열이 있는데, 각각의 배열은 특정한 크기의 데이터만 저장할 수 있기 때문에 `고정된 메모리 공간을 사용`하고 성능도 최적화 되어있음

## DataView
형식화 배열은 특정 형식의 데이터만 다룰 수 있지만, 가끔은 여러 가지 형식의 데이터를 한 번에 처리해야 할 때도 있는데, 이때 DataView가 유용하다.
- DataView는 버퍼의 데이터를 특정 형식에 구애받지 않고 자유롭게 읽고 쓸 수 있음
- 데이터를 big-endian 또는 little-endian 방식으로 처리할 수 있음. (이는 컴퓨터가 데이터를 저장할 때, 큰 값이 앞에 오느냐 뒤에 오느냐에 따른 차이)

## 예시
```js
// 16바이트 크기의 ArrayBuffer 생성
const buffer = new ArrayBuffer(16); 

// Int32Array 뷰 생성 (4바이트 정수를 다루는 뷰)
const int32View = new Int32Array(buffer); 

// 첫 번째 값을 10으로 설정
int32View[0] = 10;

// Float64Array 뷰 생성 (8바이트 부동 소수점을 다루는 뷰)
const float64View = new Float64Array(buffer); // 8바이트씩 해석하는 뷰

// Float64Array의 첫 번째 값을 4.5로 설정
float64View[0] = 4.5;

console.log(int32View[0]); 
```
- 왜 예상치 못한 값이 출력될 수 있지? 10이 나오는거 아닌가
    - 왜냐? ArrayBuffer와 View의 데이터 해석 방식 때문.
    - ArrayBuffer는 그냥 원시 이진 데이터일 뿐이고, 이 데이터를 어떻게 해석하느냐는 내가 만든 뷰에 달려있음.

- 설명
    1. 버퍼 공유: `ArrayBuffer`는 버퍼를 여러 뷰가 공유할 수 있음. 즉, 같은 메모리 공간을 Int32Array와 Float64Array가 동시에 보고 있음.
        - 그래서 어떤 한 뷰에서 데이터를 수정하면, 다른 뷰에서도 그 변경 사항을 볼 수 있지만, 각 뷰가 데이터를 해석하는 방식이 다르기 때문에 값이 다르게 보일 수 있다.
    2. 데이터 크기 차이 : Int32Array는 4바이트(32비트) 정수를 저장하지만, Float64Array는 8바이트(64비트) 부동 소수점 수를 저장함.
        - 따라서 같은 버퍼의 데이터를 이 둘은 서로 다른 방식으로 해석한다. 
        - 예를 들어, int32Array[0]에 10을 넣으면, 버퍼의 첫 4바이트가 10을 나타내는 이진 값으로 채워지지만,
        - float64Array[0]은 첫 8바이트를 부동 소수점 수로 해석하므로 이 값이 내가 예상한 10과는 다르게 보일 수 있다.
    ```js
    const buffer = new ArrayBuffer(16); // 16바이트 버퍼 생성

    const int32View = new Int32Array(buffer); // 4바이트씩 해석하는 뷰
    const float64View = new Float64Array(buffer); // 8바이트씩 해석하는 뷰

    int32View[0] = 10; // int32View로 첫 번째 4바이트를 10으로 설정

    console.log(int32View[0]); // 여기서는 10이 나옴

    console.log(float64View[0]); // 예상치 못한 값이 나올 수 있음
    ```

## 보통 배열로 변환
형식화 배열에서는 일반 배열에서 사용 가능한 모든 메서드가 제공되지 않기 때문에, push(), pop(), map(), filter()와 같은 배열 메서드를 사용하고 싶을 때 형식화 배열을 일반 배열로 변환하는 것이 유용할 수 있음.

형식화 배열에서 일반 배열로 변환하는 방법:
### Array.from()
: ES6부터 도입된 방법으로, 형식화 배열을 일반 배열로 변환하는 가장 쉬운 방법
```js
var typedArray = new Unit8Array([1, 2, 3, 4]);
var normalArray = Array.from(typedArray); // 일반 배열로 변환
console.log(normalArray); // [1, 2, 3, 4]
```

### Array.prototype.slice.call()
: 만약 Array.from()을 사용할 수 없는 환경(구형 브라우저)라면 사용할 수 있는 방법.
    - 형식화 배열을 잘라내어 새로운 배열을 만드는 방법이다!
```js
var typedArray = new Unit8Array([1, 2, 3, 4]);
var normmalArray = Array.prototype.slice.call(typedArray);
console.log(normalArray); // [1, 2, 3, 4]

normalArray.length === 4; // true
normalArray.constructor === Array; // true (변환된 배열은 이제 일반 배열이다!)

```