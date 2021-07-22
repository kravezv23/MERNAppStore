import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {StoresPage} from './pages/storesPage';
import {BakeryPage} from './pages/bakeryPage';
import {HomePage} from './pages/homePage';
import {NavbarPage} from './pages/navbarPage';

export default function useRoute(){
    return (
        <Switch>
            <Route path="/stores" exact>
                <NavbarPage />
                <StoresPage />
            </Route>
            <Route path="/bakery" exact>
                <NavbarPage />
                <BakeryPage />
            </Route>
            <Route path="/">
                <NavbarPage />
                <HomePage />
            </Route>
        </Switch>
    )
}