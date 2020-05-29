import React from 'react';
import './ChangePlayerTable.scss';

class ChangePlayerTable extends React.Component {
    constructor( props ) {
        super( props );

        this.state = {
            playerName: null
        }

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    render() {
        return(
            <div className="table table-change-player">
                <form autoComplete="off" className="form">
                    <label className="form__name-label" 
                        htmlFor="playerName">
                        Please enter your name:
                    </label>
                    <input className="form__name-input"
                        autoComplete="false"
                        id="playerName" 
                        name="hidden"
                        type="text"/>
                    <button className="form__accept-button" 
                        type="submit"
                        value="submit"
                        onClick={this.onButtonClick}
                        >OK
                    </button>
                </form>
            </div>
        )
    }

    onButtonClick( event ) {
        event.preventDefault();

        let inputValue = document.getElementById( "playerName" ).value;
        
        this.setState({
            playerName: inputValue
        });

        this.props.handleNewPlayer(inputValue);
        
    }
}

export default ChangePlayerTable;