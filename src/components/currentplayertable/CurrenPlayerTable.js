import React from 'react';

const CurrentPlayerTable = () => {
    return(
        <div className="table table-current-player">
        <div className="table__title">
            Current Player
        </div>
        <div className="table__description">
            <span className="description">Name:<span className="description__item--player"> Player #1</span></span>
            <span className="description"># Attempts:<span className="description__item--attempts">12</span></span>
        </div>
    </div>
    )
}

export default CurrentPlayerTable;