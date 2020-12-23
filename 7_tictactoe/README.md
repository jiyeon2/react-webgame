# 틱택토

## 20201223 수
- useReducer : useState의 대체함수
    + state가 너무 많아질 때 useReducer 사용하는 것 고려
    + state 모아두고, action을 통해서 state를 바꿈
    + state 바꿀때는 불변성 유지할것!
```jsx
    const [state, dispatch] = useReducer(reducer, initialState);
```
- useReducer 는 state가 비동기적으로 바뀜(redux는 동기적으로 바뀜) -> 비동기 작업 처리는 useEffect에서! (렌더링시 할 수 없는 작업)


- 동작 만든 후 최적화 -> react devtool highlight 체크하고 확인, td부터 보기
    + 리렌더링 될 때 빨갛게 되면 최적화 꼭 해야함
- useMemo / memo 차이? 
    + useMemo로 전달된 함수는 렌더링 중에 실행된다. 렌더링 시 시간이 오래걸리는 고비용 계산을 useMemo에 넣어두면 그 값을 기억해뒀다가 사용한다(의존성 배열 값이 변하지 않는 한)
    + React.memo 는 고차 컴포넌트(HOC). 동일한 props로 동일한 결과 렌더링 하는 경우 React.memo 를 호출해 결과를 메모이징하도록 래핑. 컴포넌트를 렌더링하지 않고 마지막으로 렌더링 된 결과를 재사용함. prop이 바뀐경우(useState, useContext 사용하는 경우 state, context 바뀐 경우도 포함) 새로 렌더링함. React.memo는 오직 성능최적화를 위해서만 사용함, 렌더링을 방지하기 위해서(?) 사용하지 말것
    + 자식 컴포넌트가 모두 memo적용했으면 부모 컴포넌트도 memo적용 가능
    + 반복문이 있는 컴포넌트 memo 해주면 좋다
    + memo 적용했는데도 리렌더링 된다? useMemo로 컴포넌트 감쌀 수도 있다 이는 최후의 수단처럼 사용


- react컴포넌트 최적화를 위해 state는 불변성 유지해야 함
```js
const arr = [1,2,3];
const otherArr = arr;
otherArr.push(4); // arr = [1,2,3,4];
// 불변성 유지되지 않음. 이런 식으로 state가 바뀌면 react에서 새로운 렌더링 발생하지 않음
// 이전 state를 유지한 채, 새 state를 넘겨야 한다
```

- 얕은복사 깊은복사?
```js
let nestedArr = [1,[2],3];
let arrayCopy = [...nestedArr];

arrayCopy[0] = 'a'; // change shallow element
arrayCopy[1][0] = 'b'; // change nested element
// arrayCopy = ['a',['b'],3];
// nestedArray = [1, ['b'], 3];
```


