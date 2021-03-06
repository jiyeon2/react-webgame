import React, {useEffect, useReducer, useCallback} from 'react';
import Table from './Table';

const initialState = {
    winner : '',
    turn : 'o',
    tableData: [
        ['','',''],
        ['','',''],
        ['','','']
    ],
    recentCell: [-1, -1]
}
// 액션 이름은 대문자 상수로, 변수로 빼두는 게 좋다
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';


// 액션 디스패치 할 때마다 실행되는 함수
// 액션에 따라  state를 바꿔줌
const reducer = (state, action) => {
    switch (action.type){
        case SET_WINNER:
            // state.winner = actioin.winner; 로 바로 바꾸면 안됨
            // 새로운 객체 만들어서 바뀐 값만 바꿔서 리턴해야함
            return {
                ...state,
                winner: action.winner
            }
        case CLICK_CELL:
            const tableData = [...state.tableData]; // 얕은 복사 - 
            tableData[action.row] = [...tableData[action.row]]; // immer 라는 라이브러리로 불변성 유지하며 가독성 높일 수 있다
            tableData[action.row][action.cell] = state.turn;
            return {
                ...state,
                tableData,
                recentCell: [action.row, action.cell],
            }
        case CHANGE_TURN:
            return {
                ...state,
                turn: state.turn === 'o' ? 'x': 'o'
            }
        case RESET_GAME:
            return {
                ...state,
                turn : 'o',
                tableData: [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ],
                recentCell: [-1, -1]
            }
        default:
            return state;
    }
}
const Tictactoe = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    // const [winner, setWinner] = useState('');
    // const [turn, setTurn] = useState('o');
    // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']])

    // // 자식컴포넌트로 보내는 함수는 useCallback으로 저장
    // const onClickTable = useCallback(() => {
    //     dispatch({type: SET_WINNER, winner: 'x'});
    //     // dispatch에 보내는 객체는 action 이라고 함. 액션은 타입을 가지고 있다
    //     // 액션을 해석해서 state를 바꿔주는 역할 - reducer 함수
    // },[]);
    const {tableData, turn, winner, recentCell} = state;
    useEffect(() => {
        const [row, cell] = recentCell;
        if (row < 0) {return;} // 컴포넌트 마운트 된 후에도 실행되므로 그때는 승자 판단하지 않도록 걸러냄
        let win = false;
        if (tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn ){
            win = true;
        }
        if (tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn ){
            win = true;
        }
        if (tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn ){
            win = true;
        }
        if (tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn ){
            win = true;
        }

        if (win){   
            dispatch({type: SET_WINNER, winner: turn});
            dispatch({type: RESET_GAME});

        } else {
            let all = true; // all = true이면 칸이 다 차있다 == 무승부라는 뜻
            tableData.forEach((row) => {
                row.forEach((cell) => {
                    if (!cell){
                        all = false;
                    }
                })
            })
            if (all) {
                dispatch({type: RESET_GAME});
            } else {   
                dispatch({type: CHANGE_TURN})
            }
        }
    }, [recentCell]) // 클릭할때마다 바뀌는recentCell가 변동되면 effect 실행됨

    return (
        <>
        <Table tableData={tableData} dispatch={dispatch}/>
        {winner && <div>{winner}님의 승리</div>}
        </>
    );
};

export default Tictactoe;