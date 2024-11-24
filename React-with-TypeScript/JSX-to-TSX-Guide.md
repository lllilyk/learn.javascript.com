## 1. Props와 Interface 기본 개념
React 컴포넌트에서 `Props`는 부모 컴포넌트가 자식 컴포넌트에 전달하는 데이터를 말함. 
TypeScript에서는 이런 `Props`의 구조를 타입으로 정의할 수 있는데, 그 방법 중 하나가 `Interface`!

### Props
React 컴포넌트는 데이터(속성)를 받을 수 있고, 이런 데이터를 `props`라고 부름. 

예를 들어:
```jsx
<MyComponent name="Alice" age={25} />
```
여기에서 `name`과 `age`가 `props`임

### Interface
TypeScript에서는 데이터를 설명하기 위해 `interface`나 `type`으로 구조를 정의함. 
예를 들어:
```tsx
interface Props { // Props라는 이름의 데이터 구조를 정의
    name: string; // name은 문자열 타입이어야 함
    age: number; // age는 숫자 타입이어야 함
}
```

## 2. React에서 Props와 Interface 사용
Props는 부모가 컴포넌트에 전달하는 데이터. 이 Props 구조를 인터페이스로 정의하면, 컴포넌트가 받을 데이터를 정확히 지정할 수 있음. 
```tsx
import React from "react";

// Props의 구조를 정의
interface Props {
    name: string; 
    age: number;
}

// Props를 사용하는 컴포넌트
const MyComponent = ({ name, age }: Props) => {
    return (
        <div>
            <h1>{name}</h1>
            <p>{age} years old</p>
        </div>
    );
};

export default MyComponent;
``` 

## 3. 코드 읽는 법
`{ name, age }: Props`의 의미
1. `Props`는 `name`과 `age`를 포함한 데이터 구조를 말함
    ```tsx
    interface Props {
        name: string;
        age: number;
    }
    ```
2. 컴포넌트 함수의 매개변수에서 구조 분해 할당을 사용하여 `name`과 `age`를 꺼냄
    ```tsx
    const MyComponent = ({ name, age }: Props) => { ... }
    ```
    - 이때 `: Props`는 매개변수의 타입이 `Props`임을 명시.

### 구조 분해 할당이란?
구조 분해 할당은 객체에서 필요한 값을 꺼내는 문법
```ts
const person = { name: "Alice", age: 25 };
const { name, age } = person;
console.log(name); // Alice
console.log(age); // 25  
```

- 이런 방식을 `props`에서 사용하는 것!
    ```tsx
    const MyComponent = ({ name, age }: Props) => { ... }
    ```

## 4. Interface와 Type의 차이
TypeScript에서 `interface` 대신 `type`을 사용할 수도 있음:
```ts
type Props = {
    name: string;
    age: number;
};
```
- 둘 다 비슷하게 동작하지만, `interface`가 확장에 더 용이하기 때문에 React 프로젝트에서 주로 사용된다고 한다. 

## 5. 연습 문제
문제: 아래 JSX 코드를 TSX 코드로 변환하고, Props를 인터페이스로 정의하세요
```jsx
function Greeting({ message }) {
    return <h1>{message}</h1>;
}

export default Greeting;
```

- TSX 코드로 변환
    ```tsx
    interface Props {
        message: string;
        // message?: string; 이렇게 하면 선택적 속성으로 설정하여 undefined 일 수 있음을 허용
    }

    const Greeting = ({ message }: Props) => {
        // const Greeting = ({ message = "Hello, world" }: Props) => {...}
        // 기본 매개변수 값을 설정해서 message가 없을 때 기본값을 사용하도록 함. 
        return <h1>{message}</h1>;
    }

    export default Greeting;

    // Greeting 컴포넌트를 호출할 때 message를 전달하지 않아도 기본 값이 출력됨(근데 기본값은 undefined 상태에서만 적용됨)
    // <Greeting /> // Hello, world
    // <Greeting message="Hi there" /> // Hi there
    ```

## JSX 코드를 TSX 코드로 변환하기
### 1. 간단한 Props
- JSX 코드
    ```jsx
    function Greeting( { name }) {
        return <h1>Hello, {name}!</h1>;
    }

    export default Greeting;
    ```
