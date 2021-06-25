import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Username from './username.js'

//plan for how to render tic tac toe board
//0)render squares/boxes
//1) render 9x9 buttons
//2) make buttons change to "x" when clicked.  add "o" after second.
//2.1) make board persist.  make the board element state's change

//3) declare a winner -> try to create a state variable under the GameBoard component and
// display that at the bottom of the screen;
//1.5) stop the game after winner is declared (can I use string.contains("Woo Hoo")?

function checkWinner(board) {
    let winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]
    let refState = [] //re-assigned each for loop below

    console.log("checkWinner ran")

    for (let i = 0; i < winningStates.length; i++) {
        refState = winningStates[i]
        console.log("winning states:" + i)
        if (board[refState[0]] &&
            board[refState[0]] === board[refState[1]] &&
            board[refState[1]] === board[refState[2]]) {
            return (
                "Winner! " + board[refState[0]] + " Won! Woo Hoo!"
            )
        }
    }

    return (
        "Still no winner...next move"
    )

}


class GameBoard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            turn: "X",
            board: Array(9),
            winner: "Start Playing To Determine Winner"
        }

    }


    makeButtons() {
        let buttonArray = []
        let localBoard = this.state.board.slice()
        let isWinner = this.state.winner
        for (let i = 0; i < 9; i++) {
            buttonArray.push(
                <button onClick={() => {
                    console.log("button " + i + " clicked")
                    if (!(this.state.winner.includes("Woo Hoo"))) {
                        if (this.state.board[i]) {
                            return
                        }
                        if (this.state.turn === "X") {
                            localBoard[i] = "X"
                            isWinner = checkWinner(localBoard)
                            this.setState({
                                turn: "O",
                                board: localBoard,
                                winner: isWinner
                            })
                        } else {
                            localBoard[i] = "O"
                            isWinner = checkWinner(localBoard)
                            this.setState({
                                turn: "X",
                                board: localBoard,
                                winner: isWinner
                            })
                        }
                    }
                }}> {localBoard[i]} </button>
            )
        }

        return (
            buttonArray
        )
    }

//make each click add text to the buttons
//put div's around every three elements

    render() {
        let buttons = this.makeButtons()

        return (
            <div>
                <div><Username/></div>
                <div>
                    {[buttons[0], buttons[1], buttons[2]]}
                </div>
                <div>
                    {[buttons[3], buttons[4], buttons[5]]}
                </div>
                <div>
                    {[buttons[6], buttons[7], buttons[8]]}
                </div>
                <div>
                    {
                        !(this.state.winner.includes("Woo Hoo")) && "Player's Turn: " + this.state.turn
                    }
                </div>
                <div>
                    {
                        this.state.winner
                    }
                </div>
            </div>

        )
    }
}


//below is a nested tag/component; App is a child of the React.StrictMode
ReactDOM.render(
    <React.StrictMode>
        <GameBoard/>
    </React.StrictMode>,
    document.getElementById('root')
);

//below is part of the default React setup
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
