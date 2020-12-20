import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
    const [status, setStatus] = useState('waiting');
    const [message, setMessage] = useState('함수형, 클릭해서 시작하세요');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onClickScreen = () => {
        if (status === 'waiting'){
            setStatus('ready')
            setMessage('초록색이 되면 클릭하세요')
            timeout.current = setTimeout(() => {
                setStatus('now');
                setMessage('클릭하세요!!');
                startTime.current = new Date();
            }, Math.floor(Math.random()*2000)+ 1000); // 2~3초 후 실행
        } else if (status === 'ready') {
            setStatus('waiting');
            setMessage('너무 성급했어요, 초록색 화면일 때 눌러야합니다');
            startTime.current = null;
            clearTimeout(timeout.current);
        } else if (status === 'now'){
            endTime.current = new Date();
            setStatus('waiting');
            setMessage('클릭해서 다시 시작하세요');
            setResult((prevResult) => [...prevResult, endTime.current - startTime.current]);
        }
    }

    const onClick = () => {
        setResult([]);
    }

    const renderAverage = () => {
        return result.length 
            ? <div>
                <p>평균시간 : {result.reduce((a,c) => a+c)/result.length} ms</p>
                <button onClick={onClick}>리셋</button>
              </div>
            : null  
    }

    return (
        <>
                <div 
                id="screen"
                className={status}
                onClick={onClickScreen}
                >
                    {message}
                </div>
                {renderAverage()}
                
            </>
    );

}

export default ResponseCheck;