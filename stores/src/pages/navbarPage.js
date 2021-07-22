import React from 'react';

export const NavbarPage = () => {
    return (
        <nav className=" teal lighten-2">
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><a href="/">Главная</a></li>
                    <li><a href="/stores">Магазины</a></li>
                    <li><a href="/bakery">Пекарня</a></li>
                </ul>
            </div>
        </nav>
    )
}