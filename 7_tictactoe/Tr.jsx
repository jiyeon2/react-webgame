import React, {useRef, useEffect, memo, useMemo} from 'react';
import Td from './Td';

const Tr = memo(({rowData, rowIndex, dispatch}) => {
    console.log('tr rendered');

    const ref = useRef([]);
    useEffect(() => {
        console.log(rowData === ref.current[0], 
            rowIndex=== ref.current[1], 
            dispatch=== ref.current[2]); // 바뀌는 게 있으면  false가 되고, 그 값때문에 리렌더링 일어남
        ref.current = [rowData, rowIndex, dispatch];
    },[rowData, rowIndex, dispatch]);

    // useMemo로 컴포넌트 자체를 기억
    // rowData[i]가 바뀌었을 때에만 컴포넌트를 새로 렌더링한다

    return (
        <tr>
            {Array(rowData.length).fill().map((td,i) => (
                useMemo(() =>  <Td 
                                key={i} 
                                rowIndex={rowIndex} 
                                cellIndex={i} 
                                dispatch={dispatch} 
                                cellData={rowData[i]}/>, [rowData[i]])
           
            ))}
        </tr>
        
    );
})

export default Tr;