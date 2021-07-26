import React from 'react';
import {NavLink} from 'react-router-dom'

export const Navbar = () => {
    return (
        <nav className=" teal lighten-2">
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/">Главная</NavLink></li>
                    <li><NavLink to="/stores">Магазины</NavLink></li>
                    <li><NavLink to="/bakery">Пекарня</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}