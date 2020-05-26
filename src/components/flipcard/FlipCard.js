import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './FlipCard.scss';


class FlipCard extends React.Component {
    render() {
        const { isFlipped, index, toggleCard, value } = this.props;
        return(
            <ReactCardFlip className="cards"
                isFlipped={ isFlipped } 
                key={ index } 
                flipSpeedFrontToBack={ 0.3 }
                flipSpeedBackToFront={0.3}>
                <div className="cards__card--front" id={ index }
                    onClick={ toggleCard }>
                </div>
        
                <div className="cards__card--back" id={ index }>
                    <div className="card-value">
                        <i className={`fas ${ value } fa-5x`}></i>
                    </div>
                </div>
            </ReactCardFlip>
        );
    }
}



export default FlipCard;