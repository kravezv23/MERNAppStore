import React from 'react';
import {Switch, Route} from 'react-router-dom';
import {StoresPage} from './pages/storesPage';
import {BakeryPage} from './pages/bakeryPage';
import {HomePage} from './pages/homePage';

export default function useRoute(){
    return (
        <Switch>
            <Route path="/stores" exact>
                <StoresPage />
            </Route>
            <Route path="/bakery" exact>
                <BakeryPage />
            </Route>
            <Route path="/">
                <HomePage />
            </Route>
        </Switch>
    )
}