// 노드 모듈시스템 이용해 가져옴
const React = require('react');
const ReactDom = require('react-dom');

const WordRelay = require('./WordRelay-hooks');

ReactDom.render(<WordRelay/>, document.querySelector('#root'));