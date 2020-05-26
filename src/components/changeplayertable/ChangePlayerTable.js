import React from 'react';

const ChangePlayerTable = () => {
    return(
        <div className="table table-change-player">
        <span className="table__title table__title--change-player">Please enter your name:</span>
        <div className="table__description table__description--change-player">
            <input className="table__input"/>
            <button className="table__button">OK</button>
        </div>
    </div>
    )
}

export default ChangePlayerTable;