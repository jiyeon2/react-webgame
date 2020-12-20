# 숫자야구 만들며 배운거

## 20201219 
- props, map, import/require

## 2020
- 렌더링 최적화
    + React.Component, shouldComponentUpdate /React.PureComponent
    + React.memo : 자식 컴포넌트가 모두 memo로 감싸져있으면 부모도 memo로 감쌀 수 있다

- React.createRef : class 컴포넌트에서 ref를 함수형 컴포넌트에서처럼 ref.current로 접근할 수 있다
- setState({}), setState((prev) => {...prev, new}) : 두가지 지원하는 이유는 함수를 인자로 넘겨 미세한 작업을 할 수 있다(js에서 객체와 함수는 high order comoponent이다)
- 자식 컴포넌트가 받은 props는 자식컴포넌트에서 수정하면 안된다. 꼭 변경해야 하는 경우 자식 컴포넌트의 state로 props를 받아와서 수정한다.
