# 1. the Color picker
https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Color_picker_tool <- hex(adecimal) 

<br />

# 2. Google Fonts
https://fonts.google.com/ <- Embed code를 통해 원하는 폰트를 사용할 수 있음.

<br />

# 3. 폴더와 파일 이름을 지을 때
- 공백 없이 영문 소문자로
- 밑줄문자(_)를 사용하기 보다는 하이픈(-)으로 단어를 구분하는 것이 좋다
  구글 검색 엔진이 하이픈은 단어 구분자로 취급하지만 밑줄문자는 단어 구분자로 취급하지 않는다!

 > 폴더와 파일 이름을 지을 때에는 공백이 없는 영문 소문자와 대시로 구분된 단어로 작성하는 습관을 들이는 것이 좋음!

<br />

# 4. 파일 경로
파일 경로를 위한 일반적인 규칙들:
- 호출하는 HTML 파일과 같은 디렉토리에 있는 파일을 연결하려면 파일 이름만 사용하면 됨. 예: my-image.jpg
- 하위 폴더에 위치한 파일을 참조하기 위해서는, 디렉토리 이름과 전방향 슬래시(/)를 경로 앞에 추가함. 예: subdirectory/my-image.jpg
- 호출하는 HTML 파일의 상위 디렉토리에 있는 파일을 연결하려면, ..을 찍어야 함. 예: ../my-index.png

<br />

# 5. HTML 기본
#### HTML(HyperText Markup Language) : 콘텐츠의 구조를 정의하는 마크업 언어
- 요소(element) 중첩(nesting) : 요소를 다른 요소의 안에 놓을 수 있음
- <p>My cat is <strong> very </strong> cute </p>


## HTML 문서 해부
```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>My test page</title>
  </head>
  <body>
    <img src="images/firefox-icon.png" alt="My Test Image" /> // 빈 요소
  </body>
</html>
```
- `<!doctype html>` : HTML 문서의 가장 첫 번째 줄에 위치하며, HTML5 문서임을 선언하는 역할.
  - 이를 통해 브라우저는 문서를 표준 모드로 렌더링하게 되며, 올바르게 웹 페이지를 표시할 수 있게 됨. 
  - 만약 이 선언이 없으면 브라우저가 호환성 모드나 쿼크 모드(비표준 호환 모드)로 동작할 수 있는데, 이 경우 오래된 방식으로 문서를 렌더링할 수 있어 페이지가 예상과 다르게 표시될 수 있음.
  - 즉, 표준 모드(no-quirks 모드)를 활성화하는 것이 목적!
- `<html></html>` : 페이지 전체의 콘텐츠를 감싸며, 루트(root) 요소라고도 함. 문서의 고유 언어를 설정하는 `lang` 설정을 포함함.
- `<head></head>` : 페이지를 조회하는 사람들에게 보여주는 콘텐츠가 아닌, 내가 HTML 페이지에 포함하고 싶어하는 모든 재료들을 위한 컨테이너 역할을 함. 
  - 여기에는 keywords와 검색 결과에 포함되길 원하는 페이지 설명, 콘텐츠를 꾸미기 위한 CSS, 문자 집합 선언 등과 같은 것들을 포함함. 
