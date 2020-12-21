# 가위바위보
- 12:40 ~ 2:55까지 강의보고 정리함

- [ ] 이미지 import?
- [ ] TODO: rsp 클래스 score부분도 다시 렌더링됨, 이미지만 렌더링 되도록 수정하기
## 20201222
- class component 라이프 사이클
    1. constructor()
    2. render()
    3. ref 설정
    4. componentDidMount()
    5. setState/props 바뀔 때 -> shouldComponentUpdate(true)이면 -> componentDidUpdate()
    6. 부모에서 자식 컴포넌트가 삭제될 때 componentWillUnmount()
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
// (확장매개변수) => () => { 확장매개변수 사용}
<button onClick={this.onClick('rock')}>
```

- hooks 에서는 라이프사이클 메서드(componentDidMount, componentDidUpdate 같은거)가 없다
    - componentDidMount + componentDidUpdate + componentWillUnmount -> useEffect
    - componentDidUpdate 에서는 조건문으로 state별 분기 만들어서 사용
    - useEffect함수는 여러번 쓸 수 있다
```jsx
    // useEffect(콜백함수,[상태])는 두번째 인자로 배열을 받는다
    // 배열에 들어온 상태가 변하면 첫번째 인자인 콜백함수를 실행한다
    // 배열에 인자가 없으면 첫번째 인자 콜백함수를 한번만 실행한다(componentDidMount 처럼)
    // useEffect에서 리턴되는 함수는 컴포넌트가 사라지기 전 실행된다(componentWillUnmount 처럼)
    useEffect( () => {
        // do something when component did mount
        // do something when component did updated
        return () => {
            // do something before component unmount
        } // function invokes once component will unmount
    }, [stateTobeChange])
```
- useEffect에서 setInterval 사용하기
```jsx
    const interval = useRef();
    const changeHand = () => {setImgCoord()} ; // imgCoord 값을 변경하는 함수

    //imgCoord 값 바뀔때마다 useEffect 실행
    useEffect(() => {
        interval.current = setInterval(changeHand, 100); 
        // imgCoord 값이 변경됨
        // -> state 변경시 함수 컴포넌트는 전체가 재실행됨
        // -> 함수 컴포넌트가 사라지기 전 clearInterval 실행되어 interval 비동기 함수 초기화
        return () => {
            clearInterval(interval.current);
        }
    },[imgCoord])
```

