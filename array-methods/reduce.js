// 배열 메서드
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// reduce : 배열의 각 요소에 대해 누적값을 계산하고, 하나의 값으로 반환함
  // ex1 : 배열의 합 계산
  const numbers = [1, 2, 3, 4];
  const sum = numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  // accumulator(acc)는 이전 계산 결과를 저장하는 변수.
  // 처음에는 초기값(두 번째 매개변수로 전달된 값)이 들어가며, 이후 각 반복에서 누적된 결과가 저장됨.
  // (accumulator, currentValue) => accumulator + currentValue : reduce 메서드에 넘겨지는 콜백 함수. 이 함수는 배열의 각 요소를 순회하면서 누적된 값을 계산함
  // 0 : 두 번째 파라미터로, accumulator의 초기값. 배열 순회가 시작될 때 accumulator는 이 값으로 시작하며, 그 후에 배열의 각 요소를 더해나감

  // currentValue: 현재 배열에서 처리 중인 요소.
  console.log(sum); //10

  // ex2 : 객체 배열에서 나이 합산
  const users = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35 }
  ];

  const totalAge = users.reduce((acc, user) => acc + user.age, 0);
  console.log(totalAge); // 90