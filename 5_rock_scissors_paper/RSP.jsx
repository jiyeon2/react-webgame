import React, { useState, useRef, useEffect, memo} from 'react';

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

const RSP = memo(() => {
    const [result, setResult] = useState('');
    const [imgCoord, setImgCoord] = useState(rspCoords.rock) ;
    const [score, setScore] = useState(0);
    const interval = useRef();

    useEffect(() => {
        interval.current = setInterval(changeHand, 100);
        return () => {
            clearInterval(interval.current);
        }
    }, [imgCoord])

    const changeHand = () => {
        if (imgCoord === rspCoords.rock){
            setImgCoord(rspCoords.scissor);
        } else if (imgCoord === rspCoords.scissor){
            setImgCoord(rspCoords.paper);
        } else if (imgCoord === rspCoords.paper){
            setImgCoord(rspCoords.rock);
        }
    }
    const onClickBtn = (choice) => () => {
        if (interval.current){
            clearInterval(interval.current);
            interval.current = null;
    
    
            const myScore = scores[choice];
            const cpuScore = scores[computerChoice(imgCoord)];
            const diff = myScore - cpuScore;
            if (diff === 0){
                setResult('비겼습니다');
            } else if ([-1,2].includes(diff)){
                setResult('이겼습니다');
                setScore((prev) => prev+1);
            } else {
                setResult('졌습니다');
                setScore((prev) => prev-1);
            }
            setTimeout(() => {
                interval.current = setInterval(changeHand, 1000);
            },1000); 
        }
    }

    return (
        <>
        <div id="computer" style={{
            background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`,
        }}></div>
        <div>
            <button id="rock" className="btn" onClick={onClickBtn('rock')}>바위</button>
            <button id="scissor" className="btn" onClick={onClickBtn('scissor')}>가위</button>
            <button id="paper" className="btn" onClick={onClickBtn('paper')}>보</button>
        </div>
        <div>{result}</div>
        <div>{score}점</div>
        </>
    );
})


export default RSP;