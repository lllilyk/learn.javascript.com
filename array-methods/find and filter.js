// 배열 메서드
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

// find : 배열에서 주어진 조건을 만족하는 첫 번째 요소를 반환하며, 만족하는 요소가 없으면 undefined를 반환함.
  // ex1 : 배열에서 조건에 맞는 첫 번째 짝수 찾기 
  const numbers1 = [1, 2, 3, 4, 5];
  const firstEven = numbers1.find(num => num % 2 === 0);
  console.log(firstEven); // 2

  // ex2 : 객체 배열에서 특정 이름을 가진 사용자 찾기
  const users1 = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35}
  ];
  const userBob = users1.find(user => user.name === 'Bob');
  console.log(userBob); // { name: 'Bob', age: 30 }
  
// -----------------------------------------------------------------------------------------------

// filter: 배열에서 주어진 조건을 만족하는 모든 요소를 모아 새로운 배열로 반환함. 기존 배열은 변경하지 않음. 
  // ex1 : 짝수만  필터링
  const numbers2 = [1, 2, 3, 4, 5, 6];
  const evenNumbers = numbers2.filter(num => num % 2 === 0);
  console.log(evenNumbers); // [2, 4, 6]

  // ex2 : 객체 배열에서 특정 속성값이 있는 객체만 필터링
  const users2 = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 35}
  ];

  const ageOver30 = users2.filter(user => user.age > 30);
  console.log(ageOver30); // [{ name: 'Charlie', age: 35}]