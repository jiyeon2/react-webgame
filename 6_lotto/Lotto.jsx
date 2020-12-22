import React, { Component } from 'react';
import Ball from './Ball';

const getWinNumbers = () => {
    console.log('getWinNumbers');
    let candidates = Array(45).fill().map((v,i) => i+1);
    let shuffle = [];
    while (candidates.length > 0){
        shuffle.push(candidates.splice(Math.floor(Math.random()*candidates.length),1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length -1];
    const winNumbers = shuffle.slice(0,6).sort((a,b) => a-b);
    return [...winNumbers, bonusNumber];
}
class Lotto extends Component {
    state ={
        winNumbers: getWinNumbers(),
        winBalls: [],
        bonus: null,
        redo: false,
    }

    timeouts = [];

    runTimeouts = () => {
        const {winNumbers} = this.state;
        for (let i = 0; i < winNumbers.length-1; i++){
            this.timeouts[i] = setTimeout(() => {
                this.setState((prev) => {
                    return {
                        winBalls: [...prev.winBalls, winNumbers[i]]
                    }
                })
            }, (i+1)*1000)

            this.timeouts[6] = setTimeout(() => {
                this.setState({
                    bonus: winNumbers[6],
                    redo: true
                });
            }, 7000)
        }
    }
    componentDidMount() {
        this.runTimeouts();
    }

    componentDidUpdate(prevProps, prevState) {
        // redo 눌렀을 때(winballs.length === 0일 때)만 동작하도록
        if (this.state.winBalls.length === 0){
            this.runTimeouts();
        }
    }

    componentWillUnmount(){
        this.timeouts.forEach((v) => clearTimeout(v));
    }

    onClickRedo = () => {
        this.setState({
            winNumbers: getWinNumbers(),
            winBalls: [],
            bonus: null,
            redo: false,
        })
        this.timeouts = [];
    }
    render() {
        const { winBalls, bonus, redo} = this.state;
        return (
            <>
            <div>당첨숫자</div>
            <div id="result">
                {winBalls.map((v) => <Ball key={v} number={v}/>)}
            </div>
            <div>보너스</div>
            {bonus && <Ball number={bonus}/>}
            {redo&& <button onClick = {this.onClickRedo}>한번더</button>}
            </>
        );
    }
}

export default Lotto;