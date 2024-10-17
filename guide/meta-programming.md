# 메타 프로그래밍
메타 프로그래밍은 프로그래밍 언어의 기본 동작을 가로채고 커스터마이징할 수 있는 방법을 제공하는 개념.
JavaScript에서는 `Proxy`와 `Reflect` 객체를 통해 이러한 메타 프로그래밍을 구현할 수 있음. 

## Proxy
`Proxy` 객체는 특정 동작을 가로채고 그에 대해 커스텀 행동을 구현할 수 있게 해줌. 예를 들어, 객체의 프로퍼티에 접근할 때의 동작을 정의 할 수 있다.
```js
const handler = {
    get(target, name) {
        return name in target ? target[name] : 42;
    },
};

const p = new Proxy({}, handler); // p라는 프록시 객체 생성
p.a = 1; // a라는 프로퍼티를 추가하고 값을 1로 설정
console.log(p.a, p.b); // 1, 42
```
- 핸들러(handler) : `get` 메소드를 포함하는 객체로, 객체의 프로퍼티에 접근할 때의 행동을 정의함
- 타겟(Target) : 프록시가 가리키는 원본 객체. 여기서는 빈 객체임
- 트랩(traps) : 객체의 프로퍼티에 접근하는 방법을 제공하는 메소드들. 여기서는 `get` 트랩이 정의되어 있음
- 불변 조건(invariants) : 커스텀 작업을 구현할 때 변하지 않아야 하는 의미. 핸들러의 불변 조건이 위반되면 `TypeError`가 발생함.    

- p.a를 호출하면 a라는 프로퍼티의 값을 1로 설정했으므로 1이 출력됨.
- p.b를 호출하면, b라는 프로퍼티는 없기 때문에 핸들러의 get 메소드가 호출되어 42가 반환됨. 

## 핸들러와 트랩
이 둘은 Proxy 객체와 관련된 용어로, 서로 연결되어 있지만 다름.
### 핸들러(Handler)
- 정의 : 핸들러는 PROxy객체가 특정 작업(예: 프로퍼티 접근, 할당 등)을 수행할 때 호출되는 메서드가 포함된 객체
- 역할 : 핸들러는 어떤 동작을 정의할 것인지 명시함. 예를 들어, 어떤 프로퍼티를 요청할 때 그 요청을 어떻게 처리할지에 대한 로직을 포함함.

### 트랩(Trap)
- 정의 : 트랩은 핸들러 객체에 정의된 개별 메소드로, PROxy의 특정 작업을 가로채고 커스터마이즈된 동작을 수행할 수 있게 함.
- 역할 : 트랩은 핸들러의 실제 메소드. 예를 들어, get 트랩은 프로퍼티에 접근할 때 호출되는 메소드이다. 

```js
// handler는 핸들러 객체
const handler = {
  // get 메소드는 'get' 트랩
  get(target, property) { // Proxy가 특정 프로퍼티에 접근할 때 호출됨
    return property in target ? target[property] : 'default value';
  },
};

const proxy = new Proxy({}, handler);
```

## Proxy 핸들러 및 트랩(자주 사용되는 것 위주)
1. `handler.get(target, property)`
    - 작용: 객체의 프로퍼티에 접근할 때 호출됨
    - 예시: `proxy.foo`처럼 프로퍼티를 가져올 때 실행됨
    - 사용 예: 프로퍼티가 존재하지 않을 경우 기본값을 설정할 수 있음
2. `handler.set(target, property, value)`
    - 작용: 객체의 프로퍼티에 값을 할당할 때 호출됨
    - 예시: `proxy.foo = 42`와 같이 값을 설정할 때 실행됨
    - 사용 예: 특정 조건에 따라 프로퍼티 값을 제한할 수 있음
3. `handler.has(target, property)`
    - 작용: `in` 연산자를 사용할 때 호출됨
    - 예시: `foo in proxy`와 같이 프로퍼티 존재 여부를 확인할 때 실행됨
    - 사용 예: 객체가 특정 프로퍼티를 가지고 있는지 커스터마이즈된 로직으로 판단할 수 있음. 
    ```js
    const target = {
        name: 'Alice',
        age: 30,
    };

    // 커스터마이즈된 로직을 가진 핸들러
    const handler = {
        has(target, property) {
            // 프로퍼티가 'age'이고 30보다 클 때만 true 반환
            if (property === 'age' && target.age > 30) {
                return true;
            }
            // 그 외에는 기본적으로 객체에서 프로퍼티 존재 여부 확인
            return property in target;
        }
    };

    // 프록시 객체 생성
    const proxy = new Proxy(target, handler); 
    //1. 프록시 생성: Proxy 객체가 생성되면, target은 프록시로 감싸지게 되고, handler 객체 안의 트랩들이 기본 동작을 대체할 준비를 함. 
    //2. 트랩 자동 호출: 이후 Target 객체에 대해 특정 작업을 할 때(get, set, in 연산자 등), 자바스크립트는 프록시를 통해 그 작업을 가로채고, 내가 정의한 트랩(Handler.has)이 자동으로 실행됨. 
    // 즉, 내가 직접 handler.get()나 handler.has()를 호출하는게 아니라, 해당 작업을 수행하는 순간 트랩이 호출되는 것!

    // 사용 예
    console.log('name' in proxy); // true
    ```
    - 프록시는 직접 호출되는 함수가 아니고! 대신 자바스크립트의 기본 동작을 가로채는 역할을 함. 
        - 즉, 객체에서 사용하던 get, set, in 같은 연산이나 메서드가 프록시를 통해 자동으로 호출될 때, 그 때 핸들러 안에 정의된 트랩(함수)이 실행되는 방식. 
    
    - 다른 예시
        ```js
        const target = {
            name: 'Alice',
            age: 30,
        };

        const handler = {
            get(target, property) {
                console.log(`Getting ${property}`);
                return target[property];
            },
        };

        const proxy = new Proxy(target, handler);

        // 프로퍼티 접근 (프록시가 가로챔)
        console.log(proxy.name); //Getting name //Alice
        ```
        - 1. 프록시 생성 : target 객체와 handler 핸들러로 프록시 객체 Proxy를 생성
        - 2. 프로퍼티 접근 시 : `proxy.name`이라고 하면, 원래는 `Target.name`을 바로 가져와야 하지만, 프록시가 이 동작을 가로채서 `handler.get` 트랩을 실행함. 여기서 get 트랩이 호출되며 콘솔에 "Getting name"을 출력하고, 실제로 `target[name]`값을 반환함.
        - 즉! 핸들러의 트랩들은 자바스크립트가 객체에 대한 특정 작업을 할 때 자동으로 호출되는 함수들이다!!!
