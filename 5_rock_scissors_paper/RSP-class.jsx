import React, { PureComponent } from 'react';

const rspCoords ={
    rock: '0',
    scissor: '-142px',
    paper: '-284px'
}
const scores = {
    scissor: 1,
    rock: 0,
    paper: -1
}

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => v[1]===imgCoord)[0];
}

class RSP extends PureComponent {
    state={
        result: '',
        imgCoord: rspCoords.rock,
        score: 0
    }

    interval;
    componentDidMount() {// 컴포넌트가 첫 렌더링 된 후 - 비동기 작업 할당
        this.interval = setInterval(this.changeHand, 100);
    } 
    componentWillUnmount() {// 컴포넌트가 제거되기 전
        clearInterval(this.interval)
    } 

    changeHand = () => {
        const {imgCoord} = this.state; // 비동기 콜백함수 안에서 외부 함수 참조하면 값이 함수 선언 할 때로 고정되어 있음
        if (imgCoord === rspCoords.rock){
            this.setState({
                imgCoord: rspCoords.scissor
            })
        } else if (imgCoord === rspCoords.scissor){
            this.setState({
                imgCoord: rspCoords.paper
            })
        } else if (imgCoord === rspCoords.paper){
            this.setState({
                imgCoord: rspCoords.rock
            })
        }
    }

    onClickBtn = (choice) => () => {
        clearInterval(this.interval);

        const {imgCoord} = this.state;

        const myScore = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = myScore - cpuScore;
        if (diff === 0){
            this.setState({
                result: '비겼습니다'
            })
        } else if ([-1,2].includes(diff)){
            this.setState((prev) => {
                return {
                    result: '이겼습니다',
                    score : prev.score + 1
                }
            })
        } else {
            this.setState((prev) => {
                return {
                    result: '졌습니다',
                    score : prev.score -1 
                }
            })
        }
        setTimeout(() => {
            this.interval = setInterval(this.changeHand, 100);
        },1000);
        
    }
    render() {
        const { result, score, imgCoord } = this.state;
        return (
            <>
            <div id="computer" style={{
                background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
            }}></div>
            <div>
                <button id="rock" className="btn" onClick={this.onClickBtn('rock')}>바위</button>
                <button id="scissor" className="btn" onClick={this.onClickBtn('scissor')}>가위</button>
                <button id="paper" className="btn" onClick={this.onClickBtn('paper')}>보</button>
            </div>
            <div>{result}</div>
            <div>{score}점</div>
            </>
        );
    }
}

export default RSP;