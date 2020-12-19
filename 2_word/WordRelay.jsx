const React = require('react');
const {Component} = React;


class WordRelay extends Component{
    state ={
        value: '',
        result: '',
        word: '바나나킥'
    };
    onSubmit = (e) => {
        e.preventDefault();
        this.input.focus();
        if (this.state.word[this.state.word.length -1] === this.state.value[0]){
            this.setState((prevState) => {
                return {
                    result: '맞았습니다',
                    word: prevState.value,
                    value: ''
                }
            })
        } else {
            this.setState({
                result: '틀렸습니다',
                value: ''
            })
        }
    }
    onChange = (e) => {
        this.setState({
            value: e.currentTarget.value
        })
    }
    input;
    onRef = (i) => {
        this.input = i;
    }
    render() {
        return (
            <>
                <div>{this.state.word}</div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" 
                    value={this.state.value} 
                    onChange={this.onChange}
                    ref={this.onRef}
                    />
                    <button>입력
                    </button>
                </form>
                <p>{this.state.result}</p>
            </>
        );
    }
}

module.exports = WordRelay;