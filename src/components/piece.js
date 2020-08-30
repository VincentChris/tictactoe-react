import React from 'react';

function Piece(props) {
    const handleClick = (event) => {
        event.preventDefault();
        if (props.currentState !== 0) {
            return;
        }
        props.onClickChange();
    }
    const emoji = props.currentState === 0 ? (<span></span>) :
        (props.currentState === 1 ? (<span>×</span>) : (<span>○</span>));
    return (
        <div className="piece" onClick={handleClick}>
            {emoji}
        </div>
    );
}

export default Piece;
