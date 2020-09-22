import React, {memo} from 'react'
import {AppBar, Button, Toolbar} from '@material-ui/core';
import classes from "./HeaderAuth.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {logOutThunk} from "../../redux/authReducer";
import {todoActions} from "../../redux/todolistsReducer";
import { Redirect } from 'react-router-dom';

export const HeaderAuth = memo(() => {

    const isAuth = useSelector((state: AppStateType) => state.authReducer.isAuth);
    const login = useSelector((state: AppStateType) => state.authReducer.login);
    const todolists = useSelector((state: AppStateType) => state.todolistsReducer.todolists);
    const todolistsId = todolists.map(todo => todo.id);

    const dispatch = useDispatch();

    const LogOutOnClick = () => {
        dispatch(todoActions.isFetchingSuccess(true));
        dispatch(logOutThunk());
        todolistsId.map(id => dispatch(todoActions.deleteTodolistSuccess(id)));
        dispatch(todoActions.isFetchingSuccess(false));
    }

    return (
        <AppBar position="static">
            <Toolbar className={classes.authToolbar}>
                {login ? <div>{login}</div> : <div>Who are you?</div>}
                {!isAuth ?
                    <Button color="inherit" className={classes.authButton} onClick={()=><Redirect to='/sign-in'/>}>Login</Button> :
                    <Button color="inherit" className={classes.authButton} onClick={LogOutOnClick}>Logout</Button>}
            </Toolbar>
        </AppBar>
    );
});


