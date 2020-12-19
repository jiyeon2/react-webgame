# 구구단 만들며 배운것

- 리액트는 데이터(상태)에 따라 화면을 자동으로 바꿔준다.
- 컴포넌트를 만들어 코드 중복을 줄일 수 있다. 생산성 향상
- HTML + js 형태의 jsx는 자바스크립트 엔진이 해석할 수 없음 -> 바벨(트랜스파일러) 필요
- jsx 에서는 반드시 닫는태그 필요, 태그가 하나인 경우 <MyComponenet / > 이렇게 써야함
- setState()는 비동기로 동작함, 이전 상태 참조할 경우 setState((prev) => {new : prev+1})

- 20201217
    - React.createElement(elem, attributes, textContent) 로 리액트 컴포넌트 생성
    - ReactDOM.render(componenet, targetElem) 로 DOM에 렌더링
    - js 코드 내에서 HTML 문법 사용할 수 없음
    - 실험적 문법 JSX(js + XML) 사용하기 위해 babel 필요
        - 바벨은 최신문법이나 실험적 문법을 es5로 바꿔줌
        - 바벨 스크립트 로딩하고, ```<script type="text/babel>``` 쓰면 됨
    - class components의 state : 수동으로 바꿀 값들을 state로 만든다

- 20201218
    + React.Fragment <> </>
    + this.setState({ value : this.state.value + 1}) 처럼 setState내에서 this.state 접근하는 경우
        * this.setState((prevState) => { return {value: prevState.value+1} })처럼 함수 쓰기
    + dom에 접근하는 경우 ref 사용
        * JSX 에서 <input ref={(c) => this.input = c;}>
        * this.input으로 input에 접근가능
    + setState() 실행후 render()함수가 재실행됨
        - 이벤트 핸들러를 익명함수로 jsx에 넣어두면 render 함수 실행될 때마다 이벤트 핸들러가 생성되므로 따로 빼서 쓴다
        - render() 함수 내에서 시간이 오래 걸리는 작업은 하지 않는다