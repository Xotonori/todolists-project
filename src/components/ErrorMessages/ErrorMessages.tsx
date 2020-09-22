import React, {memo, useCallback, useEffect} from 'react'
import {Alert, AlertTitle} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {todoActions} from "../../redux/todolistsReducer";
import classes from "./ErrorMessages.module.scss";
import {authActions} from "../../redux/authReducer";

export const ErrorMessages = memo(() => {

    const dispatch = useDispatch();

    const todoErrorMessages = useSelector((state: AppStateType) => state.todolistsReducer.errorMessages);
    const {errorMessages: authErrorMessages, initializedApp} = useSelector((state: AppStateType) => state.authReducer);

    let commonErrors = [...todoErrorMessages, ...authErrorMessages];
    commonErrors = commonErrors.filter((err, index) => commonErrors.indexOf(err) === index);

    const onCloseAlertHandle = useCallback((errorMessage: string) => {
        dispatch(todoActions.filterErrorMessagesSuccess(errorMessage));
        dispatch(authActions.filterErrorMessagesSuccess(errorMessage));
    }, [dispatch, commonErrors]);

    useEffect(() => {
        dispatch(todoActions.deleteErrorMessagesSuccess());
        dispatch(authActions.deleteErrorMessagesSuccess());
    }, [initializedApp]);

    return (
        <div className={classes.alertWrapper}>
            {commonErrors.map((errorMessage, index) => {
                return (
                    <Alert key={index} severity="warning"
                           onClose={() => onCloseAlertHandle(errorMessage)}
                           closeText={'x'}
                           className={classes.Alert}>
                        <AlertTitle>Warning</AlertTitle>
                        <strong>{errorMessage}</strong>
                    </Alert>
                )
            })}
        </div>
    );
});


