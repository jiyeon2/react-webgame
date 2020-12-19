const React = require('react');
const {useState, useRef} = React;

const Gugudan = () => {
    const [first, setFirst ] = useState(Math.ceil(Math.random()*9));
    const [second, setSecond ] = useState(Math.ceil(Math.random()*9));
    const [value, setValue ] = useState('');
    const [result, setResult ] = useState('');
    const inputRef = useRef(null);

    const submitHandler = (e) => {
        e.preventDefault();
        if (Number(value) === first*second){
            setFirst(Math.ceil(Math.random()*9));
            setSecond(Math.ceil(Math.random()*9));
            setValue('');
            setResult(`${value} 맞았습니다`);
            inputRef.current.focus();
        } else {
            setValue('');
            setResult(`${value} 틀렸습니다`);
            inputRef.current.focus();
        }
    }
    const changeHandler = (e) => {
        setValue(e.target.value);
    }
    return (
        <>
            <p>{first} x {second} 은?</p>                        
            <form onSubmit={submitHandler}>
                <input ref={inputRef} type="number" value={value} onChange={changeHandler}/>
                <button type="submit">입력</button>
            </form>
            <p> {result}</p>
        </>
    );
}

module.exports = Gugudan;