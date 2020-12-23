# 틱택토

## 20201223 수
- useReducer : state 너무 많을 때, state전달해야 할 컴포넌트 단계가 너무 많을 때 사용

- 불변성 유지 - 얕은복사 깊은복사? 이차원배열 헷갈림.. 
- action은 모듈로 보내고 받는데 reducer함수는 props 로 보냄..
    + -> 왜냐면 액션은 tictactoe 컴포넌트 외부에 있고, dispatch 함수는 컴포넌트 내에서 useReducer로 생성해서 가지고 있는거라 그럼