4. `handler.deleteProperty(target, property)`
    - 작용: 객체의 프로퍼티를 삭제할 때 호출됨
    - 예시: delete proxy.foo와 같이 프로퍼티를 삭제할 때 실행됨
    - 사용 예: 삭제를 막거나, 삭제할 때 특정 작업을 수행할 수 있음.

5. `handler.ownKeys(target)`
    - 작용: 객체의 모든 프로퍼티 이름을 가져올 때 호출됨
    - 예시: Object.keys(proxy)를 사용하면 호출된다.
    - 사용 예: 특정 프로퍼티만 반환하도록 필터링 가능

6. `handler.apply(target, thisArg, argumentsList)`
    - 작용: 함수를 호출할 때 호출됨
    - 예시: proxy(...args)로 함수를 호출할 때 실행됨
    - 사용 예: 함수 호출 시 추가적인 로직(예: 로그 기록)을 삽입 가능

## Revocable Proxy
Proxy 객체를 동적으로 생성하고, 나중에 해당 Proxy를 사용하지 않도록 철회(revoke)할 수 있는 기능을 제공함.
- 이를 통해 특정 시점에서 Proxy를 사용 중지할 수 있으며, 이후에 Proxy에 대한 모든 작업은 TypeError를 발생시킴.

```js
// Revocable Proxy 생성
const revocable = Proxy.revocable(
  {}, // 첫 번째 인자는 target으로 빈 객체가 사용됨
  { // 두 번째 인자는 handler로 get트랩이 정의되어 있으며, 이 트랩은 Proxy를 통해 속성에 접근할 때 호출됨
    get(target, name) {
      return `[[${name}]]`;
    },
  },
);
const proxy = revocable.proxy;
console.log(proxy.foo); // 속성에 접근: proxy.foo에 접근하면 get트랩이 호출되어 [[foo]] 문자열이 반환됨

revocable.revoke(); // revoke() 메소드를 호출하여 프록시 철회

console.log(proxy.foo); // 철회된 프록시에서 속성에 접근하거나 값을 설정하거나 삭제를 시도하면 모두 TypeError가 발생함. 
// 프록시가 더이상 유효하지 않기 때문!

proxy.foo = 1; 
delete proxy.foo; 

console.log(typeof proxy); // typeof 연산자는 Proxy의 트랩을 호출하지 않기 때문에, 프록시가 철회되었더라도 object를 반환함. 
// typeof는 내부적으로 동작하므로!
```

## Reflection (Reflect 객체)
Reflect는 JavaScript의 내장 객체로, 객체에 대한 기본적인 작업을 위한 메서드를 제공하며, 이 메서드는 Proxy 핸들러의 메서드와 동일하다.
- Reflect는 함수 객체가 아니고 기본적인 객체 작업을 간단하게 수행할 수 있도록 도와주는 객체. 

### 주요 기능
1. 기본 작업 전달: Reflect는 핸들러에서 기본 작업을 타겟으로 전달하는데 도움을 줌. 예를 들어, `Reflect.has()`는 `in` 연산자를 함수형태로 제공함
    ```js
    Reflect.has(Object, "assign"); // true
    ```

2. 간단한 함수 호출: Reflect를 사용하면 `Function.prototype.apply()`보다 더 간결하고 이해하기 쉬운 방식으로 함수를 호출할 수 있음
    ```js
    // Math.floor를 호출
    Reflect.apply(Math.floor, undefined, [1.75]); // 1

    // 문자열의 특정 문자 가져오기
    Reflect.apply("".charAt, "ponies", [3]); // "i"
    ```

3. 속성 정의 성공 여부 확인: `Object.defineProperty`는 속성을 정의하는 데 성공하면 객체를 반환하고 실패하면 `TypeError`를 던진다.
    - 반면, `Reflect.defineProperty()`는 성공 여부를 Boolean 값으로 반환함. 이렇게 하면 `try...catch` 블록 없이도 성공 여부를 쉽게 확인 가능!
    ```js
    if (Reflect.defineProperty(target, property, attributes)) {
        // 성공
    } else {
        // 실패
    }
    ```

