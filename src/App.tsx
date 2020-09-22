import React, {memo, useEffect} from 'react';
import './App.scss';
import {Preloader} from "./components/Preloader/Preloader";
import {ErrorMessages} from "./components/ErrorMessages/ErrorMessages";
import {HeaderAuth} from './components/HeaderAuth/HeaderAuth';
import {Route, Switch, Redirect} from 'react-router-dom';
import {SignIn} from './components/SignIn/SignIn';
import TodolistContainer from "./components/TodoListContainer/TodolIstContainer";
import {AuthenticationRoute} from "./hoc/AuthenticationRoute/AuthenticationRoute";
import {initialAppThunk} from "./redux/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "./redux/store";

export const App = memo(() => {

    const {isFetching} = useSelector((state: AppStateType) => state.todolistsReducer);
    const {initializedApp} = useSelector((state: AppStateType) => state.authReducer);

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(initialAppThunk());
    }, [])

    return <div className={'App'}>
        {(isFetching || !initializedApp) ? <Preloader/> : null}
        <ErrorMessages/>
        <HeaderAuth/>
        <Switch>
            <Route path='/sign-in' exact component={SignIn}/>
            <AuthenticationRoute path='/todolists' exact={true} Component={TodolistContainer}/>
            <Route path='*' render={() => <Redirect to='/todolists'/>}/>
        </Switch>
    </div>
})

