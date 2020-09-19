import React, {memo} from 'react';
import './App.scss';
import {Preloader} from "./components/Preloader/Preloader";
import {ErrorMessages} from "./components/ErrorMessages/ErrorMessages";
import {HeaderAuth} from './components/HeaderAuth/HeaderAuth';
import {Route, Switch} from 'react-router-dom';
import {AuthForm} from './components/AuthForm/AuthForm';
import TodolistContainer from "./components/TodoListContainer/TodolIstContainer";
import {AuthenticationRoute} from "./hoc/AuthenticationRoute/AuthenticationRoute";

export const App = memo(() => (
    <div className={'App'}>
        <Preloader/>
        <ErrorMessages/>
        <HeaderAuth/>
        <Switch>
            <Route path='/' exact render={() => <AuthenticationRoute path='/sign-in' Component={AuthForm}/>}/>
            <Route path='/sign-in' component={AuthForm}/>
            <AuthenticationRoute path='/todolists' Component={TodolistContainer}/>
        </Switch>
    </div>
))

