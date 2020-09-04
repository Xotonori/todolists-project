import React, {Component, memo} from 'react';
import './App.scss';
import {Preloader} from "./components/Preloader/Preloader";
import {ErrorMessages} from "./components/ErrorMessages/ErrorMessages";
import {HeaderAuth} from './components/HeaderAuth/HeaderAuth';
import {AuthForm} from './components/AuthForm/AuthForm';
import TodolistContainer from "./components/TodoListContainer/TodolIstContainer";

export const App = memo(() => {

    return (
        <>
            <Preloader/>
            <ErrorMessages/>
            <HeaderAuth/>
            {/*{true ? <AuthForm/> : <TodolistContainer/>}*/}
            <TodolistContainer/>
        </>
    )
})

