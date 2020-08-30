import React from 'react';
import './App.css';
import Piece from "./components/piece";

class App extends React.Component {
    constructor() {
        super();
        const arr = [
            [
                0, 0, 0
            ],
            [
                0, 0, 0
            ],
            [
                0, 0, 0
            ]
        ];
        // A 对应 x  1
        this.state = {currentUser: 'A', pieceList: arr};
    }

    clone(arr) {
        return JSON.parse(JSON.stringify(arr));
    }

    check(statesArr, color) {
        const arr = this.clone(statesArr);
        let state = color;
        {
            let win = true;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (arr[i][j] !== state) {
                        win = false;
                    }
                }
                if (win) {
                    return true;
                }
            }
        }
        {
            let win = true;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (arr[j][i] !== state) {
                        win = false;
                    }
                }
                if (win) {
                    return true;
                }
            }
        }
        {
            let win = true;
            for (let j = 0; j < 3; j++) {
                if (arr[j][j] !== state) {
                    win = false;
                }
            }
            if (win) {
                return true;
            }
        }
        {
            let win = true;
            for (let j = 0; j < 3; j++) {
                if (arr[j][2 - j] !== state) {
                    win = false;
                }
            }
            if (win) {
                return true;
            }
        }

    }

    willWin(arr, color) {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (arr[i][j] !== 0) {
                    continue;
                }
                let tmp = this.clone(arr);
                tmp[i][j] = color;
                if (this.check(tmp, color)) {
                    return true;
                }
            }
        }
        return false;
    }

    ChangeUser(i, j) {
        const arr = this.state.pieceList;
        arr[i][j] = this.state.currentUser === 'A' ? 1 : 2;
        this.setState({currentUser: this.state.currentUser === 'A' ? 'B' : 'A', pieceList: arr});
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.willWin(this.state.pieceList, this.state.currentUser === 'A' ? 2 : 1)) {
            alert(this.state.currentUser + '要赢了');
        }
    }


    render() {
        const arr = this.state.pieceList;
        return (
            <div className="App">
                <div className="container">
                    {arr.map((item, outerIndex) => {
                        return (
                            <div className="row" key={outerIndex.toString()}>
                                {
                                    item.map((i, innerIndex) => {
                                        return <Piece currentState={i}
                                                      key={outerIndex.toString() + innerIndex.toString()}
                                                      onClickChange={this.ChangeUser.bind(this, outerIndex, innerIndex)}/>
                                    })
                                }
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default App;
