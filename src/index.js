import React from 'react';
import ReactDOM from 'react-dom';
import FlipCard from './components/flipcard/FlipCard';
import './index.scss';

const TOTAL_MATCHES = 10;


class App extends React.Component {
    constructor(props) {
        super( props );

        this.state = {
            arrayValues: this.createShuffleValues(),
            cardA: null,
            cardB: null,
            matches: 0,
            tries: 0
        }
        this.handdleFlipCardValue = this.handdleFlipCardValue.bind(this);
        this.isEqualTo = this.isEqualTo.bind(this);
        this.toggleCard = this.toggleCard.bind(this);
        this.restartValuesStatus = this.restartValuesStatus.bind(this);
        this.saveMatchCards = this.saveMatchCards.bind(this); 
        this.restartGame = this.restartGame.bind(this);
        this.createShuffleValues = this.createShuffleValues.bind(this);
    }

    //function that shuffle values of an array of strings
    createShuffleValues() {
        let values = [ "fa-bomb","fa-balance-scale","fa-anchor","fa-bug", 
                "fa-dice-d6","fa-globe", "fa-bus-alt","fa-car-alt","fa-child",
                "fa-atom","fa-dice-d6","fa-globe", "fa-bus-alt",
                "fa-car-alt","fa-child","fa-atom","fa-bomb","fa-balance-scale",
                "fa-anchor","fa-bug"];

        let shuffleValues = values.sort((a,b) => 0.5 - Math.random());
        let cardProperties = shuffleValues.map(e=> ({
            value : e,
            status : false,
            hasmatch : false
        }));

        return cardProperties;
    }

    //function that save into state the new values of card selected
    handdleFlipCardValue( cardValue ) {
        if( !this.state.cardA ) {
            this.setState({
                cardA: cardValue
            })
        } else {
            this.setState({
                cardB: cardValue
            })
        }
    }
    
    //function that flip the card selected
    toggleCard( event ) {
        let card = event.target.id;
        if( !this.state.arrayValues[ card ].hasMatched ) {
            let newArrayValues = [ ...this.state.arrayValues ];
            newArrayValues[card].status =  !newArrayValues[card].status;
    
            event.preventDefault();
            this.setState({
                arrayValues: newArrayValues
             })
            this.handdleFlipCardValue( card );
        }
    }

    //function that validate if two values al equal
    isEqualTo( valueA, valueB) {
        if( valueA === valueB) {
            return true;
        }
    }

    //function that reset all values from state
    restartValuesStatus( cardA, cardB ) {
        let newTry = this.state.tries;
        newTry = newTry + 1;
        let newArrayValues = [ ...this.state.arrayValues ];
        newArrayValues[cardA].status = !newArrayValues[cardA].status;
        newArrayValues[cardB].status = !newArrayValues[cardB].status;

        this.setState({
            tries: newTry,
            cardA: null,
            cardB: null,
            arrayValues: newArrayValues
        });
    }

    //function that change status of cards that matched
    saveMatchCards( cardA, cardB ) {
        let newMatch = this.state.matches;
        newMatch = newMatch + 1;
        let newTry = this.state.tries;
        newTry = newTry + 1;
        let newArrayValues = [ ...this.state.arrayValues ];
        newArrayValues[cardA].hasMatched = !newArrayValues[cardA].hasMatched;
        newArrayValues[cardB].hasMatched = !newArrayValues[cardB].hasMatched;
    
        this.setState({
            matches: newMatch,
            tries: newTry,
            arrayValues: newArrayValues,
            cardA: null,
            cardB: null
            });
    }

    //function that reset all initial values 
    restartGame(event) {
        event.preventDefault();
        let newmatches = this.state.matches;
        newmatches = 0;
        let newTries = this.state.tries;
        newTries = 0;
        let cardA = this.state.cardA;
        cardA = null;
        let cardB = this.state.cardB;
        cardB = null;
        let newArrayValues = [ ...this.state.arrayValues ];
        newArrayValues.forEach( e => e.status = false );
            
        let newCardProperties = this.createShuffleValues();

        this.setState({
            matches: newmatches,
            tries: newTries,
            cardA: cardA,
            cardB: cardB,
            arrayValues: newArrayValues
        });
        setTimeout(() => {
            this.setState({
                arrayValues: newCardProperties
            });
        }, 1000)
    }

    componentDidUpdate() {
        if( this.state.matches < 11 ) {
            if( this.state.cardA && this.state.cardB ) {
                let cardA = this.state.cardA;
                let cardB = this.state.cardB;
                setTimeout( () => {
                    if( this.isEqualTo( this.state.arrayValues[cardA].value, this.state.arrayValues[cardB].value )){
                            this.saveMatchCards( this.state.cardA, this.state.cardB );
                    } else {
                        this.restartValuesStatus( this.state.cardA, this.state.cardB );
                    }
                }, 1000);
            } 
        } if (this.state.matches === TOTAL_MATCHES) {
            let totalTries = (this.state.tries)-1; 
            alert("Ganaste en "+totalTries+" intentos!");
        }
    }

    render(){
        return (
            <div className="memory-game">
                <header className="header">
                    <div className="header__logo">
                        LOGO
                    </div>
                    <nav className="header__menu">
                        <ul className="menu-list">
                            <li className="menu-list__option">
                                <button className="menu-list__button">Reset Positions</button></li>
                            <li className="menu-list__option">
                                <button className="menu-list__button">New Game</button></li>
                            <li className="menu-list__option">
                                <button className="menu-list__button">Change Player</button></li>
                        </ul>
                    </nav>
                </header>
                <div className="board">
                    <div className="board__column--left">
                        <FlipCard 
                            toggleCard={this.toggleCard}
                            arrayValues={this.state.arrayValues}
                        /> 
                    </div>
                    <div className="board__column--right">
                        <div className="table table-change-player">
                            <span className="table__title table__title--change-player">Please enter your name:</span>
                            <div className="table__description table__description--change-player">
                                <input className="table__input"/>
                                <button className="table__button">OK</button>
                            </div>
                        </div>
                        <div className="table table-current-player">
                            <div className="table__title">
                                Current Player
                            </div>
                            <div className="table__description">
                                <span className="description">Name:<span className="description__item--player"> Player #1</span></span>
                                <span className="description"># Attempts:<span className="description__item--attempts">12</span></span>
                            </div>
                        </div>
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
                    </div>
                </div>
                <footer className="footer">
                    Training 2020
                </footer>

                    {/* <span className="game-try">Intentos:<span className="try-value">{this.state.tries}</span></span> */}
               
                {/* <div className="mmemorygame__board">
                    <button type="button" className="btn-restart" onClick={this.restartGame}>Reiniciar</button>
                    <div className="flipcard-board">
                        <FlipCard 
                            toggleCard={this.toggleCard}
                            arrayValues={this.state.arrayValues}
                        />
                    </div>
                </div> */}
            </div>
        )
    }
};



ReactDOM.render( <App/>, document.querySelector( '#root' ));
