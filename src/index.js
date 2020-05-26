import React from 'react';
import ReactDOM from 'react-dom';
import FlipCard from './components/flipcard/FlipCard';
import Header from './components/header/Header';
import ChangePlayerTable from './components/changeplayertable/ChangePlayerTable';
import CurrentPlayerTable from './components/currentplayertable/CurrenPlayerTable';
import PositionTable from './components/positiontable/PositionTable';
import Footer from './components/footer/Footer';
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
            tries: 0,
            showChangePlayer: false,
            showCurrenPlayer: true,
        }
        this.handdleFlipCardValue = this.handdleFlipCardValue.bind(this);
        this.isEqualTo = this.isEqualTo.bind(this);
        this.toggleCard = this.toggleCard.bind(this);
        this.restartValuesStatus = this.restartValuesStatus.bind(this);
        this.saveMatchCards = this.saveMatchCards.bind(this); 
        this.restartGame = this.restartGame.bind(this);
        this.createShuffleValues = this.createShuffleValues.bind(this);
        this.handdleChangePlayer = this.handdleChangePlayer.bind(this);
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
        console.log("this.state.show", this.state.showChangePlayer);
        return (
            <div className="memory-game">
                <Header handdleChangePlayer={ this.handdleChangePlayer }/>
                <div className="board">
                    <div className="board__column--left">
                        {this.state.arrayValues.map(( e, index ) => (
                            <FlipCard 
                                toggleCard={this.toggleCard}
                                arrayValues={this.state.arrayValues}
                                isFlipped={ e.status}
                                index={index}
                                value={e.value}
                                key={index}
                            /> 
                        ))}
                    </div>
                    <div className="board__column--right">
                    { this.state.showChangePlayer ? <ChangePlayerTable/> : null }
                    { this.state.showCurrenPlayer ? <CurrentPlayerTable/> : null }
                        <PositionTable/>
                    </div>
                </div>
            <Footer/>
            </div>
        )
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
       
        return valueA === valueB;
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

    handdleChangePlayer() {
        this.setState( prevState => ({
            showChangePlayer: !prevState.showChangePlayer,
            showCurrenPlayer: !prevState.showCurrenPlayer
        }))
    }
};



ReactDOM.render( <App/>, document.querySelector( '#root' ));
