# 끝말잇기 만들며 배운거

- 웹팩을 쓰는 이유 : 여러 컴포넌트 스크립트를 분리해서 작성하고, 불러올 때는 하나의 파일로 합쳐서 로드하기 위해
- 웹팩 설정 webpack.congif.js => webpack 실행 하기
    + entry : 합칠 파일
    + module : 파일에 적용할 모듈(바벨 등)
    + output : 합쳐진 파일

- 20201218
    - react hooks : 함수형 컴포넌트에서도 클래스형 컴포넌트처럼 state, ref 쓸 수 있게 하는 것
    - functional component & hooks 사용하면 코드 간결해짐. state 변경시 함수 자체가 다시 실행되어 조금 더 느릴 수는 있다(클래스형 컴포넌트는 렌더메서드만 재실행됨)
        + setState()는 비동기, 모아서 한꺼번에 실행함
    - jsx 에서 class => className, <label for> => <label htmlFor>

    - 리액트 공식문서 읽기, 공식문서에 다 적혀있음!
    - 많은 리액트 컴포넌트 = 많은 스크립트. 하나의 스크립트 파일로 합쳐주는 것 : 웹팩

```bash
npm init

npm i react react-dom

# dependencies : 서비스 할 때 필요한 거
# defDependencies : 개발할 때만 필요한거

# 개발할때만 웹팩 사용
npm i -D webpack webpack-cli
```

- create-react-app 이 해주는거 : 웹팩 설정
- jsx 문법을 사용한다면 확장자를 .jsx 로 기입한다. 리액트 파일이구나 하고 쉽게 알 수 있음
- 웹팩 설정파일 작성 후
    + npx webpack
    + package.json에 명령어 등록(예 : "dev" : "webpack")
- 웹팩에서 jsx 이해 못함 -> 바벨 설치 필요(바벨에서도 jsx 설정필요)
```bash
#바벨도 개발할때만 씀
npm i -D @babel/core 
npm i -D @babel/preset-env # 브라우저별로 최신문법을 예전문법으로 바꿔서 지원
npm i -D @babel/preset-react # jsx 같은거 지원
npm i babel-loader # 바벨과 웹팩 연결
```
- module.rules plugins의 모음이 preset
- preset에 대한 설정도 가능, 특히 preser-env에서 지원 브라우저 설정가능
    + [browserslist](https://github.com/browserslist/browserslist)참고

```bash
# 핫 리로딩 : 기존 데이터를 유지하며 화면 갱신
npm i -D react-refresh @pmmmwh/react-refresh-webpack-plugin

# 개발용 서버
npm i -D webpack-dev-server
# webpack-dev-server: 결과물  파일 변경점 찾아내서 수정
```