- `<meta charset="utf-8" />` : 문서가 사용해야 할 문자 집합을 주류 기록 언어에 있는 대부분의 문자가 포함되어 있는 uft-8로 설정함. 
- `<meta name="viewport" content="width=device-width">` : 뷰포트 요소는 뷰포트의 너비에서 페이지가 렌더링되도록 하며, 모바일 브라우저가 뷰포트보다 넓은 페이지를 렌더링한 후 축소하는 것을 방지함. 
  - 뷰포트란?
    - 현재 보고 있는 컴퓨터 그래픽의 영역을 나타냄. 웹 브라우저 용어로, 일반적으로 UI, 메뉴 모음 등을 제외한 브라우저 창과 동일함. 
    - 뷰포트의 크기는 화면 크기, 브라우저가 전체 화면 모드인지 여부, 사용자가 확대했는지 여부에 따라 달라짐.
    - 다음과 같은 DOM 속성을 사용하여 뷰포트 크기를 확인할 수 있음
      - `document.documentElement.clientWidth` : CSS 픽셀 기준으로 문서의 내부 너비(패딩 포함)
      - `window.innerWidth` : 브라우저 창의 뷰포트 너비(CSS 픽셀 기준)
      - `window.outerWidth` : 브라우저 창의 외부 너비(브라우저 크롬 포함)
  - 레이아웃 뷰포트 & 비주얼 뷰포트
    - 레이아웃 뷰포트(Layout Viewport)란? 
      - 정의 : 웹 페이지의 전체 레이아웃을 계산하는 데 사용되는 공간으로, 페이지의 요소들이 어떻게 배치될지를 결정함. 
      - 이 뷰포트를 기준으로 요소의 크기를 정의하면 페이지의 전체적인 구조를 안정적으로 유지할 수 있음.
      - 사용자가 페이지를 확대하거나 축소하더라도 레이아웃 뷰포트는 변하지 않음. 즉, 콘텐츠의 배치나 크기는 고정되어 있음. 
      - 레이아웃 뷰포트의 크기는 기본적으로 브라우저의 내부 크기(내부 스크롤바 포함)로 결정됨.

    - 비주얼 뷰포트란? 
      - 정의 : 현재 화면에 표시되고 있는 웹 페이지의 부분으로 사용자가 보고 있는 콘텐츠를 나타냄. 
      - 이 영역은 확대/축소, 모바일 키보드의 출현 등 여러 요인에 따라 달라질 수 있음. 따라서 `vh`와 `vw` 단위는 레이아웃 뷰포트를 기준으로 함. 

  - 뷰포트 단위
    - vh (viewport height) : 1vh는 레이아웃 뷰포트 높이의 1%를 의미함
      - 예를 들어, 레이아웃 뷰포트의 높이가 800px이면 1vh는 8px.
    - vw (viewport width) : 1vw는 레이아웃 뷰포트의 너비의 1%를 의미함.
      - 마찬가지로, 레이아웃 뷰포트의 너비가 1200px이면 1vw는 12px.

  - 예시 코드
    ```css
      body {
        height: 100vh;
      }
    ```
    - 전체 레이아웃 뷰포트의 높이를 기준으로 100%의 높이를 설정하는 것. 즉, 사용자가 페이지를 확대하거나 축소해도 이 높이는 변하지 않고, 항상 레이아웃 뷰포트의 전체 높이를 유지함. 

  - 모바일 장치 예시 코드
    ```html
      <meta name="viewport" content="width=device-width" />
    ```
- `<title></title>` : 페이지의 제목을 설정하는 요소. 로드된 페이지 브라우저의 탭에 나타나는 제목.
- `<body></body>` : 페이지에 방문한 모든 사용자들에게 보여주길 원하는 모든 컨텐츠를 담고 있음.

<br />

# 6. CSS(Cascading Style Sheets) 기초
- /styles/style.css 
- index.html
  ```html
  <link href="styles/style.css" rel="stylesheet" type="text/css" />
  ```
- css의 전체 구조는 `rule set`이라 불림. 
  - 선택자(selector) : rule set의 맨 앞에 있는 HTML 요소의 이름. ex) p, #id
  - 선언 : ex) color: red와 같은 단일 규칙
  - 속성(property) : 주어진 HTML 요소를 꾸밀 수 있는 방법 ex) color: red에서 color부분
  - 속성 값 : 속성의 오른쪽, 콜론 뒤에 위치함. 
- 각각의 rule set은 반드시 `{}`로 감싸져야 함.
- 각각의 선언 안에, 각 속성을 해당 값과 구분하기 위해 콜론(:)을 사용해야만 함
- 각각의 rule set 안에서 각 선언을 그 다음 선언으로부터 구분하기 위해 세미콜론 (;)을 사용해야만 함!

#### 선택자의 여러 종류
- 요소 선택자 : 특정 타입의 모든 HTML 요소 
  - ex) p : `<p>를 선택`
- 아이디 선택자 : 특정 아이디를 가진 페이지의 요소 (주어진 HTML 페이지에서, 아이디당 딱 하나의 요소만 허용됨)
  - ex) #my-id : `<p id="my-id">`
- 클래스 선택자 : 특정 클래스를 가진 페이지의 요소 (한 페이지에 클래스가 여러번 나타날 수 있음)
  - ex) .my-class : `<p class="my-class>`
- 속성 선택자 : 특정 속성을 갖는 페이지의 요소
  - ex) img[src] : `<img src="myimage.png">를 선택하지만 <img>는 선택 안함`
- 수도(Pseudo) 클래스 선택자 : 특정 요소이고 특정 상태에 있을 때만 해당됨
  - ex) a:hover : `<a>를 선택하지만, 마우스 포인터가 링크 위에 있을 때만 선택함`

<br />
