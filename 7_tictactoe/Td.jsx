import React,{useCallback} from 'react';
import {CLICK_CELL, CHANGE_TURN } from './Tictactoe';

const Td = ({rowIndex, cellIndex, dispatch, cellData}) => {
    // 이벤트핸들러도?? 자식컴포넌트로 보내는 함수는 useCallback으로 저장
    const onClickTd = useCallback(() => {
        console.log({rowIndex, cellIndex});
        dispatch({type: CLICK_CELL, row: rowIndex, cell: cellIndex});
        dispatch({type: CHANGE_TURN});
    },[]);

    return (
        <td onClick={onClickTd}>{cellData}</td>
    );
};

export default Td;