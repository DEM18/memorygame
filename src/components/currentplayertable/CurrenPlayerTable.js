import React from 'react';

const CurrentPlayerTable = ( props ) => {
    const { attempts, currentPlayer } = props;
    return(
        <div className="table table-current-player">
        <div className="table__title">
            Current Player
        </div>
        <div className="table__row table__row-current-player">
            <span className="row">Name:<span className="row__item--player"> {currentPlayer}</span></span>
            <span className="row"># Attempts:<span className="row__item--attempts">{attempts}</span></span>
        </div>
    </div>
    )
}

export default CurrentPlayerTable;