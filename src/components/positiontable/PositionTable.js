import React from 'react';

const PositionTable = () => {
    return(
        <div className="table table-positions">
        <div className="table__title table__title--positions">
            Position Table
        </div>
        <div className="table__description">
            <span className="description description-positions">Player #1<span className="description__item--first-player">15</span></span>
            <span className="description description-positions">Player #2<span className="description__item--second-player">25</span></span>
            <span className="description description-positions">Player #3<span className="description__item--third-player">26</span></span>
        </div>
    </div>
    )
}

export default PositionTable;