## 1. 인덱스 기반의 컬렉션 - 배열 메서드 연습
```js
// filter 메서드를 사용해서 짝수만 콘솔에 출력해보세요.
const numbers = [10, 15, 20, 25, 30];

const evenNumbers = numbers.filter(number => number % 2 === 0);
console.log(evenNumbers);

// map 메서드를 사용해서 각 요소에 2를 곱한 값을 출력하세요.
const numbers = [1, 2, 3, 4, 5];

const doubleNumbers = numbers.map(number => number * 2);

// reduce 메서드를 사용해서 배열의 합계를 출력하세요.
const numbers = [10, 20, 30, 40];

const sumNumbers = numbers.reduce((accumulator, current) => accumulator + current, 0);
console.log(sumNumbers);

// find 메서드를 사용해서 20보다 큰 첫 번째 값을 찾아서 출력하세요.
const numbers = [5, 10, 15, 25, 30];

const firstNumberOverTwenty = numbers.find(number => number > 20);
console.log(firstNumberOverTwenty);

// some 메서드를 사용해서 짝수가 있는지 여부를 출력하세요.
const numbers = [1, 3, 5, 7, 10];

const hasAnyEven = numbers.some(number => number % 2 ===0);
```

## 2. 문자열 + 배열
1. 문자열 배열을 하나의 문자열로 합치기
    주어진 배열의 문자열들을 하나의 문자열로 결합하고, 각 단어 사이에 공백을 추가해서 출력하세요.
    ```js
    const words = ['Hello', 'world', 'this', 'is', 'JavaScript'];
    // join 메서드를 사용해서 하나의 문자열로 결합해보세요.
    
    const joinAllWords = words.join(" ");
    console.log(joinAllWords);
    ```

2. 문자열을 배열로 분리하기
    주어진 문장에서 각 단어를 배열의 요소로 분리해보세요. 분리 기준은 공백입니다.
    ```js
    const sentence = 'JavaScript is fun to learn';
    // split 메서드를 사용해서 문장을 단어 배열로 분리하세요.
    
    const splitSentence = sentence.split(" ");
    console.log(splitSentence);
    ```

3. 문자열 배열의 길이 기준 필터링
    주어진 배열에서 문자열의 길이가 5 이상인 단어만 필터링하세요.
    ```js
    const words = ['apple', 'banana', 'kiwi', 'orange', 'pear'];
    // filter 메서드를 사용해서 길이가 5 이상인 단어들만 추출하세요.

    const overFiveLetter = words.filter(word => word.length >= 5);
    console.log(overFiveLetter);
    ```

4. 문자열을 뒤집기
    주어진 문자열을 문자 하나하나씩 배열로 나눈 후, 배열을 뒤집고 다시 문자열로 결합하여 출력하세요.
    ```js
    const str = 'JavaScript';
    // split, reverse, join 메서드를 사용해서 문자열을 뒤집어보세요.

    const splitStr = str.split("");
    const reverseSplitStr = splitStr.reverse();
    const joinReverseSplitStr = reverseSplitStr.join("");
    console.log(joinReverseSplitStr);
    ```

5. 각 단어의 첫 글자만 대문자로 변환하기
    주어진 문장의 각 단어의 첫 글자를 대문자로 바꾸고, 나머지는 소문자로 유지하세요.
    ```js
    const sentence = 'javascript is really fun to learn';
    // map 메서드와 문자열 메서드를 사용해서 각 단어의 첫 글자만 대문자로 변환하세요.
    
    // 일단 단어 단위로 나누기
    const splitSentence = sentence.split(" "); // ['javascript', 'is', 'really', 'fun', 'to', 'learn']
    
    // map을 사용해서 각 단어의 첫 글자는 대문자로 바꾸고 나머지는 소문자 유지
    const capitalized = splitSentence.map(word => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });

    // 단어를 문장으로 합치기
    const result = capitalized.join(" ");
    console.log(result);
    ```

6. 문자열에서 특정 문자 제거하기
    주어진 문자열에서 모든 a 문자를 제거하고 결과를 출력하세요.
    ```js
    const sentence = 'I am learning JavaScript and it is amazing';
    // split, filter, join 메서드를 사용해서 'a' 문자를 제거하세요.

    const splitSentence = sentence.split("");
    const notAword = splitSentence.filter(word => word != "a");

    const joinWords = notAword.join("");
    ```