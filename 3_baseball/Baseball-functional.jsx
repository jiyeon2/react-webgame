import React, {useState, useRef} from 'react';
import Try from './Try-functional';
import {getNumber} from './getNumber';

const Baseball = () => {
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumber());
    const [result, setResult] = useState('functional component 결과창');
    const [tries, setTries] = useState([]);
    const inputRef = useRef(null);

    const clearState = () => {
        setValue('');
        setAnswer(getNumber());
        setResult('결과창');
        setTries([]);
      };

    const onSubmit = (e) => {
        e.preventDefault();
        inputRef.current.focus();
        if (value === answer) {
          setTries((prev) => {return [...prev,{value, result:'홈런입니다'}]})
          alert("정답입니다. 새 게임을 시작합니다");
          clearState();
        } else {
          if (tries.length >= 10) {
            alert(`실패했습니다. 정답은  ${answer}였습니다. 새 게임을 시작합니다`);
            clearState();
          } else {
            const {ball, strike} = getScore();
            setValue('');
            setResult(`입력 : ${value}, 틀렸습니다`);
            setTries((prev) => [...prev, { value, result: `${ball}볼 ${strike}스트라이크` }]);
          }
        }
    }

    const onChange = (e) => {
        setValue(e.currentTarget.value);
    }

    const getScore = () => {
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
    }

    return (
        <>
        <p>{result}</p>
        <form onSubmit={onSubmit}>
          <input
            type="number"
            maxLength={4}
            value={value}
            onChange={onChange}
            ref={inputRef}
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

export default Baseball;