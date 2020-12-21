# 가위바위보
- 12:40- 2:15 까지 목표

- [ ] CRA 안썼을 때 이미지 import?
- [ ] TODO: rsp 클래스로 짰을 때 score부분은 리렌더링 안되어야 하는데 왜 같이 렌더링됨??? 5-2강 6:22 보면 이미지만 재렌더링됨
## 20201222
- class component 라이프 사이클
    + constructor() ....
- componentDidMount / componentWillUnmount
    + componentDidMount(첫 렌더링 후) 에서 setInterval 등 비동기 요청 실행
    + componentWillUnmount(컴포넌트 삭제 직전) 에서 완료되지 않은 비동기 요청 없애기
- render() 함수 내에서 setState()쓰면 서로 계속 호출함, componentDidMount()같은 함수에서 써야함
- 고차함수 이용해서 함수 간단하게 만드는 패턴
```jsx
// onClick = (choice) => {...do something with choice} 
 <button onClick={() => this.onClick('rock')}></button>
//----------------------------
// 함수를 연달아 쓴다(high order function)
// onClick = (choice) => () => {...do sth}
<button onClick={this.onClick('rock')}>
```

