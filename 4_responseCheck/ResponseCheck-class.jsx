import React, { Component } from 'react';

class ResponseCheck extends Component {
    state ={
        status: 'waiting',
        message: '클래스형, 클릭해서 시작하세요',
        result : [],
    };

    timeout = null;
    startTime = null;
    endTime = null;

    onClickScreen = () => {
        const {status, result, message} = this.state;
        if (status === 'waiting'){
            this.setState({
                status: 'ready',
                message: '초록색이 되면 클릭하세요'
            })
            this.timeout = setTimeout(() => {
                this.setState({
                    status: 'now',
                    message: '클릭하세요!!'
                })
                this.startTime = new Date();
            }, Math.floor(Math.random()*2000)+ 1000); // 2~3초 후 실행
        } else if (status === 'ready') {
            this.setState({
                status: 'waiting',
                message: '너무 성급했어요, 초록색 화면일 때 눌러야합니다'
            })
            this.startTime = null;
            clearTimeout(this.timeout);
        } else if (status === 'now'){
            this.endTime = new Date();
            this.setState(({result}) => {
                return {
                    status: 'waiting',
                    message: '클릭해서 다시 시작하세요',
                    result : [...result, this.endTime - this.startTime]
                }
            })
        }
    }
    
    renderAverage = () => {
        const {result} = this.state;
        return result.length 
            ? <div>평균시간 : {result.reduce((a,c) => a+c)/result.length} ms</div>
            : null  
    }

    render() {
        const {status, message, result} = this.state;
        return (
            <>
                <div 
                id="screen"
                className={status}
                onClick={this.onClickScreen}
                >
                    {message}
                </div>
                {this.renderAverage()}
                
            </>
        );
    }
}

export default ResponseCheck;