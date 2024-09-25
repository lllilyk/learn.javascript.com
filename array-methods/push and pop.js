// 배열 메서드
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// push : 배열의 끝에 하나 이상의 요소를 추가하고, 새로운 배열의 길이를 반환함. 원본 배열이 변경됨.
  // ex
  const numbers = [1, 2, 3];
  const newLength = numbers.push(4, 5);

  console.log(newLength); // 5
  console.log(numbers); // [1, 2, 3, 4, 5]

// -----------------------------------------------------------------------------------------------

// pop : 배열의 마지막 요소를 제거하고, 그 요소를 반환함. 원본 배열이 변경됨.
  // ex
  const numbers2 = [1, 2, 3, 4, 5];
  const lastElement = numbers2.pop();
  console.log(lastElement); // 5
  console.log(numbers2); // [1, 2, 3, 4]

