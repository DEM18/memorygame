import React from 'react';


const Header = ( props ) => {
    const { handdleChangePlayer } = props;
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
                        <button className="menu-list__button">New Game</button></li>
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