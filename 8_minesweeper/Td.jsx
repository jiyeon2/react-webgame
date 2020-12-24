import React,{memo, useMemo, useCallback, useContext} from 'react';
import {TableContext, CODE, OPEN_CELL, CLICK_MINE, FLAG_CELL, QUESTION_CELL, NORMALIZE_CELL} from './MineSearch';

const getTdStyle = (code) => {
    console.log('get td text');
    switch (code){
        case CODE.NORMAL:
        case CODE.MINE:
            return {background: '#444',}
        case CODE.OPENED:
            return {background: 'white',}
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return {background: 'yellow',}
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return {background: 'red',}
        default:
            return {background: 'white',}

    }
}

const getTdText = (code) => {
    switch (code){
        case CODE.NORMAL:
            return '';
        case CODE.MINE:
            return 'x';
        case CODE.CLICKED_MINE:
            return '펑';
        case CODE.FLAG_MINE:
        case CODE.FLAG:
            return '🏳️‍';   
        case CODE.QUESTION_MINE:
        case CODE.QUESTION:
            return '❓';
        default:
            return code || '';

    }
}

const Td = memo(function Td({rowIndex, cellIndex}) {
    const {tableData, dispatch, halted} = useContext(TableContext);
    
    const onClickTd = useCallback(() => {
        if (halted){
            return;
        }
        switch (tableData[rowIndex][cellIndex]){
            case CODE.OPENED:
            case CODE.FLAG_MINE:
            case CODE.FLAG:
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                return;
            case CODE.NORMAL:
                dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.MINE:
                dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;

        }
    },[tableData[rowIndex][cellIndex], halted])

    const onRightClickTd = useCallback((e) => {
        e.preventDefault();
        if (halted) {return;}
        switch(tableData[rowIndex][cellIndex]){
            case CODE.NORMAL:
            case CODE.MINE:
                dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
                dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
                return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
                dispatch({type: NORMALIZE_CELL, row: rowIndex, cell: cellIndex});
                return;
            default:
                return;
        }
    }, [tableData[rowIndex][cellIndex], halted])
    // code(데이터) 에 따라 스타일과 텍스트가 알아서 그려진다 편함

    // console.log('td rendered');
    return useMemo(() => (
        <td 
            style={getTdStyle(tableData[rowIndex][cellIndex])}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >
           {getTdText(tableData[rowIndex][cellIndex])}
        </td>
    ),[tableData[rowIndex][cellIndex]])

    // 혹은 컴포넌트 분리
    // return <RealTd 
    //         onClickTd={onClickTd}
    //         onRightClickTd={onRightClickTd}
    //         data={tableData[rowIndex][cellIndex]}
    //         />

});

const RealTd = memo(({onClickTd, onRightClickTd, data}) => {
    return (
        <td 
            style={getTdStyle(data)}
            onClick={onClickTd}
            onContextMenu={onRightClickTd}
        >{getTdText(data)}</td>
    );
})

export default Td;