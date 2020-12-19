const React = require('react');
const {useState,useRef} = React;

const WordRelay = () => {
    const [word, setWord] = useState('바라바바밤밤바');
    const [value, setValue] = useState('');
    const [result, setResult] = useState('');
    const input = useRef(null);

    const onSubmit = (e) => {
        e.preventDefault();
        if (word[word.length-1] === value[0]){
            setWord(value);
            setValue('');
            setResult('맞았습니다');
        } else {
            setResult('틀렸습니다');
            setValue('');
        }
        input.current.focus();
    }
    const onChange =(e) => {
        setValue(e.target.value);
    }
    
    return (
        <>
            <div>{word}</div>
            <form onSubmit={onSubmit}>
                <input type="text" value={value} onChange={onChange} ref={input}/>
                <button>입력
                </button>
            </form>
            <p>{result}</p>
        </>
    );
}
module.exports = WordRelay;