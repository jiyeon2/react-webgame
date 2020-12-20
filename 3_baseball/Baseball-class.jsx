import React, { Component } from "react";
import Try from './Try-class';

// 4개의 랜덤한 숫자 만드는 함수
const getNumber = () => {
  let candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  let result = [];
  for (let i = 0; i < 4; i++) {
    let idx = Math.floor(Math.random() * candidates.length);
    let num = candidates.splice(idx, 1)[0];
    result.push(num);
  }
  console.log(result);
  return result.join("");
};
class Baseball extends Component {
  state = {
    value: "",
    answer: getNumber(),
    result: "이곳에 결과가 보여집니다",
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
    if (value === answer) {
      alert("정답입니다. 새 게임을 시작합니다");
      this.clearState();
    } else {
      if (tries.length >= 1) {
        alert(`실패했습니다. 정답은  ${answer}였습니다. 새 게임을 시작합니다`);
        this.clearState();
      } else {
        const {ball, strike} = this.getScore();
        this.setState({
          result: `입력 : ${value}, 틀렸습니다`,
          value: '',
          tries: [...tries, { value, result: `${ball}볼 ${strike}스트라이크` }],
        });
      }
    }
  };

  onChange = (e) => {
    this.setState({
      value: e.currentTarget.value,
    });
  };

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