- TSX 코드
    ```tsx
    interface Props {
        name: string;
    }

    const Greeting = ({ name }: Props) => {
        return <h1>Hello, {name}!</h1>;
    }

    export default Greeting;
    ```
    - 띄워쓰기를 하는 이유
        1. 팀 컨벤션 준수: 일반적으로 구조 분해 할당에서는 { name }처럼 띄워쓰는 규칙을 추가하는 것이 관례라고 함.
        2. 일관성 유지: JavaScript 표준 스타일 가이드(예: Prettier 등)에서도 구조 분해 할당에서 띄워쓰기를 권장 함.
        3. 객체 리터럴과 구분하기 위함
            - 객체 리터럴(Object Literal): 새로운 객체를 생성할 때 사용, 객체의 속성과 값을 선언(객체 리터럴은 `{ key: value }` 형식을 따름)
                `const obj = { name: "Alice" };`
            - 구조 분해 할당(Destructuring): 기존 객체에서 특정 속성 값을 꺼내올 때 사용됨. 
                `const { name } = obj;` 

### 2. 선택적 Props
- JSX 코드:
    ```jsx
    function Welcome({ title }) {
        return <h1>{title}</h1>;
    }

    Welcome.defaultProps = {
        title: "Welcome!",
    };

    export default Welcome;
    ```

- TSX 코드:
    ```tsx
    // TypeScript에서 인터페이스 이름은 관례적으로 첫 글자를 대문자로 작성함. 
    interface WelcomeProps {
        title?: string; // title을 선택적(optional) 속성으로 정의
    }

    const Welcome = ( { title = "Welcome!" }: WelcomeProps ) => {
        return <h1>{title}</h1>; // 기본값 설정
    }

    export default Welcome;
    ```

### 2-1. 기본값과 선택적 Props 활용
- JSX 코드:
    ```jsx
    function Avatar({ url, size }) {
        const avatarSize = size || "medium";
        return <img src={url} alt="User Avatar" className={avatarSize} />;
    }

    export default Avatar;
    ```

- TSX 코드:
    ```tsx
    interface AvatarProps {
        url: string;
        size?: string;
    }

    const Avatar = ({ url, size="medium" }: AvatarProps ) => {
        // const avatarSize = size || "medium"; // 이 코드 자체가 size가 undefined일 때 "medium"을 사용한다는 의미니까 생략
        return <img src={url} alt="User Avatar" className={avatarSize} />;
    }

    export default Avatar;
    ```

### 2-2. 기본값과 선택적 Props 활용
- JSX 코드:
    ```jsx
    function Badge({ text, color }) {
        return <span style={{ color: color || "blue" }}>{text}</span>;
    }

    export default Badge;
    ```

- TSX 코드:
    ```tsx
    interface BadgeProps {
        text: string;
        color?: string;
    }

    const Badge = ({ text, color="blue" }: BadgeProps) => {
        return <span style={{ color: color}}>{text}</span>; // span style={{ color }} 이렇게 해도 됨
    }

    export default Badge;
    ```
    - React에서 스타일을 적용할 때 `style` 속성에서 중괄호를 두 번씩 사용하는 이유
        - React에서 style 속성은 JavaScript 객체를 기대함. 중괄호 두 개는 이 JavaScript 객체를 React의 style 속성으로 전달하기 위한 방식. 
        - 첫 번째 중괄호 : JSX 문법에서 JavaScript 표현식을 삽입할 때 사용
        - 두 번째 중괄호 : JavaScript 객체를 나타냄. CSS 스타일을 객체 형태로 작성해야 React에서 style 속성으로 인식함. 
        - 결과적으로, JavaScript 표현식(JSX) 내에 JavaScript 객체를 전달하는 구조인 것
    - React 스타일링의 특징
        - React에서 style 속성은 CSS 스타일 속성을 객체 형태로 정의해야 함
            ```jsx
            const styles = {
                color: "red",
                fontSize: "20px",
            };
            ```
        - 이 객체를 React 컴포넌트에서 사용하려면:
            ```jsx
            <span style={styles}>Styled Text</span> // 여기서는 한 번의 중괄호만 사용함. 이미 객체(styles)를 변수로 전달하기 때문.
            ```
    - 잘못된 예
        ```jsx
        <span style="color: blue;">Hello!</span> // style에 문자열을 넣으면 오류 발생. React는 문자열 대신 객체를 요구함
        ```
    - 올바른 예
        ```jsx
        <span style={{ color: "blue" }}>Hello!</span> // CSS 스타일을 객체로 작성하여 전달
        ```

### 2-3. 추가 연습 문제
- JSX 코드:
    ```jsx
    function StyledText({ color, fontSize }) {
        return <p style={{ color: color, fontSize: fontSize }}>This is styled Text.</p>;
        // p style= {{ color, fontSize }}> 이렇게 해도 됨. 
    }

    export default StyledText;
    ```

