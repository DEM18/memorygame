import React from 'react';

const PositionTable = ( props ) => {
    const { positions } = props;
    return(
        <div className="table table-positions">
        <div className="table__title table__title--positions">
            Position Table
        </div>
        <div className="table__row">
            { positions.map( (position, index) => (
                <span className="row row-positions"
                key={index}>Player #{position.player_id}<span className="description__item--first-player">{position.position} </span></span>
            ))}
        </div>
    </div>
    )
}

export default PositionTable;