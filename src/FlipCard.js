import React from 'react';
import ReactCardFlip from 'react-card-flip';
import './FlipCard.css';


class FlipCard extends React.Component {
    render() {
        const { arrayValues,toggleCard } = this.props;
        return(
            arrayValues.map(( e, index ) => (
                <ReactCardFlip className="cardFlip-container" 
                    isFlipped={ e.status } 
                    key={ index } 
                    flipSpeedFrontToBack={ 0.3 }
                    flipSpeedBackToFront={0.3}>
                    <div className="card-wrapper front" id={ index }
                        onClick={ toggleCard }>
                    </div>
        
                    <div className="card-wrapper back" id={ index }>
                    <div className="card-value">
                        <i className={`fas ${ e.value } fa-5x`}></i>
                       
                    </div>
                </div>
            </ReactCardFlip>

        ))
        );
    }
}



export default FlipCard;