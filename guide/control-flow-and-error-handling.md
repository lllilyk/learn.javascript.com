- 참고
    - ECMA2015 이전의 자바스크립트에는 블록 스코프가 없었다!
    - 구형 자바스크립트 코드에서는 블록 내에 정의한 변수의 스코프를 그 블록이 아니라, 변수 선언을 포함한 함수 또는 스크립트로 설정함.
        - 즉, 블록문이 스코프를 정의하지 않음.
        ```js
        var x = 1;
        {
            var x = 2;
        }
        console.log(x); // 2 <- 블록 내의 var x가 블록 밖의 var x와 동일한 스코프를 갖기 때문.
        ```
    - ECMA2015에 도입된 let과 const 변수 선언이 블록 스코프를 가짐.


# 제어 흐름과 오류 처리
## 조건문
JavaScript는 `if...else`와 `switch` 두 종류의 조건문을 지원함. 

1. if...else
    ```js
    if (condition_1) {
    statement_1;
    } else if (condition_2) {
    statement_2;
    } else if (condition_n) {
    statement_n;
    } else {
    statement_last;
    }
    ```
    - if...else의 조건에 `x=y`같은 할당은 지양할 것!
        ```js
        if ((x=y)) {
            /* 명령문 */
        }
        ```
    - false : `false`, `undefined`, `null`, `0`, `NaN`, `빈 문자열('')`
    - true : 객체를 포함한 다른 모든 값들은 조건문에 전달했을 때 true로 평가됨. 
    - 참고.
        - true와 false 원시 값을 Boolean 객체의 참, 거짓 값과 혼동하지 않도록 주의!
        ```js
        const b = new Boolean(false);
        if (b) // 참으로 평가
        if (b == true) // 거짓으로 평가
        ```

2. switch
    ```js
    // switch문은 프로그램이 표현식을 평가한 후, 그 값과 case 레이블의 값을 비교해 일치하는 case의 명령문을 실행함
    switch (expression) {
        case label_1;
            statements_1;
            break;
        case label_2;
            statements_2;
            break;
            ...
        default:
            statements_default;
    }
    ```
    - 일련의 과정
        - 표현식의 결과와 일치하는 레이블을 가진 case절을 찾아, 관련된 명령문을 실행함
        - 일치하는 레이블을 찾지 못했으면 default절을 탐색!
            - default절을 찾았으면 관련된 명령문 실행
            - 찾지 못했으면 switch문 바깥의 다음 명령문을 실행함.
    - break문
        - 각각의 case에는 선택적으로 break문을 추가할 수 있으며, break는 case의 명령문을 실행한 후에 프로그램이 switch 밖으로 나가도록 함. 
        - break를 생략하면 프로그램은 switch를 탈출하지 않고, 다음 case의 명령문을 실행한다.  

## 예외 처리 명령문
1. throw
    - 예외를 던질 때는 throw문! `throw expression;`
    ```js
    // 특정 타입의 표현식이 아니라 무엇이든 던질 수 있음. 
    throw "Error2";
    throw 42;
    throw true;
    throw {
        toString: function() {
            return "저는 객체예요";
        }
    }
    ```

2. try...catch문
    - try...catch문은 실행을 시도할 블록을 표시하고, 그 안에서 예외가 발생할 경우 처리를 맡을 하나 이상의 반응 명령문을 지정함.
    - 예외가 발생하면 try...catch문이 잡아냄.
    - 구성
        - 하나 이상의 명령문을 포함하는 `try 블록`
        - try에서 예외가 발생할 경우 그 예외를 처리할 명령문을 담은 하나의 `catch 블록`
    - try 블록의 명령문 중 하나에서 예외를 던지면, 실행 제어권은 그 즉시 catch블록으로 넘어감.
        - try 블록 내에서 예외가 발생하지 않았으면 catch 블록은 실행되지 않음.
    ```js
    function getMonthName(mo) {
        mo = mo -1; 
        let months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        if (months[mo]) {
            return months[mo];
        } else {
            throw "InvalidMonthNo"; 
        }
    }

    try {
        // 시도할 명령문
        monthName = getMonthName(myMonth); // monthName은 getMonthName() 함수 호출의 결과를 저장하는 변수
    } catch (e) { // e는 getMonthName() 함수에서 발생한 예외(에러) 정보를 담고 있는 객체 <- 문자열 InvalidMonthNo
        monthName = "unknown";
        logMyErrors(e); // 오류 처리기에 예외 객체 전달
    }
    ```

    - catch 블록 : try 블록에서 발생할 수 있는 모든 예외는 catch블록에서 처리할 수 있음
        ```js
        try {
            throw "myException"; // 예외 생성
        } catch (e) {
            // 모든 예외를 처리하기 위한 명령문
            logMyErrors(e); // 오류 처리기에 예외 객체 전달
        }
        ```
    - 참고 : `catch 블록`안에서 오류를 기록할 땐 `console.log()`보다 `console.error()`를 사용하는 것을 추천!
        - `console.error()`가 출력 형식도 오류에 적합하고, 현재 페이지에서 발생한 오류의 목록도 업데이트 하기 때문.
    
    - finally 블록 : `try`와 `catch` 블록 실행이 끝난 후 이어서, 그리고 `try...catch...finally문` 이후의 명령문들보다는 먼저 실행할 명령문을 담는다. 
        - try 블록 안에서 예외가 발생했는지 여부와 관계없이, catch블록이 따로 존재하지 않더라도 항상 실행됨.
        ```js
        openMyFile();
        try {
            writeMyFile(theData); // 오류가 발생할 수 있는 코드
        } catch(e) {
            handleError(e); // 오류가 발생하면 처리함
        } finally {
            closeMyFile(); // 항상 리소스 해제
        }
        ```
        - 만약, `finally`블록이 값을 반환한다면, 그 값이 전체 `try...catch...finally`문의 반환값이 되며 try와 catch 블록에서 반환하는 값은 무시함.
        ```js
        function f() {
            try {
                console.log(0);
                throws "bogus"; // 예외가 발생하였으므로 바로 catch블록으로 이동
            } catch (e) {
                console.log(1);
                return true; // finally 블록이 있어서 무시됨
                console.log(2); // return 뒤에 있으므로 절대 실행되지 않는다.
            } finally {
                console.log(3);
                return false; // 이 false값이 최종적으로 try...catch...finally 함수의 최종 반환 값이 됨.
                console.log(4); // return 뒤에 있으므로 절대 실행되지 않는다!
             }
            console.log(5); // finally 블록에서 return이 실행되면 함수가 종료되기 때문에, 이후의 코드는 더 이상 실행되지 않음.
        }
        console.log(f()); // 0, 1, 3, false
        ```
3. Error 객체 활용하기
    - Error 객체의 `name`, `message` 속성으로부터 오류의 유형에 따라 좀 더 정제된 메시지를 가져올 수 있음. 
        - `name`은 `Error`의 일반적인 클래스(`DOMException`, `Error` 등)를 제공함.
        - `message`는 오류 메시지로, 대개 오류 객체를 문자열로 변환한 결과보다 더 간결한 형태. 
    ```js
    function doSomethingErrorProne () {
        if (ourCodeMakesAMistake){
            throw (new Error('메시지'));
        } else {
            doSomethingToGetAJavaScriptError();
        }
    }
    ...
    try {
        doSomethingErrorProne();
    }
    catch (e) {
        console.log(e.name); // 'Error' 기록
        console.log(e.message); // '메시지' 또는 JavaScript 오류 메시지 기록
    }
    ```