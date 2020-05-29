import React from 'react';
import './Header.scss';


const Header = ( props ) => {
    const { handdleChangePlayer, restart } = props;
    return (
        <header className="header">
            <div className="header__logo">
                LOGO
            </div>
            <nav className="header__menu">
                <ul className="menu-list">
                    <li className="menu-list__option">
                        <button className="menu-list__button">Reset Positions</button></li>
                    <li className="menu-list__option">
                        <button className="menu-list__button"
                        onClick={ restart }
                        >New Game</button></li>
                    <li className="menu-list__option">
                        <button className="menu-list__button"
                            onClick={handdleChangePlayer}
                        >Change Player</button></li>
            </ul>
        </nav>
    </header>
    )
}

export default Header;