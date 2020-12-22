# 로또추첨기

## 20201222 화
- setInterval, setTimeout 등 비동기 동작을 꼭 componentDidmount나 useEffect에서 써야 하는 건 아니다. 
    + **render안에서 쓰지 않으면 된다**(state 변하면 render가 실행되므로 무한반복)
    + 단 componentWillUnmount 에서 꼭 해제해주기!
- 반복문 기점으로 컴포넌트 분리 - 재사용성 높아짐
- 가장 밑단의 자식 컴포넌트(상태 가지지 않고 화면만 보여주는 경우)는 그냥 pure component, 함수 컴포넌트(React.memo로 감싸기) 써도됨
    + 컴포넌트를 다른 컴포넌트로 감싸는 것 high order component(HOC)

- 컴포넌트가 사라지는 경우 컴포넌트에 귀속된 state도 사라짐. 컴포넌트가 사라진 후 setTimeout으로 전달된 함수에서 this.state에 접근하면 문제가 발생할 수 있음. 그리고 컴포넌트와 별개로 setTimeout, setInterval의 함수는 계속 실행될 수 있음(메모리 누수 문제 발생)

-querySelector로 돔 건드리지 않고, state(데이터)만 바꿔서 리액트가 state에 따라 화면보여주도록 함

- 함수 컴포넌트는 state바뀌면 함수 전체가 실행되어 getNumbers()함수가 공 생길때마다 계속 실행됨 => useMemo사용하여 값을 기억함

- React.useMemo / React.memo
    + useMemo: 복잡한 함수 결과값 기억 useMemo(() => {}, [])
    + memo : 일반 값 기억 memo()
- useMemo / useCallback
    + useMemo: 함수의 리턴 값을 기억
    + useCallback:  함수 자체를 기억, 함수형 컴포넌트 내에 생성한 함수는 컴포넌트가 렌더링 될 때마다 새로 생성됨. 함수 생성하는데 비용이 크다면 useCallback 으로 함수 자체를 저장해둔다
    - 두번째 인자로 들어오는 값이 바뀌기 전까지 해당 값/함수를 기억함
- useCallback 꼭 적용해야 할 곳 : 자식 컴포넌트에 함수를 props로 넘길 경우
    + useCallback 사용하지 않으면 부모 컴포넌트 렌더링 될때마다 함수가 매번 새로 생성됨. 자식으로 넘어가는 함수가 매번 새로운 함수로 갱신되므로 자식도 렌더링 계속 일어남

- useEffect 패턴(componentDidMount만 / componentDidUpdated만)
```jsx
// componentDidMount 에서만 동작
useEffect(() => {
    //ajax 요청 등 처음 렌더링 되었을때만 동작
}, []) // 빈 배열

// componentDidUpdate에서만 동작
const mounted = useRef(false);
useEffect(() => {
    if(!mounted.current){
        mounted.current = true;
    } else {
        // componentDidUpdate에서만 동작
    }
}, [someState])

```
