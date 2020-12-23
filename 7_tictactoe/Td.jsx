import React,{useCallback,memo,  useEffect, useRef} from 'react';
import {CLICK_CELL} from './Tictactoe';

const Td = memo(({rowIndex, cellIndex, dispatch, cellData}) => {
    console.log('td rendered');

    // const ref = useRef([]);
    // useEffect(() => {
    //     console.log(rowIndex === ref.current[0], 
    //         cellIndex=== ref.current[1], 
    //         dispatch=== ref.current[2], 
    //         cellData=== ref.current[3]); // 바뀌는 게 있으면  false가 되고, 그 값때문에 리렌더링 일어남
    //         // cellData 가 바뀌고 있음
    //     console.log(cellData, ref.current);
    //     // 확인했을 때, 원하는 값만 바뀌고 있음을 td에서 파악함
    //     // 그런경우 부모를 살펴봄
    //     ref.current = [rowIndex, cellIndex, dispatch, cellData];
    // },[rowIndex, cellIndex, dispatch, cellData]);


    // 이벤트핸들러도?? 자식컴포넌트로 보내는 함수는 useCallback으로 저장
    const onClickTd = useCallback(() => {
        if (cellData) { // 기존의 cellData 가 존재하면 바뀌지 않도록
            return;
        }
        console.log({rowIndex, cellIndex});
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        // dispatch({type: CHANGE_TURN}); // 여기서하면 dispatch 가 비동기라 내가 원하는 턴이 안나옴
    },[cellData]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
})

export default Td;