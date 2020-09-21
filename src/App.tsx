import React, {memo} from 'react';
import './App.scss';
import {Preloader} from "./components/Preloader/Preloader";
import {ErrorMessages} from "./components/ErrorMessages/ErrorMessages";
import {HeaderAuth} from './components/HeaderAuth/HeaderAuth';
import {Route, Switch, Redirect} from 'react-router-dom';
import {SignIn} from './components/SignIn/SignIn';
import TodolistContainer from "./components/TodoListContainer/TodolIstContainer";
import {AuthenticationRoute} from "./hoc/AuthenticationRoute/AuthenticationRoute";

export const App = memo(() => (
    <div className={'App'}>
        <Preloader/>
        <ErrorMessages/>
        <HeaderAuth/>
        <Switch>
            <Route path='/sign-in' exact component={SignIn}/>
            <AuthenticationRoute path='/todolists' exact={true} Component={TodolistContainer}/>
            <Route path='*' render={() => <Redirect to='/todolists'/>}/>
        </Switch>
    </div>
))

