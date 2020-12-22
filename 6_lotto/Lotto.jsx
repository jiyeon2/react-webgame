import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
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

const Lotto = () => {
    const lottoNumbers = useMemo(() => getWinNumbers(),[]);
    const [winNumbers, setWinNumbers] = useState(lottoNumbers);
    const [winBalls, setWinBalls] = useState([]);
    const [bonus, setBonus] = useState(null);
    const [redo, setRedo] = useState(false);
    const timeouts = useRef([]);

    useEffect(() => {
        for (let i = 0; i < winNumbers.length-1; i++){
            timeouts.current[i] = setTimeout(() => {
                setWinBalls((prev) => [...prev, winNumbers[i]])
            }, (i+1)*1000)

            timeouts.current[6] = setTimeout(() => {
                setBonus(winNumbers[6]);
                setRedo(true);
            }, 7000)
        }
        return () => {
            timeouts.current.forEach((v) => clearTimeout(v));
        }
    }, [timeouts.current]) // [] 배열 안에는 바뀌는 값


    const onClickRedo = useCallback(() => {
        console.log('useCallback');
        console.log(winNumbers);
        setWinNumbers(getWinNumbers());
        setWinBalls([]);
        setBonus(null);
        setRedo(false);
        timeouts.current = [];
    },[winNumbers]); // useCallback 안에서 쓰이는 state는 배열에 넣어줘야함, 배열 안의 값이 바뀌었을 때 useCallback안의 함수가 실행됨

    return (
        <>
        <div>당첨숫자</div>
        <div id="result">
            {winBalls.map((v) => <Ball key={v} number={v}/>)}
        </div>
        <div>보너스</div>
        {bonus && <Ball number={bonus}/>}
        {redo&& <button onClick = {onClickRedo}>한번더</button>}
        </>
    );
}


export default Lotto;