import React, { Component } from 'react';

class RenderTest extends Component {
    state = {
        counter: 0
    };

    shouldComponentUpdate(nextProps, nextState, nextContext){
        // 최적화 위해서 state 비교하여 업데이트 할지 말지를 결정
        return nextState.counter !== this.state.counter;
    }

    onClick = () => {
        // 실제로 state 바뀌지 않아도 setState함수 실행시 render()가 동작함
        console.log(this.state.counter);
        this.setState({})
    }

    render() {
        return (
            <div>
            <p>{this.state.counter}</p>
            <button onClick={this.onClick}>click</button>
            </div>

        );
    }
}

export default RenderTest;