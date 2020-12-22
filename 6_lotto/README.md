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