-  React와 ES6의 객체 속성 축약(Object Property Shorthand)
    : JavaScript에서 객체를 생성할 때, 속성 이름과 값의 이름이 동일하면 한 번만 작성해도 됨
    - 예제)
        ```jsx
        const color = "blue";
        const fontSize = "16px";

        // const style = { color: color, fontSize: fontSize }
        const style = { color, fontSize }; // 객체를 축약해서 작성

        console.log(style);
        ```

### 2-4. 추가 연습 문제
- JSX 코드:
    ```jsx
    function StyledCard({ width = "100px", height = "100px", borderColor = "gray" }) {
        return (
            <div style={{ width, height, borderColor }}>
                This is a styled card!
            </div>
        );
    }

    export default StyledCard;
    ```

- TSX 코드:
    ```tsx
    interface StyledCardProps {
        width?: string | number;
        height?: string | number;
        borderColor?: string;
    }

    const StyledCard = ({ width = "100px", height = "100px", borderColor = "gray" }: StyledCardProps) => {
        return (
            <div style={{ width, height, borderColor }}>
                This is a styled card!
            </div>
        );
    }

    export default StyledCard;
    ```

### 3. Boolean Props
- JSX 코드:
    ```jsx
    function Button({ disabled, label }) {
        return <button disabled={disabled}>{label}</button>;
    }

    export default Button;
    ```

- TSX 코드:
    ```tsx
    interface ButtonProps {
        disabled?: boolean;
        label: string;
    }

    const Button = ({ disabled = false, label }: ButtonProps ) => {
        return <button disabled={disabled}>{label}</button>;
    }

    export default Button;
    ```

### 4. Props와 Children
- JSX 코드:
    ```jsx
    function Card({ title, children }) {
        return (
            <div>
            <h1>{title}</h1>
            <div>{children}</div>
            </div>
        );
        }

    export default Card;
    // 요구 사항:
    // title은 문자열이어야 합니다.
    // children은 React 컴포넌트가 포함될 수 있습니다.
    ```

- TSX 코드:
    ```tsx

    ```

### 5. Event Handling
- JSX 코드:
    ```jsx
    function TextInput({ onChange }) {
        return <input type="text" onChange={onChange} />;
    }

    export default TextInput;
    // 요구 사항:
    // onChange는 React의 onChange 이벤트 타입을 사용하세요.
    ```

- TSX 코드:
    ```tsx

    ```

### 6. 배열 Props
- JSX 코드:
    ```tsx
    function ItemList({ items }) {
    return (
        <ul>
        {items.map((item, index) => (
            <li key={index}>{item}</li>
        ))}
        </ul>
    );
    }

    export default ItemList;
    // 요구사항:
    // items는 문자열 배열이어야 합니다.
    ```
    
- TSX 코드:
    ```jsx

    ```


### 7. 상태와 Props
- JSX 코드:
    ```jsx
    import { useState } from "react";

    function Counter({ initialCount }) {
    const [count, setCount] = useState(initialCount);

    return (
        <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        </div>
    );
    }

    export default Counter;
    // 요구 사항:
    // initialCount는 숫자여야 합니다.
    // useState의 타입을 명시하세요.
    ```

- TSX 코드:
    ```tsx

    ```

### 8. 객체 Props
- JSX 코드:
    ```jsx
    function UserInfo({ user }) {
    return (
        <div>
        <h1>{user.name}</h1>
        <p>{user.age} years old</p>
        </div>
    );
    }

    export default UserInfo;
    // 요구 사항:
    // user는 객체이며, name(문자열)과 age(숫자) 속성이 포함됩니다.
    ```

- TSX 코드:
    ```tsx

    ```

### 9. 함수 Props
- JSX 코드:
    ```jsx
    function ActionButton({ onClick }) {
    return <button onClick={onClick}>Click me</button>;
    }

    export default ActionButton;
    // 요구 사항:
    // onClick은 React의 MouseEvent 타입이어야 합니다.
    ```

- TSX 코드:
    ```tsx

    ```

### 10. 복잡한 Props 구조
- JSX 코드:
    ```jsx
    function BlogPost({ post }) {
    return (
        <article>
        <h1>{post.title}</h1>
        <p>{post.content}</p>
        <p>Written by: {post.author}</p>
        </article>
    );
    }

    export default BlogPost;
    // 요구 사항:
    // post는 객체이며, 다음 속성을 가집니다:
    // title: 문자열, content: 문자열, author: 문자열
    ```

- TSX 코드:
    ```tsx

    ```