import React, { PureComponent, createRef } from "react";
import Try from './Try-class';
import {getNumber} from './getNumber';

class Baseball extends PureComponent {
  state = {
    value: "",
    answer: getNumber(),
    result: "클래스 컴포넌트 이곳에 결과가 보여집니다",
    tries: [],
  };

  clearState = () => {
    this.setState({
      value: "",
      answer: getNumber(),
      result: "",
      tries: [],
    });
  };

  getScore = () => {
    const {value, answer} = this.state;
    let result = {
      ball:0,
      strike: 0
    }
    for (let i = 0; i < 4; i++){
      if (value[i] === answer[i]){
        result.strike += 1;
      } else if (answer.includes(value[i])){
        result.ball += 1;
      }
    }
    return result;
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { value, answer, result, tries } = this.state;
    this.inputRef.current.focus();
    if (value === answer) {
      alert("정답입니다. 새 게임을 시작합니다");
      this.clearState();
    } else {
      if (tries.length >= 10) {
        alert(`실패했습니다. 정답은  ${answer}였습니다. 새 게임을 시작합니다`);
        this.clearState();
      } else {
        const {ball, strike} = this.getScore();
        this.setState(({tries}) => {
          return {
            result: `입력 : ${value}, 틀렸습니다`,
            value: '',
            tries: [...tries, { value, result: `${ball}볼 ${strike}스트라이크` }],
          }
        });
      }
    }
  };

  onChange = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

  inputRef = createRef();

  // onRef = (input) => {
  //   this.inputRef = input;
  // }

  render() {
    const { value, tries, result } = this.state;
    return (
      <>
        <p>{result}</p>
        <form onSubmit={this.onSubmit}>
          <input
            type="number"
            maxLength={4}
            value={value}
            onChange={this.onChange}
            ref={this.inputRef}
          />
          <button>입력</button>
        </form>
        <p>이전 입력</p>
        <ul>
          {tries.map((v,i) => <Try key={`${v.value}-${i}`} item={v} index={i+1}/>)}
        </ul>
      </>
    );
  }
}

export default Baseball;
