# 지뢰찾기

- createContext 로 context 컴포넌트 만들고(export 한다)
- 데이터 공유할 컴포넌트를 감싼다
- 공유할 데이터는 Context.Provider 컴포넌트에  value props로 전달한다
- <MyContext.Provider value={}></MyContext.Provider>
- 공유한 데이터가 필요한 컴포넌트에서 context를 import 하여 사용한다
- context api 사용할 때 value 부분을 useMemo로 캐싱해야 성능저하가 덜 일어남
    + ```Context.Provider value={{key: value}}``` 형태로 쓰면 렌더링 될때마다 value안의 객체가 새로 생성된다. props가 변한 것으로 인식되어 아래 자식 컴포넌트들이 다 리렌더링 됨. 이걸 막기위해 useMemo사용

- useContext 하면 context바뀔때마다 컴포넌트 함수가 실행되기는 함, 리턴부분 함수가 같은 값이면 실행 안되도록 하면 됨(useMemo로 jsx 컴포넌트 감싸서 리턴)/ 혹은 리턴부분 컴포넌트를 쪼개서 memo로 감싸고 return에서 props 넘겨줄 수도 있다

- useContext사용시 최적화 문제가 있기 때문에 memo로 잘 감싼다 
- export default memo(Component)이렇게 해도 된다