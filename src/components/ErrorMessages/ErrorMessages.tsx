import React, {memo, useCallback} from 'react'
import {Alert, AlertTitle} from "@material-ui/lab";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {actions} from "../../redux/todolistsReducer";
import classes from "./ErrorMessages.module.scss";

export const ErrorMessages = memo(() => {

    const dispatch = useDispatch();

    const {todolistsReducer: {errorMessages}} = useSelector((state: AppStateType) => state);

    const onCloseAlertHandle = useCallback((errorMessage: string) => {
        dispatch(actions.filterErrorMessagesSuccess(errorMessage));
    }, [dispatch, errorMessages]);

    return (
        <div className={classes.alertWrapper}>
            {errorMessages.map((errorMessage, index) => {
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


