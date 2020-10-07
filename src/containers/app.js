import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import SelectOperator from '../components/select-operator';
import EnterNumber from '../components/enter-number';
import Result from '../components/result';
import GlobalStyle from '../components/global-style';

let App = () => {
    return(
        <BrowserRouter>
            <GlobalStyle/>
            <Switch>
                <Route exact path='/'>
                    <SelectOperator/>
                </Route>

                <Route path='/enter-number'>
                    <EnterNumber/>
                </Route>

                <Route path='/result'>
                    <Result/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}

export default App;
